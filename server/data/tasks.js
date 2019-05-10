const mongoCollections = require("../config/mongoCollections");
const tasks = mongoCollections.tasks;
const uuid = require("node-uuid");

let exportedMethods = {
  async addMovie(task)
  {
    const movieCollection = await tasks();
    const movieInserted = await movieCollection.insertOne(task);
    const movieId = movieInserted.insertedId;
    return await this.getMovieById(movieId);
  },

  async getMovieById(movieId) {
    if(taskId && taskId != null) {
      const taskCollection = await tasks();
      const task = await taskCollection.findOne({ _id: taskId });
      if(!task) {
        return "task does not exist";
      }
      return task;
    } else {
      return "User does not exist with that ID";
    }
  }

  
};

module.exports = exportedMethods;
