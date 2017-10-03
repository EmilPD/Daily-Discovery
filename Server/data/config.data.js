module.exports = (db) => {
    return {
        saveConfig(homePostsCount, categoryPostsCount) {
            return Promise.resolve()
                .then(() => {
                    const newConfig = db.get('config')
                        .assign({
                            "postsCountHome": homePostsCount,
                            "postsCountCategory": categoryPostsCount
                        })
                        .write();

                    return newConfig;
                });
        },
        getConfig() {
            return Promise.resolve()
                .then(() => {
                    const config = db.get('config')
                        .value();
                    return config;
                });
        }
    };
};