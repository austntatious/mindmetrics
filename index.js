"use strict";

const fs = require("fs");
const path = require("path");
const Promise = require('bluebird');
const express = require("express");
const app     = express();
const bodyParser = require("body-parser");
const layouts = require("express-ejs-layouts");
const webpack = require("webpack");

const mongoose    = require("mongoose");
const session     = require("express-session");
const MongoStore  = require("connect-mongo")(session);
const User        = require("./server/models/User");
const credentials = require('./credentials.json').personality_insights;
const watson      = require('watson-developer-cloud');
const _           = require("lodash");
const extend      = _.extend;
const data        = require("./data.json");
const uuid        = require("node-uuid");
const oauth       = require('oauth-libre/lib/oauth-promise').OAuth;
const WebpackDevServer = require("webpack-dev-server");
const webpackDevConfig = require("./webpack.config.development");

// Todo: move these to config file and also add multiple twitter app keys to rotate
const callbackURL = "http://localhost:3001/oauth";
const twitterConsumerKey = "9euBP7DiTrWo9eNxf1Hl5HRFE";
const twitterConsumerSecret = "CuU8AnRbNddhtNjPc63QnlgQqI1xYKyB2zQaVUk9DQKJbGFEwC";
const MONGODB_URI = "mongodb://localhost:27017/personalities";

/**
*  Express Configuration
**/
app.set("layout");
app.set("view engine", "ejs");
app.set("view options", {layout: "layout"});
app.set("views", path.join(process.cwd(), "/server/views"));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: "THISISASECRET",
  store: new MongoStore({
    url: MONGODB_URI,
    autoReconnect: true
  })
}));

app.use(layouts);
app.use("/client", express.static(path.join(process.cwd(), "/client")));
app.disable("x-powered-by");

/**
*  Environment Configs - add this to a main config file
**/ 

const env = {
  production: process.env.NODE_ENV === "production"
};

if (env.production) {
  Object.assign(env, {
    assets: JSON.parse(fs.readFileSync(path.join(process.cwd(), "assets.json")))
  });
}

/**
  Connect to MongoDB.

  Mongoose by default sets the auto_reconnect option to true.
  Recommended a 30 second connection timeout because it allows for
  plenty of time in most operating environments.
 **/

const connectMongo = function () {
  console.log('connect-to-mongodb');
  const options = {
    server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } },
    replset: { socketOptions: { keepAlive: 1, connectTimeoutMS : 30000 } }
  };
  mongoose.connect(MONGODB_URI, options);
};
connectMongo();

mongoose.connection.on('error', console.log.bind(console, 'mongoose-connection-error:'));
mongoose.connection.on('open', console.log.bind(console,'connect-to-mongodb'));
// retry connection on disconnection
mongoose.connection.on('disconnected', connectMongo);


/**
* Routes
**/

// TO DO: add routes to separate file

/*
 STEP 1 - init the OAuth Client!
 */

 // TODO: how to send to router to use as global variable?

var oa = new oauth(
  'https://api.twitter.com/oauth/request_token',
  'https://api.twitter.com/oauth/access_token',
  twitterConsumerKey,            // CONSUMER KEY
  twitterConsumerSecret,         // CONSUMER SECRET
  '1.0',
  callbackURL,
  'HMAC-SHA1'
);

var reqTokenSecrets = {}; // Hash that contains the req_token:req_token_secret key vals

// route for all oauth requests
app.get("/oauth", function(req, res, next) {
  // prevent users from directing to this route - only allow app to direct here
  // also limit IPs 

  if (req.query.oauth_token) {
    return next();
  }
   // STEP 2: Ask twitter for a signed request token

  // oAuthToken/Secret used for this this handshake process
  var requestTokenPromise = oa.getOAuthRequestToken();

  /*
    Promise returns data array in the format:
    data[0]: oauth_token
    data[1]: oauth_token_secret
    data[2]: results
   */
  requestTokenPromise.then(function(data){
    // Extract data
    var oauthToken = data[0];
    var oauthTokenSecret = data[1];

    // Get the secret oauth request token
    reqTokenSecrets[oauthToken] = oauthTokenSecret;

    // Redirect user to Twitter Auth
    var redirectURL = "https://api.twitter.com/oauth/authenticate"+"?oauth_token="+oauthToken;
    res.redirect(redirectURL);
    });

}, function(req,res, next) {

  // fetch accessToken in POST method only 
  // 
  // 1) send query token data to next route - don't fetch access token yet
  // 2) render the blank page from callback and then after attaching querytoken data from server to the parent window obj,
  // 3) close the window
  // 4) on child window obj close event, fire a post request to fetch accessToken on server, then being complete Twitter flow

  /**
   * STEP 4: Get the access token and access token secret - finally what we need! :)
   */
  var accessTokenPromise = oa.getOAuthAccessToken(req.query.oauth_token,
                                                  reqTokenSecrets[req.query.oauth_token],
                                                  req.query.oauth_verifier);

  /*
    Similar to access token:
    data[0]: access token
    data[1]: access token secret
    data[2]: results
   */
  accessTokenPromise.then(function(data){
    // After successfully fetching all authentication data, attach to request object and pass request to the next route
    // This will take the access tokens and send them to the main wildcard route that renders the React app
    // The React app will then render an empty component which sends a post request from the parent window
    // and then will close itself upon receiving a response
    req.accessToken = data[0];
    req.accessTokenSecret = data[1];
    req.results = data[2];
    return next();

  }).catch(function(err) {
    console.log("Error in requestTokenPromise: ", err);
  });
});
  // immediately redirect to authorize/authenticate endpoint with request token to be verified
  // user verifies request token when logging in and we redirect to our app with verified token
  // send verified token to receive access token, and verify credentials
  // then take tokens and send requests for twitter feed
  // count twitter feed, send count to client async, and format into proper input json for Watson
  // if user adds Facebook feed, repeat previous steps
  // if user adds text as well, save to database entry and then send final json to Watson
  // save response async and send it immediately to client

