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

        getHomePaginationInfo() {
            return Promise.resolve()
                .then(() => {
                    const postsPerPageHome = getConfig().postsCountHome;

                    const count = db.get('categories')
                        .reduce((acc, val) => acc.concat( val.posts ), [])
                        .value()
                        .length;

                    const paginationInfo = {postsCount: count, postsPerPage: postsPerPageHome};

                    return paginationInfo;
                });
        },

        getCategoryPaginationInfo(categoryName) {
            return Promise.resolve()
                .then(() => {
                    const postsPerPageCategory = getConfig().postsCountCategory;
                    
                    let count = db.get('categories')
                        .find({shortname: categoryName})
                        .get('posts')
                        .value();
                    
                    if (count) {
                        count = count.length;
                    } else {
                        count = 'undefined';
                    }

                    const paginationInfo = {postsCount: count, postsPerPage: postsPerPageCategory};

                    return paginationInfo;
                });
        },

        getPostsCount() {
            return Promise.resolve()
                .then(() => {
                    const postsCount = db.get('categories')
                        .reduce((acc, val) => acc.concat( val.posts ), [])
                        .value()
                        .length;
                    return postsCount;
                });
        },

        getRelatedPosts(categoryId, postId) {
            return Promise.resolve()
                .then(() => {
                    const postsInCategory = db.get('categories')
                        .find({id: categoryId})
                        .get('posts')
                        .value();

                        const relatedPosts = postsInCategory.filter((post) => {
                            return post.id !== postId;
                        });
                        
                    return relatedPosts.slice(0, 3);
                });
        },

        getRecentPosts(count) {
            return Promise.resolve()
                .then(() => {
                    const recentPosts = db.get('categories')
                        .reduce((acc, val) => acc.concat( val.posts ), [])
                        .sortBy('publishTime')
                        .value();
                    return recentPosts.reverse().slice(0, count);
                });
        },

        getPopularPosts() {
            return Promise.resolve()
                .then(() => {
                    const popularPosts = db.get('categories')
                        .reduce((acc, val) => acc.concat( val.posts ), [])
                        .value();

                    return popularPosts.sort((a, b) => {
                        return b.comments.length - a.comments.length;
                    }).slice(0, 4);
                });
        },

        getRecentComments() {
            return Promise.resolve()
                .then(() => {
                    const recentComments = db.get('categories')
                        .reduce((acc, val) => acc.concat( val.posts ), [])
                        .reduce((acc, val) => acc.concat( val.comments ), [])
                        .sortBy('publishTime')
                        .value();

                    return recentComments.reverse().slice(0, 6);
                });
        },

        getCommentsCountByPostId(id) {
            return Promise.resolve()
                .then(() => {
                    const count = db.get('categories')
                        .reduce((acc, val) => acc.concat( val.posts ), [])
                        .find({ id: id })
                        .get('comments')
                        .value()
                        .length;
                    return count;
                });
        },

        getCommentsCount() {
            return Promise.resolve()
                .then(() => {
                    const commentsCount = db.get('categories')
                        .reduce((acc, val) => acc.concat( val.posts ), [])
                        .reduce((acc, val) => acc.concat( val.comments ), [])
                        .value()
                        .length;
                    const replyCommentsCount = db.get('categories')
                        .reduce((acc, val) => acc.concat( val.posts ), [])
                        .reduce((acc, val) => acc.concat( val.comments ), [])
                        .reduce((acc, val) => acc.concat( val.replyComments ), [])
                        .value()
                        .length;

                    return commentsCount + replyCommentsCount;
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

        getSearchPosts(searchTerm) {
            return Promise.resolve()
                .then(() => {
                    const allPosts = db.get('categories')
                        .reduce((acc, val) => acc.concat( val.posts ), [])
                        .value();

                        const foundSearchedPosts = [];

                        allPosts.map((post) => {
                            const content = post.content.toLowerCase().indexOf(searchTerm.toLowerCase());
                            const title = post.title.toLowerCase().indexOf(searchTerm.toLowerCase());
                            
                            if (content !== -1 || title !== -1) {
                                foundSearchedPosts.push(post);
                            }
                        });
                    
                    return foundSearchedPosts;
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

        edit(post, postId, categoryId) {
            return Promise.resolve()
                .then(() => {
                    db.get('categories')
                        .find({ id: categoryId })
                        .get('posts')
                        .remove({id: postId})
                        .write();

                    db.get('categories')
                        .find({ id: post.categoryId })
                        .get('posts')
                        .push(post)
                        .write();
                    
                    return db.get('categories')
                        .find({ id: post.categoryId })
                        .get('posts')
                        .getById(postId)
                        .value();
                });
        },

        delete(postId, categoryId) {
            return Promise.resolve()
                .then(() => {
                    db.get('categories')
                        .find({ id: categoryId })
                        .get('posts')
                        .remove({id: postId})
                        .write();
                    
                    return 'Successfully deleted post';
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