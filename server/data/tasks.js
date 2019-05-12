const mongoCollections = require("../config/mongoCollections");
const tasks = mongoCollections.tasks;
const uuid = require("node-uuid");
const request = require("request-promise");
const Redis = require("ioredis");
const JSONCache = require("redis-json");
const redis = new Redis();

const jsonCache = new JSONCache(redis, { prefix: "cache:" });

let exportedMethods = {
  async findMoviesInWhichTitleContains(text) {
    const movieCollection = await tasks();
    movieCollection.createIndex({ title: "text" });
    const movies = await movieCollection
      .find({ $text: { $search: { $regex: `/${text}/` } } })
      .toArray();
    console.log(`Movies ${movies}`);
    return movies;
  },

  async addMovie(task) {
    const movieCollection = await tasks();
    const movieInserted = await movieCollection.insertOne(task);
    const movieId = movieInserted.insertedId;
    return await this.getMovieById(movieId);
  },

  async getMovieById(movieId) {
    if (movieId && movieId != null) {
      const movieCollection = await tasks();
      const movie = await movieCollection.findOne({
        _id: movieId
      });
      if (!movie) {
        return "task does not exist";
      }
      return movie;
    } else {
      return "task does not exist with that ID";
    }
  },

  async getRecommendedMovies(movie, requestData) {
    let inMovie = {
      movie: movie
    };

    var options = {
      method: "POST",
      uri: "http://localhost:5000/postdata",
      body: inMovie,
      json: true // Automatically stringifies the body to JSON
    };

    var result = {
      success: false
    };
    let recomendedMovies = {
      uid: requestData.uid,
      recomendations: []
    };

    var sendrequest = await request(options)
      .then(async function(parsedBody) {
        result.success = true;
        let r_ids = Object.keys(parsedBody).map(item => parseInt(item));
        for (let i = 0; i < r_ids.length; i++) {
          let recMovie = await exportedMethods.getMovieByMovieId(r_ids[i]);
          recomendedMovies.recomendations.push(recMovie);
        }
        await jsonCache.set(requestData.uid, recomendedMovies.recomendations);
        const response = await jsonCache.get(requestData.uid);
        // console.log(response);
      })
      .catch(function(err) {
        console.log(err);
      });
  },

  async getRecommendedMoviesByUserId(userId) {
    if (!userId) {
      throw "Invalid User Id";
    }
    const responseNew = await jsonCache.get("Batman");
    console.log("Response New");
    console.log(responseNew);
    const response = await jsonCache.get(userId);
    if (response) {
      console.log(response);
      var responseArray = [];
      if (response) {
        for (key in response) {
          if (response.hasOwnProperty(key)) {
            // console.log(key + " -> " + response[key]);
            response[key].inWatchList = true;
            responseArray.push(response[key]);
          }
        }
        return responseArray;
      } else {
        return [];
      }
    }
  },

  async getMovieByMovieId(movieId) {
    
    if (movieId && movieId != null) {
      const movieCollection = await tasks();
      const movie = await movieCollection.findOne({
        movieid: movieId
      });
      console.log(movie);
      if (!movie) {
        return "task does not exist";
      }
      return movie;
    } else {
      return "task does not exist with that ID";
    }
  },

  async addToWatchList(movieid, uid) {
    const taskCollection = await tasks();
    let movieObj = await this.getMovieById(movieid);
    let updatedInf = {};
    try {
      if (!movieObj["watchlist"] || movieObj["watchlist"].length == 0) {
        movieObj.watchlist = [uid];
        movieObj["inWatchList"] = true;
        updatedInf = await taskCollection.updateOne(
          {
            _id: movieid
          },
          {
            $set: movieObj
          }
        );
      } else {
        if (!movieObj["watchlist"].includes(uid)) {
          movieObj["watchlist"].push(uid);
          movieObj["inWatchList"] = true;
          updatedInf = await taskCollection.updateOne(
            {
              _id: movieid
            },
            {
              $set: movieObj
            }
          );
        }
      }
    } catch (e) {
      throw e;
    }
    
    return movieObj;
  },


  async removeWatchlist(uid, movieId) {
    const taskCollection = await tasks();
    try {
      if (uid && movieId) {
        let movie = await this.getMovieById(movieId);

        if (movie.watchlist) {
          if (movie["watchlist"].includes(uid)) {
            //console.log("I am here")
            movie.watchlist = movie["watchlist"].filter(item => item != uid);
            if (movie["watchlist"].length == 0) {
              movie["inWatchList"] = false;
            }
            
            updatedInf = await taskCollection.updateOne(
              {
                _id: movieId
              },
              {
                $set: movie
              }
            );
          }
        }
        
        return movie;
      } else {
        throw "Invalid uid or movieId";
      }
    } catch (e) {
      throw e;
    }
  },

  async getWatchlistByUser(uid) {
    if (!uid) {
      throw "No user id given";
    }
    let userWatchlist = [];
    const taskCollection = await tasks();

    let movies = await this.getAllMovies();

    movies = movies
      .map(item => {
        if (item["watchlist"]) {
          if (item["watchlist"].includes(uid)) {
            return item;
          }
        }
      })
      .filter(item => item !== undefined);
    return movies;
  },
  async getAllMovies() {
    const taskCollection = await tasks();
    const movies = taskCollection.find({}).toArray();
    return movies;
  },

  async findMoviesInWhichTitleContains(text) {
    const movieCollection = await tasks();
    movieCollection.createIndex({ title: "text" });
    const movies = await movieCollection
      .find({ $text: { $search: `${text}` } })
      .toArray();
    console.log(`Movies ${movies}`);
    return movies;
  },
  /**
   * Retrieves a user's watchlist using their uuid.
   * @param {string} uid  A user's uuid in the system.
   */
  async findUserWatchlist(uid) {
    if (!uid) {
      throw new Error("No user id given.");
    }

    let movies = await this.getAllMovies();

    movies = movies
      .map(item => {
        if (item["watchlist"]) {
          if (item["watchlist"].includes(uid)) {
            return item.movie;
          }
        }
      })
      .filter(item => item !== undefined);
    // console.log(movies);
    if (movies) {
      return movies;
    } else {
      return [];
    }
  },

  async getMovieByMovieName(name){
    if (name && name != null) {
      const movieCollection = await tasks();
      name = name.split(" ").map(string => {
        return string.charAt(0).toUpperCase() + string.slice(1)
      }).join(" ")
      console.log(name)
      const movie = await movieCollection.findOne({
        movie: name
      });
      if (!movie) {
        return "task does not exist";
      }
      return movie;
    } else {
      return "task does not exist with that ID";
    }
  }
};

// async function test() {
//   let x = await exportedMethods.getMovieByMovieId(2)
//   console.log(x)
//   return 0;
// }
// test()
module.exports = exportedMethods;
