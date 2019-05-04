
import { AUTH } from './Constants';

/**
 * Helper module for authentication using Firebase.
 *
 * Based on "React Second Lecture/Firebase Auth" example project.
 *
 * @verison 05.13.2018
 */

/**
 * Creates a new user using an email and password
 *
 * @param {*} email
 * @param {*} password
 * @param {*} displayName
 */
async function doCreateUserWithEmailAndPassword(email, password, displayName) {
    await AUTH.createUserWithEmailAndPassword(email, password);
    AUTH.currentUser.updateProfile({ displayName: displayName });
}

/**
 * Logs a user in using an email and password.
 *
 * @param {*} email
 * @param {*} password
 */
async function doSignInWithEmailAndPassword(email, password) {
    await AUTH.signInWithEmailAndPassword(email, password);
}

/**
 * Resets the password for the given account. (Part of account recovery.)
 *
 * @param {*} email
 */
async function doPasswordReset(email) {
    await AUTH.sendPasswordResetEmail(email);
}

/**
 * Signs out the current user.
 */
async function doSignOut() {
    await AUTH.signOut();
}

/**
 * @returns {boolean}   True if the current user is authenticated.
 */
function isAuthenticated() {
    return (AUTH.currentUser !== null && AUTH.currentUser !== undefined);
}

export {
    AUTH,
    doCreateUserWithEmailAndPassword,
    doSignInWithEmailAndPassword,
    doPasswordReset,
    doSignOut,
    isAuthenticated
};
