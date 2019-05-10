const dbConnection = require("./config/mongoConnection");
const data = require("./data");
const taskObj = data.tasks;
const uuid = require("node-uuid");
const jsonfile = require("jsonfile");
const file = "movie.json";

const main = async () => {
  const db = await dbConnection();
  jsonfile.readFile(file, async function(err, obj) {
    for (let i = 0; i < obj.length; i++) {
      dataToSeed = {
        _id: uuid.v4(),
        movieid: obj[i].index,
        category: obj[i].category,
        movie: obj[i].movie,
        title: obj[i].title,
        rating: obj[i].rating,
        genre: obj[i].genre,
        subgenre: obj[i].subgenre,
        theme: obj[i].theme,
        keyword: obj[i].keyword,
        releasedate: obj[i].releasedate,
        country: obj[i].country,
        description: obj[i].review
      };
      var taskNew = await taskObj.addMovie(dataToSeed);
      console.log(taskNew);
    }
    // await db.dropDatabase();
    console.log("Seeding database is done!");
    db.movies_database.createIndex({ title: "text" });
    await db.serverConfig.close();
  });
};

main().catch(console.log);
