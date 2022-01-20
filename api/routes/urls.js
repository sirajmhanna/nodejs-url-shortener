const express = require("express");
const route = express.Router();
const RequestsMiddleware = require("../middlewares/requests");
const UrlsControllers = require("../controllers/urls");

// URL Shortener Route
route.post(
  "/shortener",
  RequestsMiddleware.generateRequestIdentifier,
  UrlsControllers.shortener
);

// Original URL Route
route.get(
  "/:code",
  RequestsMiddleware.generateRequestIdentifier,
  UrlsControllers.getOriginalUrl
);

module.exports = route;
