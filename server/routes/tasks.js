const express = require("express");
const router = express.Router();
const data = require("../data");
const taskData = data.tasks;
const uuid = require("node-uuid");
const request = require("request-promise");
const recommendFunction = require("./recommend");
const redis = require('redis');
const client = redis.createClient();

/**
 * Gets Watchilst by User-id 
 * @param :id -> uid
 */
router.get("/watchlist/:id", async (req, res) => {
  try {
    let requestData = req.params;

    if (!requestData.id) {
      throw "Provide uid or Movie id";
    }
    let watchlistMovies = await taskData.getWatchlistByUser(requestData.id);
    // let userWatchListArray = await taskData.findUserWatchlist(requestData.id);
    // console.log(userWatchListArray);
    res.json(watchlistMovies);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * Get Recomendation by User-id
 * @param :id -> uid
 */


router.get("/recommendation/:id", async (req, res) => {
  try {
    const uid = req.params.id;
    if (!uid) {
      throw "uid - not given";
    }
    let  recomendedMovieArray = [];
    let userWatchListArray = await taskData.findUserWatchlist(uid);
    client.on('connect', function () {
      console.log("Connected to Redis...");
    });
    for (let i = 0; i < userWatchListArray.length; i++) {
      let recomendedMovies = await client.getAsync(userWatchListArray[i]);
      let r_movie_ids = Object.keys(JSON.parse(recomendedMovies)).map(item => parseInt(item));
      for (let j = 0; j < r_movie_ids.length; j++) {
        const movieId = r_movie_ids[j];
        let movieData = await taskData.getMovieByMovieId(movieId);
        movieData.inWatchList = true;
        recomendedMovieArray.push(movieData);
      }
    }
    res.json(recomendedMovieArray);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


/**
 * Post Watchlist by User-id
 * @param {uid : UserID, movieid: MovieId}
 */

// router.post("/watchlist/:uid", recommendFunction.recommendations);

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
    res.json(movie);
    await recommendFunction(requestData.uid);
  } catch (error) {
    res.status(500).json({ error: "Oops! Exception caught.", message: error });
  }
});

/**
 * PUT route - to delete movie from watchlist
 * @param {uid: userID, movieid: movieId}
 */

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
