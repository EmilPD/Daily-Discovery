module.exports = (db) => {
    function getConfig() {
        const config = db.get('config').value();

        return config;
    }

    return {
        getAllPostsByNameAndPage(categoryName, pageNumber) {
            return Promise.resolve()
                .then(() => {
                    const postsPerPage = getConfig().postsCountCategory;
                    const postsForPageInCategory = db.get('categories')
                        .find({
                            shortname: categoryName
                        })
                        .get('posts')
                        .value();

                    const from = pageNumber * postsPerPage - postsPerPage;
                    const until = pageNumber * postsPerPage;

                    if (postsForPageInCategory) {
                        return postsForPageInCategory.slice(from, until);
                    }

                    return null;
                });
        },
    };
};