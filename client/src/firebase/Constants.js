
// XXX: Using a null service for now.
// import fbservice from "firebase/app";
import "firebase/auth";
import fbservice from './NullService';

/**
 * Globals for use with Firebase.
 *
 * Based on "React Second Lecture/Firebase Auth" example project.
 */

const CONF = {
    apiKey:            process.env.REACT_APP_API_KEY,
    authDomain:        process.env.REACT_APP_AUTH_DOMAIN,
    databaseURL:       process.env.REACT_APP_DATABASE_URL,
    projectId:         process.env.REACT_APP_PROJECT_ID,
    storageBucket:     process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID
};

fbservice.initializeApp(CONF)
const AUTH = fbservice.auth();

export {
    AUTH
}
