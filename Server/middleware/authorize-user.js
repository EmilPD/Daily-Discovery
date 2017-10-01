const AUTH_KEY_HEADER_NAME = 'daily-discovery-auth-key';
module.exports = (app, data) => {
    app.use((req, res, next) => {
        const authKey = req.headers[AUTH_KEY_HEADER_NAME];
        const user = data.users.getByAuthKey(authKey);
        req.user = user || null;
        next();
    });
};