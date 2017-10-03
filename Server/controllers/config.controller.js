module.exports = (data) => {
    function saveConfig(req, res) {
        const config = req.body;
        const user = req.user;

        if (!user || typeof user.username !== 'string' || user.role !== 'admin') {
            res.status(400)
                .json('Only admin can publish posts!');
            return;
        }

        return data.config.saveConfig(config.homePostsCount, config.categoryPostsCount)
            .then((newConfig) => {
                return res.status(201)
                    .json({
                        result: newConfig
                    });
            });
    }

    function getConfig(req, res) {
        return data.config.getConfig()
            .then((config) => {
                return res.status(201)
                    .json(config);
            });
    }

    return {
        getConfig: getConfig,
        saveConfig: saveConfig
    };
};