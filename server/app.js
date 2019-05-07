
const proc = require('child_process');
const server = require('./movierecJS');

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

const isLinux    = process.platform === "linux";
const python     = isLinux ? 'python3' : 'py'; // python3 is Linux only
const pymovierec = proc.spawnSync( python, ["./pymovierec"] );
const movierecJS = new server();

/**
 * Cleans up a stale daemon.
 */
function cleanup() {
    pymovierec.kill('SIGINT');
    process.exit();
}

// Sync.
console.log(pymovierec.stdout.toString());

/*/ Async.
pymovierec.stdout.on('data', (data) => {
    console.log(data.toString());
});

movierecJS.startup();

process.on('SIGINT', cleanup);
process.on('SIGTERM', cleanup);
//*/
