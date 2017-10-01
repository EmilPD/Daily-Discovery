module.exports = (db) => {
    return {
        getAll() {
            return Promise.resolve()
                .then(() => {
                    return db.get('users')
                        .value();
                });
        },
        
        getByAuthKey(key) {
            const user = db.get('users')
                .find({ authKey: key })
                .value();
            return user;
        },

        getById(id) {
            return Promise.resolve()
                .then(() => {
                    const user = db.get('users')
                        .getById(id).value();
                    return user;
                });
        },

        findByToken(token) {
            return this.getById(token);
        },

        findByUsername(username) {
            return Promise.resolve()
                .then(() => {
                    const user = db.get('users')
                        .find({
                            username: username
                        })
                        .value();

                    return user;
                });
        },

        add(user) {
            return Promise.resolve()
                .then(() => {
                    const userWithoutPassword = {};
                    const usersCount = db.get('users').value().length;

                    if (usersCount === 0) {
                        userWithoutPassword.role = 'admin';
                        userWithoutPassword.admin = true;
                    } else {
                        userWithoutPassword.role = user.role;
                        userWithoutPassword.admin = false;
                    }

                    userWithoutPassword.name = user.name;
                    userWithoutPassword.username = user.username;
                    userWithoutPassword.passHash = user.passHash;
                    userWithoutPassword.authKey = user.authKey;
                    userWithoutPassword.imageUrl = user.imageUrl;
                    
                    const id = db.get('users').insert(userWithoutPassword)
                        .write()
                        .id;
                    return db.get('users')
                        .getById(id);
                });
        },
    };
};