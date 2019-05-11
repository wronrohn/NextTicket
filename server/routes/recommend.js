
const bluebird = require('bluebird');
const redis = require('redis');
const RPubSub = require("node-redis-pubsub");
const data = require("../data");
const client = redis.createClient();

const PYTHON_CHANNEL = {
    port: 6379,
    scope: "movie_request" // Defined by the pymovierec and must be the same as there.
}

const pubsub = new RPubSub(PYTHON_CHANNEL);
bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

/**
 * A route that will handle GET '/recommendations/:uid' using pubsub and Redis.
 */

//async function recommendations(req, res) {
async function recommendations(uid) {
    console.log("indsde the recomm " + uid);
    // Return the recommendations for the given UID.
    // (Use the uid to look up watchlist and the cache to get recommendations.)
    try {
        //let uid = req.body.uid;
        if( ! uid) {
            // res.status(500).json( { error: "400 - No UID Given" } );
        }

        let results = [];
        let missing = [];

        // 1. Get watchlist for user with UID. (May be empty.)
        let movieData = await data.tasks.findUserWatchlist(uid);

        // 2. For each item in watchlist:
        
        // }
        // for(elem in movieData) {
        for (let i = 0; i < movieData.length; i++) {
            const elem = movieData[i];
            console.log("movie : ", elem);
            // See what recommendations are on Redis.
            let resolvedData = await client.getAsync(elem);
            resolvedData = JSON.parse(resolvedData);

            // IF Redis has recommendation
            if(resolvedData) {
                // Collecte to return to the user.
                results.push(resolvedData);
            }
            else {
                // Collect it to make a request for new recommendations.
                missing.push(elem);
            }
        }

        // 3. Publish request for new recommendations.
        // May take up to 10 seconds to finish so DO NOT WAIT FOR IT.
        if(missing.length > 0) {
            // Python module requires that requests start with this code-word.
            let reqString = "REC: "
            reqString = reqString + missing.join(",");
            console.log(reqString);
            pubsub.emit("send-message", { message: reqString });
        }

        // 4. Return whatever was ready at the time of the request.
        // res.status(200).json( results );
    }
    catch (error) {
        // res.status(500).json( { error: "500 - " + error.message });
    }

}

module.exports = recommendations;