// app.get("/results/:id", function(req, res) {
//   // add handlers to find user's profile
//   console.log("INSIDE GET ROUTE FOR RESULTS");
//   User.findOne({"uuid" : req.params.id}).then(function(userData) {
//     console.log("userdata:", userData);
//     res.json(userData);
//   }, function(err) {
//     res.json(err);
//     console.log("Error finding user data: ", err);
//   });
// });             

// start the flow to process data
app.post("/data", function(req, res, next) {
  res.json({"hi": "this is working"});
  console.log("THIS IS FUCKIN WORKING HOLY SHIT");
});

// index route - this allows for react-router route matching(?)
// when matching oauth_callback route to react-router, test for oauth query string
// if no query string then render normal app. if query string present, then execute logic to get accessToken
// then after getting accessToken, render oauth_callback component which autocloses 
app.get("/*", function(req, res) {
  console.log("inside wildcard route");
  console.log("did we get the req accessToken data? - ", req.accessToken);

  res.render("index", {
    env: env
  });
});

// User post submission
// TODO: nginx causes IP from user to be rewritten to the local address. fix ip forwarding problem
app.post("/submit", function(req, res, next) {
  console.log("post submission received, req.body = ", req.body);
  console.log("User-Agent: " + req.headers["user-agent"]);
  console.log("IP: ", req.connection.remoteAddress);
  console.log("IP with proxy method: ", req.headers["x-forwarded-for"]);
  console.log("req.headers: ", req.headers);
  // first asynchronously sends request to IBM API
  // if error then display error on client side and async save all input except the text response will be empty
  // if successful, send response to client and async save all input as well as the IBM response

  // resolver function for promise converter - move all of these to a utils file
  function resolver(resolve, reject) {
    return function (error, result) {
      return error ? reject(error) : resolve(result);
    };
  }
  // convert callback to promise
  function toPromise(f) {
    return new Promise(function (resolve, reject) {
      return f(resolver(resolve, reject));
    });
  }
  // sanitize input parameters from text input
  function sanitize (parameters) {
    return extend(parameters, {
      text: parameters.textInput ? parameters.textInput.replace(/[\s]+/g, ' ') : undefined
    });
  }

  // define function to send REST API request for watson personality insights
  var personality_insights = watson.personality_insights(credentials),
    getProfile = function (parameters) {
      // return a promise that uses toPromise to then fire the resolver callback, which will resolve or reject the promise
      return toPromise(function(callback) { personality_insights.profile(sanitize(parameters), callback)});
    };

  // add mock data.json as mock API response data
  const user = new User({
    name : req.body.name,
    uuid: uuid.v1(),
    email : req.body.email,
    birthyear: req.body.birthyear,
    gender : req.body.gender,
    textInput : req.body.textInput,
    browserInfo: req.headers["user-agent"],
    watsonData: data
  });

  // Personality Insights API needs JSON input unless otherwise specified
  // getProfile(user).then(function(results) {
  //   res.json(results);
  //   user.watsonData = results;
  user.save().then(function(saved) {
    res.json(saved); // delete this after testing
    console.log("Saved new user data:", saved);
  }, function(err) {
    res.json(err);
    console.log("Error saving new user:", err);
  });
  // }, function(err) {
  //   console.log("error from getProfile", err);
  //   res.json("ERROR:", err);
  // });
  // ADD ERROR HANDLING
});

/**
* Port Configs and start server
**/

const port = Number(process.env.PORT || 3001);

app.listen(port, function () {
  console.log("server running at localhost:3001, go refresh and see magic");
});

/**
* Webpack configs
**/
if (!env.production) {
  new WebpackDevServer(webpack(webpackDevConfig), {
    publicPath: "/client/",
    contentBase: "./client/",
    inline: true,
    hot: true,
    stats: false,
    historyApiFallback: true,
    headers: {
      "Access-Control-Allow-Origin": "http://localhost:3001",
      "Access-Control-Allow-Headers": "X-Requested-With"  
    }
  }).listen(3000, "localhost", function (err) {
    if (err) {
      console.log(err);
    }

    console.log("webpack dev server listening on localhost:3000");
  });
}
