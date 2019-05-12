
const express = require("express");
const router = express.Router();
const fs = require('fs');
const path = require('path');

const KEY_ACTION        = "action";
const KEY_ADVENTURE     = "adventure";
const KEY_COMEDY        = "comedy";
const KEY_DRAMA         = "drama";
const KEY_FANTASY       = "fantasy";

const ASSET_NOT_FOUND   = "../static/invariant/a_not_found.svg";
const ASSET_ACTION      = "../static/invariant/a_action.svg";
const ASSET_ADVENTURE   = "../static/invariant/a_adventure.svg";
const ASSET_COMEDY      = "../static/invariant/a_comedy.svg";
const ASSET_DRAMA       = "../static/invariant/a_drama.svg";
const ASSET_FANTASY     = "../static/invariant/a_fantasy.svg";

/**
 * Negotiates invariant images only.
 *
 * Expects the following two routes:
 *
 * /images/:movieTitle
 * /images/:genre/:movieTitle
 *
 * Where genre and movieTitle are string name of the genre and movie
 * respectively. For example '/images/action/Batman'.
 *
 * This route expects to be run in tandem with 'express.static'. That module
 * will fall through to this one should it not find a requested static asset.
 * Then, and only then, will this module produce either a "not found" image if
 * no genre is specified or a generic "genre" image.
 *
 * @param {Request} req     The Redis request that led us here. Should reflect
 *                          the routes described above.
 * @param {Response} res    The Redis response to use when resolving images.
 *                          It never fails, rather it ensures some kind of
 *                          image is always returned.
 */
async function serveImage(req, res) {

    let movieTitle = req.params.movieTitle;
    let genre = req.params.genre;

    // console.log(">>>>> Serve Image:", movieTitle, genre);

    let file = null;

    if(genre) {
        switch(genre) {
            case KEY_ACTION:    file = ASSET_ACTION; break;
            case KEY_ADVENTURE: file = ASSET_ADVENTURE; break;
            case KEY_COMEDY:    file = ASSET_COMEDY; break;
            case KEY_DRAMA:     file = ASSET_DRAMA; break;
            case KEY_FANTASY:   file = ASSET_FANTASY; break;
            default:            file = ASSET_NOT_FOUND; break;
        }
    }

    if( ! genre && ! file) {
        file = ASSET_NOT_FOUND;
    }

    // console.log(">>>>> Resloved on:", file);

    file = path.join(__dirname, file);
    if( ! fs.existsSync(file)) {
        console.warn("WARNING: Couldn't find fall-back: ", file);
        res.status(500).json( { error: "500" } );
        return;
    }

    res.status(200).type('svg').sendFile(file);
}

router.get("/:movieTitle", serveImage);
router.get("/:genre/:movieTitle", serveImage);
module.exports = router;
