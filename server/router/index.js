"use strict";

module.exports = function (app) {

  // APIs
  app.use("/api",  require("./api"));
  // app.use("/auth", require("./auth"));

  // Routes - render React app
  app.use("/", require("./routes"));

};