const express = require("express");
const movieRoutes = require("./movies");
const searchRoutes = require("./search");
const imageRoutes = require("./image");

const constructorMethod = app => {
  app.use("/api/movies", movieRoutes);
  app.use("/api/search", searchRoutes);

  // NOTICE: imageRoutes (image module) requires an express.static
  //         middleware to work as intended. The sequence below is
  //         expected to be present so that images are served correctly.
  const static = express.static("static/images/");
  app.use("/images", static);
  app.use("/images/:genre", static);
  app.use("/images", imageRoutes);

  app.use("*", (req, res) => {
    res.status(404).json({ error: "Not found" });
  });
};

module.exports = constructorMethod;
