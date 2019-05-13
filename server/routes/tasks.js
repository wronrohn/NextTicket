const express = require("express");
const router = express.Router();
const data = require("../data");
const taskData = data.tasks;

const recommendFunction = require("./recommend");
const redis = require("redis");
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

    let recomendedMovieArray = [];
    let userWatchListArray = await taskData.findUserWatchlist(uid);

    client.on("connect", function () {
      console.log("Connected to Redis...");
    });

    for (let i = 0; i < userWatchListArray.length; i++) {

      let recomendedMovies = await client.getAsync(userWatchListArray[i]);

      if (recomendedMovies) {
        let r_movie_ids = Object.keys(JSON.parse(recomendedMovies)).map(item =>
          parseInt(item)
        );
        for (let j = 0; j < r_movie_ids.length; j++) {
          const movieId = r_movie_ids[j];
          let movieData = await taskData.getMovieByMovieId(movieId);
          movieData.inWatchList = true;
          recomendedMovieArray.push(movieData);
        }
      }
      else {
        // We may end up here if Redis has nothing cached but a request
        // is made anyway. Requests can leak this way if a user makes
        // a watchlist but the cache is cleared after.
        recomendedMovies = [];
      }
    }

    res.json(recomendedMovieArray);

  } catch (error) {
    // console.log(error.stack);
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

// router.post("/recommendations/", recommendFunction);

router.get("/name/", async (req, res) => {
  console.log("inside the route");
  try {
    let requestData = req.query.text;
    if (!requestData) {
      throw "Provide movie name";
    }
    let r_moviesJSON = await taskData.getMovieByMovieName(requestData);
    res.json(r_moviesJSON);
  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
});

//Don't delete creared by Sumit
router.get("/:id", async (req, res) => {
  console.log("test");
  try {
    let requestData = req.params;
    if (!requestData.id) {
      throw "Provide uid or Movie id";
    }
    let r_moviesJSON = await taskData.getMoviesByID(requestData.id);
    res.json(r_moviesJSON);
  } catch (error) {
    console.log(`Error ${e}`);
    res.status(404).json({
      error: error.message
    });
  }
});

/**
 * A maintenance route that ensures requests for a watchlist are looked for
 * in cache as soon as a user logs in.
 *
 * This way if a user makes a watchlist, logs out, clears redis, and logs
 * back in, the watchlist will not disappear.
 */
router.post("/sync/", async (req, res) => {
  try {
    requestData = req.body;
    if (!requestData.uid) {
      throw "User id not provided.";
    }
    await recommendFunction(requestData.uid);
  } catch (error) {
    // Fails silently so as to not block client.
    console.warn("WARNING: Exception while sync:", error.message);
    res.status(200).json({ message: "Nothing to see here." });
  }
});

module.exports = router;
