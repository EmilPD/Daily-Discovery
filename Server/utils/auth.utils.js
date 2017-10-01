const CryptoJS = require('../../../node_modules/crypto-js/index.js');

class AuthUtils {
    generateAuthKey(uniquePart) {
        const AUTH_KEY_LENGTH = 60;
        const AUTH_KEY_CHARS = 'qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM!@#$%^&*()_+-=';

        let authKey = uniquePart;
        let index;

        while (authKey.length < AUTH_KEY_LENGTH) {
            index = Math.floor(Math.random() * AUTH_KEY_CHARS.length);
            authKey += AUTH_KEY_CHARS[index];
        }

        return authKey;
    }

    getPassHash(username, password) {
        return CryptoJS.SHA1(username + password).toString();
    }
}

let auth = new AuthUtils();
module.exports = auth;