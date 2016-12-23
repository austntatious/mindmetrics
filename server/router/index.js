"use strict";

module.exports = function (app) {

  // APIs
  app.use("/api",  require("./api"));
  // app.use("/auth", require("./auth"));

  // Routes
  app.use("/", require("./routes"));

};