const express = require("express");
const router = express.Router();
const data = require("../data");
const taskData = data.tasks;

router.get("/:text", async (req, res) => {
  try {
    const movies = await taskData.findMoviesInWhichTitleContains(
      req.params.text
    );
    res.json(movies);
  } catch (e) {
    console.log(`Error ${e}`);
    res.status(404).json({ message: "Post not found" });
  }
});

module.exports = router;
