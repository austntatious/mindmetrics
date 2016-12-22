"use strict";

const path = require("path");
const Promise = require('bluebird');
const express = require("express");
const app     = express();
const webpack = require("webpack");
const oauth       = require('oauth-libre/lib/oauth-promise').OAuth;
const watsonCredentials = require('./watson-credentials.json').personality_insights;
const watson      = require('watson-developer-cloud');
const _           = require("lodash");
const extend      = _.extend;
const mongoose    = require("mongoose");

// import user model
const User        = require("./server/models/User");

const WebpackDevServer = require("webpack-dev-server");
const webpackDevConfig = require("./webpack.config.development");
const TwitterCrawler = require("twitter-crawler");
const toPromise = require("./util/callback-to-promise");
const config    = require("./config/info");
const twitterCredentials = config.twitterCredentials;

/**
*  Bootstrap Express config
**/

require("./config/express")(app);


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
  mongoose.connect(config.MONGODB_URI, options);
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
 // instantiate Oauth object in oauth route file, which will be mounted to main Router

var oa = new oauth(
  'https://api.twitter.com/oauth/request_token',
  'https://api.twitter.com/oauth/access_token',
  twitterCredentials[0].consumer_key,            // CONSUMER KEY
  twitterCredentials[0].consumer_secret,         // CONSUMER SECRET
  '1.0',
  config.oauthCallbackUrl,
  'HMAC-SHA1'
);

var reqTokenSecrets = {}; // Hash that contains the req_token:req_token_secret key vals

// route for all oauth requests
app.get("/oauth", function(req, res, next) {
  // prevent users from directing to this route - only allow app to direct here
  // also limit IPs 

  // if query has oauth_token, this is callback req from Twitter - send oauth component on wildcard route
  if (req.query.oauth_token) {
    return next('route');
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
  requestTokenPromise
    .then(function(data){
      // Extract data
      var oauthToken = data[0];
      var oauthTokenSecret = data[1];

      // Get the secret oauth request token
      reqTokenSecrets[oauthToken] = oauthTokenSecret;

      // Redirect user to Twitter Auth
      var redirectURL = "https://api.twitter.com/oauth/authenticate"+"?oauth_token="+oauthToken;
      res.redirect(redirectURL);
      })
    .catch(function(err) {
      console.log("Error in Oauth requestTokenPromise: ", err);
    });

});

// Route containing user profile so that they can share their info with friends
// * Add component to allow people to take their own personality profile
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


app.post("/data", function(req, res, next) {
  /**
   * Get the access token and access token secret, then process feed data
   */
  var accessTokenPromise = oa.getOAuthAccessToken(req.query.oauth_token,
                                                  reqTokenSecrets[req.query.oauth_token],
                                                  req.query.oauth_verifier);
  /*
    Similar to access token:
    data[0]: access token
    data[1]: access token secret
    data[2]: results

    Receives accessToken, verfies credentials, and then crawls Twitter feed
   */
  accessTokenPromise
    .then(function(data) {
      var accessToken = data[0];
      var accessTokenSecret = data[1];
      var results = data[2];
      // add error handler!

      // on accessToken success, verify credentials
      var verifyCredentialsPromise = oa.get('https://api.twitter.com/1.1/account/verify_credentials.json',
                               accessToken,
                               accessTokenSecret);

      verifyCredentialsPromise
        .then(function(data) {

        var userData = JSON.parse(data[0])
        console.log("credentials are correct:", userData);

        twitterCredentials[0].access_token_key = accessToken;
        twitterCredentials[0].access_token_secret = accessTokenSecret;
        console.log("Twitter Credentials: ", twitterCredentials);

        const crawler = new TwitterCrawler(twitterCredentials);
        var twitterHandle = userData.screen_name; 
        console.log("twitterHandle: ", twitterHandle);

        return crawler
          .getUser(twitterHandle)
          .then((user) => {
            console.log(
              "Obtained info for user " + user.name + user.id
            );

          // Crawl tweets
          // Todo: implement this recursively to get entire user timeline
          // can this be implemented using Promise.all?
          // from the verification response, we know the status count of the user
          // see IBM sample apps for reference about paginating user timeline
          console.log('Obtaining tweets...');
          return crawler
            .getTweets(twitterHandle, { min_tweets: 50, limit : 300 })
            .then((tweets) => {
              console.log(
                "Obtained " + tweets.length + " tweets for user " + user.name + user.id
              );
              console.log("Tweet: ", tweets.slice(-1));

              console.log("Crawling finished.");

              // format tweets into watson input

              // count words while formatting tweets
              // send formatted input to redis as string and generate token to associate to user session
              // send wordcount to user & userToken to associate redis session 
              return {"input": "final input data string"};
            });
        }).catch(function(err) {
          console.log("Error in getting user: ", err);
        });


      }).then(function(data) {
        // send success response to client with word count & redis token
        console.log("Finished twitter flow");
        res.json(data);

      }).catch(function(err) {
        // if credentials verification throws an error, it will be 401 status code and supplied user credentials are wrong
        console.log("Error in credentials verification:", err);
      });

  }).catch(function(err) {
    console.log("Error in accessTokenPromise:", err);
  });
});

app.get("/*", function(req, res) {
  res.render("index", {
    env: env
  });
});

// Final user post submission - contains email, name, and possibly form text
app.post("/submit", function(req, res, next) {

  // incoming request meta data
  console.log("post submission received, req.body = ", req.body);
  console.log("User-Agent: " + req.headers["user-agent"]);
  console.log("IP: ", req.connection.remoteAddress);
  console.log("IP with proxy method: ", req.headers["x-forwarded-for"]);
  console.log("req.headers: ", req.headers);

  // check redis cache for existing uploaded data associated with session / user
  // if found, append text to data and send to IBM
  // display error responses to user
  // send success response to client, flush cache associated with user, and save response to mongo 

  // sanitize input parameters from text input
  // add this to helper file
  function sanitize (parameters) {
    return extend(parameters, {
      text: parameters.textInput ? parameters.textInput.replace(/[\s]+/g, ' ') : undefined
    });
  }

  // define function to send REST API request for watson personality insights
  var personality_insights = watson.personality_insights(watsonCredentials),
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

/**
* Port Configs and start server -- add this config file
**/

const port = Number(process.env.PORT || 3001);


/**
* Start the server
**/ 

app.listen(port, function () {
  console.log("server running at localhost:3001, go refresh and see magic");
});

