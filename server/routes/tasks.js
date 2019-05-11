const express = require("express");
const router = express.Router();
const data = require("../data");
const taskData = data.tasks;
const uuid = require("node-uuid");
const request = require("request-promise");
const recommendFunction = require("./recommend");

router.get("/watchlist/:id", async (req, res) => {
  try {
    let requestData = req.params;

    if (!requestData.id) {
      throw "Provide uid or Movie id";
    }
    let watchlistMovies = await taskData.getWatchlistByUser(requestData.id);
    res.json(watchlistMovies);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/recommendation/:id", async (req, res) => {
  try {
    let requestData = req.params;
    if (!requestData.id) {
      throw "Provide uid or Movie id";
    }
    let r_moviesJSON = await taskData.getRecommendedMoviesByUserId(
      requestData.id
    );
    // console.log(r_moviesJSON);
    res.json(r_moviesJSON);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/watchlist/", async (req, res) => {
  try {
    requestData = req.body;
    if (!requestData.uid && !requestData.movieid) {
      throw "Provide uid or Movie id";
    }
    let movie = await taskData.addToWatchList(
      requestData.movieid,
      requestData.uid
    );
    await taskData.getRecommendedMovies(movie.movie, requestData);
    res.json(movie);
  } catch (error) {
    res.status(500).json({ error: "Oops! Exception caught.", message: error });
  }
});

router.put("/watchlist/", async (req, res) => {
  try {
    const requestData = req.body;
    if (!requestData.uid && !requestData.movieid) {
      throw "Provide uid or Movie id";
    }
    let movieData = await taskData.removeWatchlist(
      requestData.uid,
      requestData.movieid
    );
    res.json(movieData);
  } catch (error) {
    res.status(500).json({ error: "Oops! Exception caught.", message: error });
  }
});

/**
 * Wire up recommendation route.
 */
router.post("/recommendations/", recommendFunction);

module.exports = router;
