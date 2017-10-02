import { requester } from '../utils/requester';

const users = (() => {
    const LOCALSTORAGE_AUTH_KEY_NAME = 'daily-discovery-auth-key';
    const LOCALSTORAGE_USER_NAME_KEY = 'daily-discovery-user-name-key';

    return {
        login(username, password) {
            const body = {
                username,
                password
            };

            return requester.put('/api/auth/login', body)
                .then((res) => {
                    const user = res.result;
                    localStorage.setItem(LOCALSTORAGE_AUTH_KEY_NAME, user.authKey);
                    localStorage.setItem(LOCALSTORAGE_USER_NAME_KEY, user.name);
                    return user;
                });
        },

        register(user) {
            const body = {
                name: user.name,
                username: user.username,
                password: user.password,
                imageUrl: user.imageUrl,
                role: user.role,
            };

            return requester.post('/api/auth/register', body);
        },

        logout() {
            const promise = new Promise((resolve, reject) => {
                localStorage.removeItem(LOCALSTORAGE_AUTH_KEY_NAME);
                localStorage.removeItem(LOCALSTORAGE_USER_NAME_KEY);
                resolve();
            });

            return promise;
        },

        hasUser() {
            return !!localStorage.getItem(LOCALSTORAGE_AUTH_KEY_NAME) &&
                !!localStorage.getItem(LOCALSTORAGE_USER_NAME_KEY);
        },

        isAdmin() {
            const headers = {
                'daily-discovery-auth-key': localStorage.getItem(LOCALSTORAGE_AUTH_KEY_NAME)
            };

            return requester.get('/api/auth/isAdmin', headers);
        },

        getUserName() {
            return localStorage.getItem(LOCALSTORAGE_USER_NAME_KEY);
        },

        getAll() {
            const headers = {
                'daily-discovery-auth-key': localStorage.getItem(LOCALSTORAGE_AUTH_KEY_NAME)
            };

            return requester.get('/api/auth/users', headers);
        },

    };
})();

export { users };