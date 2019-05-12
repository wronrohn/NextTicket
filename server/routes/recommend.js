
const bluebird = require('bluebird');
const ioredis = require('ioredis');
const redis = require('redis');
const data = require("../data");
const client = redis.createClient();
const PYTHON_CHANNEL = "movie_request";

/**
 * A route that will handle GET '/recommendations/:uid' using pubsub and Redis.
 */

const pubsub = new ioredis();
bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

async function recommendations(uid) {

    // Return the recommendations for the given UID.
    // (Use the uid to look up watchlist and the cache to get recommendations.)
    try {
        if( ! uid) {
            throw new Error("No UID supplied.");
        }

        let results = [];
        let missing = [];

        // 1. Get watchlist for user with UID. (May be empty.)
        let movieData = await data.tasks.findUserWatchlist(uid);

        // 2. For each item in watchlist.
        for (let i = 0; i < movieData.length; i++) {

            const elem = movieData[i];
            console.log("movie : ", elem);

            // See what recommendations are on Redis.
            let resolvedData = await client.getAsync(elem);
            resolvedData = JSON.parse(resolvedData);

            // IF Redis has recommendation
            if(resolvedData) {
                // Collect to return to the user.
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
            console.log("Requiesting: " + reqString);
            await pubsub.publish(PYTHON_CHANNEL, reqString);
        }

        // 4. Return whatever was ready at the time of the request.
        return results;
    }
    catch (error) {
        throw new Error("Unexpected error");
    }

}

module.exports = recommendations;
