const express = require("express");
const genres = require("../routes/genres");
const scrapImages = require("../routes/scrapImages");
const brand = require("../routes/brand");
const customers = require("../routes/customers");
const movies = require("../routes/movies");
const rentals = require("../routes/rentals");
const users = require("../routes/users");
const auth = require("../routes/auth");
const returns = require("../routes/returns");
const error = require("../middleware/error");
const bodyParser = require("body-parser");

module.exports = function(app) {
  app.use(bodyParser.json({limit: "50mb"}));
  app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));
  app.use(express.json());
  app.use("/api/genres", genres);
  app.use("/api/customers", customers);
  app.use("/api/movies", movies);
  app.use("/api/rentals", rentals);
  app.use("/api/users", users);
  app.use("/api/auth", auth);
  app.use("/api/scrape", scrapImages);
  app.use("/api/brand", brand);
  app.use("/api/returns", returns);
  app.use(error);
};
