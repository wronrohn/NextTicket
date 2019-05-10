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

  async getMovieById(movieId) {
    if (movieId && movieId != null) {
      const movieCollection = await tasks();
      const movie = await movieCollection.findOne({ _id: movieId });
      if (!movie) {
        return "task does not exist";
      }
      return movie;
    } else {
      return "task does not exist with that ID";
    }
  },

  async addToWatchList(movieId, uid) {

    const taskCollection = await tasks();
    let movieObj = await this.getMovieById(movieId);

    let updatedInf = {}
    try {
      if (!movieObj['watchlist']) {
        movieObj.watchlist = [uid];
        updatedInf = await taskCollection.updateOne({
          _id: movieId
        }, {
            $set: movieObj
          })
      } else {
        if(!movieObj["watchlist"].includes(uid)) {
          console.log("got it here");
          movieObj["watchlist"].push(uid)
          updatedInf = await taskCollection.updateOne({
            _id: movieId
          }, {
              $set: movieObj
            })
        }
      }
    } catch (e) {
      throw e;
    }
    movieObj.inWatchList = true;
    return movieObj;
  },

  async removeWatchlist(uid, movieId) {
    if (uid && movieId) {
      let movie = await this.getMovieById(movieId);
      if (movie.watchlist) {
        if(!movie["watchlist"].includes(uid)) {
          
        }
        console.log("watchlist exists in the JSON");
      }
      movie.inWatchList = false;
      return movie;
    } else {
      throw "Invalid uid or movieId";
    }
  }


};


module.exports = exportedMethods;
