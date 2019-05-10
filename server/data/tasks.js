const mongoCollections = require("../config/mongoCollections");
const tasks = mongoCollections.tasks;
const uuid = require("node-uuid");

let exportedMethods = {
  async findMoviesInWhichTitleContains(text) {
    const movieCollection = await tasks();
    movieCollection.createIndex({ title: "text" });
    const movies = await movieCollection
      .find({ $text: { $search: `${text}` } })
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
      const taskCollection = await tasks();
      const task = await taskCollection.findOne({ _id: movieId });
      if (!task) {
        return "task does not exist";
      }
      return task;
    } else {
      return "task does not exist with that ID";
    }
  },

  async addToWatchList(movieId, uid) {
    const taskCollection = await tasks();
    let movieObj = await this.getMovieById(movieId);

    let updatedInf = {};
    try {
      if (!movieObj["watchlist"]) {
        movieObj.watchlist = [uid];
        updatedInf = await taskCollection.updateOne(
          {
            _id: movieId
          },
          {
            $set: movieObj
          }
        );
      } else {
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
    } catch (e) {
      throw e;
    }

    return updatedInf;
  }
};

module.exports = exportedMethods;
