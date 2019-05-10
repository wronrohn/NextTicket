const express = require("express");
const router = express.Router();
const data = require("../data");
const taskData = data.tasks;
const uuid = require("node-uuid");


router.get("/:id", async (req, res) => {
  try {
    const task = await taskData.getTaskById(req.params.id);
    res.json(task);
  } catch (e) {
    res.status(404).json({ message: "Post not found" });
  }
});

router.get("/", async (req, res) => {
  var hi = {
    "j":"l"
  }
  res.json(hi);
});

router.patch("/:id", async (req, res) => {
  try {
    let updatedData = req.body;
    let id = req.params.id;
    taskItem = await taskData.updateTaskByPatch(updatedData, id);
    res.json(taskItem);
  } catch (error) {
    res.status(500).json({ error: "Oops! Exception caught.", message: error });
  }
});

router.put("/:id", async (req, res) => {
  try {
    let updatedData = req.body;
    let id = req.params.id;
    taskItem = await taskData.updateTask(updatedData, id);
    res.json(taskItem);
  } catch (error) {
    res.status(500).json({ error: "Oops! Exception caught.", message: error });
  }
});

router.post("/:id/comments", async (req, res) => {
  try {
    let commentData = req.body;
    let taskId = req.params.id;
    const newComment = await taskData.addCommentToTask(taskId, commentData);
    res.json(newComment);
  } catch (error) {
    res.status(500).json({ error: "Oops! Exception caught.", message: error });
  }
});

router.delete("/:taskId/:commentId", async (req, res) => {
  try {
    // commentsUpdated = await taskData.deleteComment(req.params.taskId, req.params.commentId);
    flag = await taskData.deleteComment(req.params.taskId, req.params.commentId);
    if(flag) {
      const task = await taskData.getTaskById(req.params.taskId);
      res.json(task);
    } else {
      throw "Something wrong happened";
    }
  } catch (error) {
    res.status(500).json({ error: "Oops! Exception caught.", message: error });
  }
});


router.post("/", async (req, res) => {
  try {
    reqObj = req.body;

    //Condition to check if keys exist in the json ob
    if(!("title" in reqObj)) {throw "title is not defined."}
    if(!("description" in reqObj)) {throw "description is not defined."}
    if(!("hoursEstimated" in reqObj)) {throw "hoursEstimated is not defined."}
    if(!("completed" in reqObj)) {throw "completed is not defined."}


    if(!("comments" in reqObj)) {
      reqObj.comments = []
    }


    // Check every key are in proper type and not empty
    Object.keys(reqObj).forEach(function(key) {
      if(key == "title"){
        if(typeof reqObj[key] !==  "string") {
         throw "Improper title provided"; 
        }
      }
      if(key == "description"){
        if(typeof reqObj[key] !==  "string") {
         throw "Improper description provided"; 
        }
      }
      if(key == "hoursEstimated"){
        if(typeof reqObj[key] !==  "number") {
         throw "Improper hoursEstimated provided"; 
        }
      }
      if(key == "completed"){
        if(typeof reqObj[key] !==  "boolean") {
         throw "Improper completed provided "; 
        }
      }
      if(key == "comments"){
        if(typeof reqObj[key] !==  "object") {
         throw "Improper comments provided"; 
        } else {
          for (let i=0; i<reqObj[key].length; i++) {
            reqObj[key][i]['id'] = uuid.v4();
            if(reqObj[key][i].name === "" || typeof reqObj[key][i].name !== "string" ) {
              throw "Improper name provided in the comments";
            }
            if(reqObj[key][i].comment === "" || typeof reqObj[key][i].comment !== "string" ) {
              throw "Improper comment is provided";
            }
            // reqObj[key][i]['id'] = uuid.v4();
          }
        }
      }
    });
    reqObj['id'] = uuid.v4();
    reqObj._id = uuid.v4();
    let newTask = {
      _id: uuid.v4(),
      id: uuid.v4(),
      title: reqObj.title,
      description: reqObj.description,
      hoursEstimated: reqObj.hoursEstimated,
      completed: reqObj.completed,
      comments: reqObj.comments

    }
    resultJSON = await taskData.addTask(newTask);
    res.json(resultJSON);
  } catch (error) {
    res.status(500).json({ error: "Oops! Exception caught.", message: error });
  }
});



module.exports = router;
