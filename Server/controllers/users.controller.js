const auth = require('../utils/auth.utils');

module.exports = (data) => {
    function register(req, res) {
        const user = req.body;
        return data.users.findByUsername(user.username)
            .then((dbUser) => {
                if (dbUser) {
                    return res.status(404)
                        .send({
                            error: 'Username is already taken'
                        });
                }

                const passHash = auth.getPassHash(user.username, user.password);
                user.passHash = passHash;
                user.authKey = auth.generateAuthKey(user.passHash);

                return data.users.add(user);
            })
            .then((user) => {
                return res.status(201)
                    .json({
                        result: {
                            username: user.username
                        }
                    });
            });
    }

    function login(req, res) {
        const user = req.body;

        return data.users.findByUsername(user.username)
            .then((dbUser) => {
                if (!dbUser) {
                    res.status(404)
                        .json('Invalid username');
                    return;
                }

                const passHash = auth.getPassHash(user.username, user.password);

                if (dbUser.passHash !== passHash) {
                    res.status(404)
                        .json('Invalid password');
                    return;
                }

                return res.send({
                    result: {
                        name: dbUser.name,
                        username: dbUser.username,
                        authKey: dbUser.authKey
                    }
                });

            });
    }

    function getAll(req, res) {
        const user = req.user;

        if (!user || typeof user.username !== 'string' || user.role !== 'admin') {
            res.status(400)
                .json('Only admin can see registered users!');
            return;
        }

        return data.users.getAll()
            .then((users) => {
                return res.status(201)
                    .json(users);
            });
    }

    function isAdmin(req, res) {
        const user = req.user;

        if (user && user.role === 'admin') {
            return res.status(201)
                .json({
                    isAdmin: 'true'
                });
        } else {
            return res.status(201)
                .json({
                    isAdmin: 'false'
                });
        }
    }

    return {
        register: register,
        login: login,
        isAdmin: isAdmin,
        getAll: getAll,
    };
};