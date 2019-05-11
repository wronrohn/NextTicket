const mongoCollections = require("../config/mongoCollections");
const tasks = mongoCollections.tasks;
const uuid = require("node-uuid");

let exportedMethods = {
  async addMovie(task) {
    const movieCollection = await tasks();
    const movieInserted = await movieCollection.insertOne(task);
    const movieId = movieInserted.insertedId;
    return await this.getMovieById(movieId);
  },

  async findMoviesInWhichTitleContains(text) {
    const movieCollection = await tasks();
    movieCollection.createIndex({ title: "text" });
    const movies = await movieCollection
      .find({ $text: { $search: `${text}` } })
      .toArray();
    return movies;
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
  async getMovieByMovieId(movieId) {
    // XXX: This method is the same as getMovieById above.
    if (movieId && movieId != null) {
      const movieCollection = await tasks();
      const movie = await movieCollection.findOne({
        movieid: movieId
      });
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
          updatedInf = await taskCollection.updateOne(
            {
              _id: movieId
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
    movieObj.inWatchList = true;
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
            movie.watchlist = movie["watchlist"].filter(item => item !== uid);
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
        movie.inWatchList = false;
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

    //console.log(movies)

    return movies;
  },
  async getAllMovies() {
    const taskCollection = await tasks();
    const movies = taskCollection.find({}).toArray();
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

    const collection = await tasks();

    // XXX: AFAIK there is no method to actually find a user's watchlist.
    //      The return type should be of array: [ movie, movie, movie ].
    let watchlist = await collection.findOne({
      _id: uid
    });

    if (watchlist) {
      return watchlist;
    } else {
      return [];
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
