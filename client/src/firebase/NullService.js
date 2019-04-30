
/** Human-readable name for the service. */
const SERVICE = 'NULL_SERVICE';

/**
 * A null firebase user (as used by this project).
 */
class FirebaseNullUser {

    updateProfile(obj) {
        console.log(SERVICE, "updateProfile", obj);
    }

}

/**
 * A null service firebase authentication handle (as used by this project).
 *
 * @verison 05.13.2018
 */
class FirebaseNullService {

    constructor() {
        this.currentUser = null;
    }

    async createUserWithEmailAndPassword(email, password) {
        console.log(SERVICE, "createUserWithEmailAndPassword", email, password);
    }
    
    async signInWithEmailAndPassword(email, password) {
        this.currentUser = new FirebaseNullUser();
        console.log(SERVICE, "signInWithEmailAndPassword", email, password);
    }

    async sendPasswordResetEmail(email) {
        console.log(SERVICE, "sendPasswordResetEmail", email);
    }

    async signOut() {
        this.currentUser = null;
        console.log(SERVICE, "signOut");
    }

    onAuthStateChanged(handler) {
        console.log(SERVICE, "onAuthStateChanged");
    }
}

function initializeApp(conf) {
    console.log(SERVICE, "initializeApp", conf);
}

function auth() {
    console.log(SERVICE, "auth");
    return new FirebaseNullService();
}

export default {
    initializeApp,
    auth
}
