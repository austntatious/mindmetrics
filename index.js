"use strict";

const fs = require("fs");
const path = require("path");
var Promise = require('bluebird');
const bodyParser = require("body-parser");

const express = require("express");

const compress = require("compression");
const layouts = require("express-ejs-layouts");
const webpack = require("webpack");
const WebpackDevServer = require("webpack-dev-server");
const webpackDevConfig = require("./webpack.config.development");
const mongoose = require("mongoose");
mongoose.Promise = require("bluebird");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const User = require("./server/models/User");
const app = express();
const credentials = require('./credentials.json').personality_insights;
const watson      = require('watson-developer-cloud');
const _           = require("lodash");
const extend      = _.extend;
const data        = require("./data.json");
const uuid        = require("node-uuid");

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
app.use(compress());
app.use(layouts);
app.use("/client", express.static(path.join(process.cwd(), "/client")));

app.disable("x-powered-by");

/**
*  Environment Configs
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
 * Connect to MongoDB.
 */
// Mongoose by default sets the auto_reconnect option to true.
// Recommended a 30 second connection timeout because it allows for
// plenty of time in most operating environments.
const connect = function () {
  console.log('connect-to-mongodb');
  const options = {
    server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } },
    replset: { socketOptions: { keepAlive: 1, connectTimeoutMS : 30000 } }
  };
  mongoose.connect(MONGODB_URI, options);
};
connect();

mongoose.connection.on('error', console.log.bind(console, 'mongoose-connection-error:'));
mongoose.connection.on('open', console.log.bind(console,'connect-to-mongodb'));
// retry connection on disconnection
mongoose.connection.on('disconnected', connect);

/**
* Routes
**/

// Results route
app.get("/results/:id", function(req, res) {
  // add handlers to find user's profile
  console.log("INSIDE GET ROUTE FOR RESULTS");
  User.findOne({"uuid" : req.params.id}).then(function(userData) {
    console.log("userdata:", userData);
    res.json(userData);
  }, function(err) {
    res.json(err);
    console.log("Error finding user data: ", err);
  });
});

// index route
app.get("/*", function(req, res) {
  res.render("index", {
    env: env
  });
});

// User post submission
app.post("/submit", function(req, res, next) {
  console.log("post submission received, req.body = ", req.body);
  console.log("User-Agent: " + req.headers["user-agent"]);
  console.log("IP: ", req.connection.remoteAddress);
  console.log("IP with proxy method: ", req.headers["x-forwarded-for"]);
  console.log("req.headers: ", req.headers);
  // first asynchronously sends request to IBM API
  // if error then display error on client side and async save all input except the text response will be empty
  // if successful, send response to client and async save all input as well as the IBM response

  // resolver function for promise converter
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
if (env.production === false) {
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
