const express = require("express");
const bodyParser = require("body-parser");
const proc = require("child_process");
const configRoutes = require("./routes");
const cors = require("cors");
const redis = require("redis");
const bluebird = require("bluebird");

const client = redis.createClient();

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

client.on("connect", function() {
  console.log("Connected to Redis...");
});

/**
 * Entrypoint for the server applicaiton.
 *
 * This file will first start up the Python daemon application, then start
 * up the JavaScript server application.
 *
 * It expects that a Redis instance is already running at localhost.
 */

/**
 * THE COMMANDS USED FOR THIS FILE ARE OPERATING SYSTEM DEPENDENT
 *          - USE CAUTION WHEN RUNNING ON WINDOWS/MAC -
 */

// Correct Python command is `py` in Windows but `python3` in Linux/Mac.
const isWin = process.platform === "win32";
const python = isWin ? "py" : "python3";
const pymovierec = proc.spawn(python, ["./pymovierec", "--verbose"], {
  stdio: [process.stdin, process.stdout, process.stderr]
});
const app = express();
app.use(cors());

/**
 * Cleans up a stale daemon.
 */
function cleanup() {
  console.log("Cleaning up daemon...");
  pymovierec.kill("SIGINT");
  process.exit();
}

//
// Python Module
//

process.on("SIGINT", cleanup);
process.on("SIGTERM", cleanup);

//
// Express
//

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

configRoutes(app);

app.listen(3000, () => {
  console.log("We've now got a server!");
  console.log("Your routes will be running on http://localhost:3000");
});
