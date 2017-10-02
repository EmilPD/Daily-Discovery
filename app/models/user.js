import { validator } from '../utils/validator.js';

const User = (() => {
    class User {
        constructor(name, username, password, imageUrl, role) {
            this.name = name;
            this.username = username;
            this.password = password;
            this.imageUrl = imageUrl;
            this.role = role || 'user';
        }

        get name() {
            return this._name;
        }

        set name(value) {
            validator.validateIfUndefinedOrNull(value, 'Name');
            validator.validateTypeOf(value, 'Name', 'string');
            validator.validateIfEmptyString(value, 'Name');
            this._name = value;
        }

        get username() {
            return this._username;
        }

        set username(value) {
            validator.validateIfUndefinedOrNull(value, 'Username');
            validator.validateUsername(value);
            validator.validateIfEmptyString(value, 'Username');
            this._username = value;
        }

        get password() {
            return this._password;
        }

        set password(value) {
            validator.validateIfUndefinedOrNull(value, 'Password');
            validator.validatePassword(value);
            validator.validateIfEmptyString(value, 'Password');
            this._password = value;
        }

        get imageUrl() {
            return this._imageUrl;
        }

        set imageUrl(value) {
            validator.validateIfUndefinedOrNull(value, 'Image url');
            validator.validateUrl(value);
            validator.validateIfEmptyString(value, 'Image url');
            this._imageUrl = value;
        }

        get role() {
            return this._role;
        }

        set role(value) {
            validator.validateIfUndefinedOrNull(value, 'Role');
            validator.validateTypeOf(value, 'Role', 'string');
            validator.validateIfEmptyString(value, 'Role');
            this._role = value;
        }
    }

    return User;
})();

export { User };