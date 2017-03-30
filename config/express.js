"use strict";

// Module dependencies
var express  = require("express"),
  bodyParser = require("body-parser"),
  path       = require("path"),
  // session    = require("./session"),
  // cookieParser = require("cookie-parser"),
  morgan     = require("morgan"),
  layouts = require("express-ejs-layouts");
  // add winston for debug and general logging
  
module.exports = function (app) {

  app.set("layout");
  app.set("view engine", "ejs");
  app.set("view options", {layout: "layout"});
  app.set("views", path.join(process.cwd(), "/server/views"));
  app.use(layouts);
  app.use("/client", express.static(path.join(process.cwd(), "/client")));

  // configure HTTP logger based on environment
  app.use(morgan("dev"));

  app.use(bodyParser.json({limit: "50mb", extended: true}));
  app.use(bodyParser.urlencoded({limit: "50mb", extended: true}));

  // Add cookies or figure out proper session handling for users

  // var secret = Math.random().toString(36).substring(7);
  // app.use(cookieParser(secret));
  // app.use(session({ secret: secret, signed: false }));

  app.disable("x-powered-by");

}