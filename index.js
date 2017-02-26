"use strict";

/**
* Module Dependencies 
**/

const fs   = require("fs");
const path = require("path");
const Promise = require("bluebird");
const express = require("express");
const app     = express();
const webpack = require("webpack");
const redis   = require("redis");
const redisClient  = redis.createClient();
const watson      = require("watson-developer-cloud");
const _           = require("lodash");
const extend      = _.extend;
const mongoose    = require("mongoose");
const watsonCredentials = require("./watson-credentials.json").personality_insights;


// import user model
const User        = require("./server/models/User");

const WebpackDevServer = require("webpack-dev-server");
const webpackDevConfig = require("./webpack.config.development");
const toPromise = require("./util/callback-to-promise");
const config    = require("./config/info");

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

// send different bundle on production environment
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
  console.log("Initialize MongoDB connection");
  const options = {
    server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } },
    replset: { socketOptions: { keepAlive: 1, connectTimeoutMS : 30000 } }
  };
  mongoose.connect(config.MONGODB_URI, options);
};
connectMongo();

// todo: deal with reconnections and errors gracefully ***
mongoose.connection.on("error", console.log.bind(console, "mongoose-connection-error:"));
mongoose.connection.on("open", console.log.bind(console,"Connected to MongoDB"));
// retry connection on disconnection
mongoose.connection.on("disconnected", console.log.bind(console, "Disconnected from MongoDB"));

/**
*  Connect to Redis
**/
// todo: add Redis connect URI

redisClient.on("connect", function () {
    console.log("Connected to Redis");
});

redisClient.on("error", function (err) {
    console.log("Error " + err);
});

// export client for use on API methods
module.exports = redisClient;

/**
* Initialize routes
**/

require("./server/router/index")(app);    

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

