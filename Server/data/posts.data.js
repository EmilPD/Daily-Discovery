module.exports = (db) => {
    function getConfig() {
        const config = db.get('config').value();
        
        return config;
    }

    return {
        getCategoryIdByName(name) {
            return Promise.resolve()
                .then(() => {
                    const catId = db.get('categories')
                        .find({shortname: name})
                        .value()
                        .id;
                    return catId;
                });
        },

        getCategoryNameByShortname(name) {
            return Promise.resolve()
                .then(() => {
                    const catName = db.get('categories')
                        .find({shortname: name})
                        .value()
                        .name;
                    return catName;
                });
        },

        getById(id) {
            return Promise.resolve()
                .then(() => {
                    const post = db.get('categories')
                        .reduce((acc, val) => acc.concat( val.posts ), [])
                        .find({ id: id })
                        .value();
                    return post;
                });
        },

        getAllPosts(pageNumber) {
            return Promise.resolve()
                .then(() => {
                    const postsPerPageHome = getConfig().postsCountHome;

                    const postsForPage = db.get('categories')
                        .reduce((acc, val) => acc.concat( val.posts ), [])
                        .value();
                        
                    const from = pageNumber * postsPerPageHome - postsPerPageHome;
                    const until = pageNumber * postsPerPageHome;
                    return postsForPage.slice(from, until);
                });
        },

        getNumberOfPosts(count) {
            return Promise.resolve()
                .then(() => {
                    const posts = db.get('categories')
                        .reduce((acc, val) => acc.concat( val.posts ), [])
                        .value();
                        
                    return posts.slice(0, count);
                });
        },

        add(post) {
            return Promise.resolve()
                .then(() => {
                    db.get('categories')
                        .find({ id: post.categoryId })
                        .get('posts')
                        .push(post)
                        .write();
                    
                    return db.get('categories')
                        .find({ id: post.categoryId })
                        .get('posts')
                        .last()
                        .value();
                });
        },

        addComment(comment, postId) {
            return Promise.resolve()
                .then(() => {
                    db.get('categories')
                        .reduce((acc, val) => acc.concat( val.posts ), [])
                        .find({ id: postId })
                        .get('comments')
                        .push(comment)
                        .write();
                    
                    return comment;
                });
        },

        addReplyComment(comment, commentId) {
            return Promise.resolve()
                .then(() => {
                    db.get('categories')
                        .reduce((acc, val) => acc.concat( val.posts ), [])
                        .reduce((acc, val) => acc.concat( val.comments ), [])
                        .find({ id: commentId })
                        .get('replyComments')
                        .push(comment)
                        .write();
                    
                    return comment;
                });
        },
    };
};