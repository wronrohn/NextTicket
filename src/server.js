
/**
 * Sets up a simple Express/Redis server for delivering suggestions through Python.
 */

// TODO: Implement this class.
const proc = require('child_process');

// XXX: Under no circumbstance can you pass user input to this command!
// XXX: The python3 shell is Linux only!
const python = proc.spawnSync(
    'python3',
    [
        './python/main.py',
        '--sentiment',
        'Batman v. Superman'
    ],
);

// Sync.
console.log(python.stdout.toString());

// Async.
// python.stdout.on('data', (data) => {
//     console.log(data.toString());
// });

console.log("Hello World");
