const movieRoutes = require("./tasks");
const searchRoutes = require("./search");
const constructorMethod = app => {
  app.use("/api/movies", movieRoutes);
  app.use("/api/search", searchRoutes);
  app.use("*", (req, res) => {
    res.status(404).json({ error: "Not found" });
  });
};

module.exports = constructorMethod;
