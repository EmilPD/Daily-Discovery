const months = require('../utils/months');

module.exports = (data) => {
    function getById(req, res) {
        const postId = Number(req.params.id);

        return data.posts.getById(postId)
            .then((foundPost) => {

                return res.status(201)
                    .json({
                        post: foundPost
                    });
            });
    }

    function getRecentComments(req, res) {
        return data.posts.getRecentComments()
            .then((recentComments) => {

                return res.status(201)
                    .json({
                        result: recentComments
                    });
            });
    }

    function getHomePaginationInfo(req, res) {
        return data.posts.getHomePaginationInfo()
            .then((paginationInfo) => {

                return res.status(201)
                    .json(paginationInfo);
            });
    }

    function getCategoryPaginationInfo(req, res) {
        const categoryName = req.params.categoryName;

        return data.posts.getCategoryPaginationInfo(categoryName)
            .then((paginationInfo) => {

                return res.status(201)
                    .json(paginationInfo);
            });
    }

    function getAllPosts(req, res) {
        const pageNumber = Number(req.params.number);

        return data.posts.getAllPosts(pageNumber)
            .then((postsPerPage) => {

                return res.status(201)
                    .json({
                        result: postsPerPage
                    });
            });
    }

    function getNumberOfPosts(req, res) {
        const count = Number(req.params.count);

        return data.posts.getNumberOfPosts(count)
            .then((posts) => {

                return res.status(201)
                    .json({
                        result: posts
                    });
            });
    }

    function getRecent(req, res) {
        const count = Number(req.params.count);

        return data.posts.getRecentPosts(count)
            .then((recentPosts) => {
                return res.status(201)
                    .json({
                        result: recentPosts
                    });
            });
    }

    function publishPost(req, res) {
        const categoryName = req.params.category;
        const post = req.body;
        const user = req.user;

        if (!user || typeof user.username !== 'string' || user.role !== 'admin') {
            res.status(400)
                .json('Only admin can publish posts!');
            return;
        }

        return data.posts.getCategoryIdByName(categoryName)
            .then((catId) => {
                post.categoryId = catId;

                return data.posts.getCategoryNameByShortname(categoryName);
            })
            .then((catName) => {
                post.category = catName;
                post.categoryShort = categoryName;

                return data.posts.getPostsCount();
            })
            .then((allPostsCount) => {
                post.id = allPostsCount + 1;
                post.author = user.name;
                post.authorImageUrl = user.imageUrl;
                post.comments = [];
                post.publishTime = new Date().getTime();
                post.publishDate = new Date().getDate();
                post.publishMonth = months[new Date().getMonth()];

                return data.posts.add(post);
            })
            .then((newPost) => {
                return res.status(201)
                    .json({
                        result: newPost
                    });
            });
    }

    function editPost(req, res) {
        const postId = Number(req.params.id);
        const post = req.body;
        const categoryName = post.category;
        const user = req.user;

        if (!user || typeof user.username !== 'string' || user.role !== 'admin') {
            res.status(400)
                .json('Only admin can edit posts!');
            return;
        }

        return data.posts.getCategoryIdByName(categoryName)
            .then((catId) => {
                post.categoryId = catId;

                return data.posts.getCategoryNameByShortname(categoryName);
            })
            .then((catName) => {
                post.category = catName;
                post.categoryShort = categoryName;

                return data.posts.getById(postId);
            })
            .then((oldPost) => {
                post.id = oldPost.id;
                post.author = user.name;
                post.authorImageUrl = user.imageUrl;
                post.comments = oldPost.comments;
                post.publishTime = new Date().getTime();
                post.publishDate = new Date().getDate();
                post.publishMonth = months[new Date().getMonth()];

                const oldcategoryId = oldPost.categoryId;

                return data.posts.edit(post, postId, oldcategoryId);
            })
            .then((updatedPost) => {
                return res.status(201)
                    .json({
                        result: updatedPost
                    });
            });
    }

    function postComment(req, res) {
        const postId = Number(req.params.id);
        const reqComment = req.body;
        const user = req.user;

        if (!user || typeof user.username !== 'string') {
            res.status(400)
                .json('You must login in order to publish posts!');
            return;
        }

        return data.posts.getCommentsCount()
            .then((count) => {
                const newComment = {};
                newComment.id = count + 1;
                newComment.postId = postId;
                newComment.author = user.name;
                newComment.authorImageUrl = user.imageUrl;
                newComment.text = reqComment.text;
                newComment.replyComments = [];
                newComment.publishTime = new Date().getTime();
                newComment.publishDate = new Date().getDate();
                newComment.publishMonth = months[new Date().getMonth()];

                return data.posts.addComment(newComment, postId);
            })
            .then(() => {
                return res.status(201)
                    .json({
                        result: 'Comment posted successfully!'
                    });
            });
    }

    function postReplyComment(req, res) {
        const commentId = Number(req.params.id);
        const reqComment = req.body;
        const user = req.user;

        if (!user || typeof user.username !== 'string') {
            res.status(400)
                .json('You must login in order to publish posts!');
            return;
        }

        return data.posts.getCommentsCount()
            .then((count) => {
                const newComment = {};
                newComment.id = count + 1;
                newComment.author = user.name;
                newComment.authorImageUrl = user.imageUrl;
                newComment.text = reqComment.text;
                newComment.publishTime = new Date().getTime();
                newComment.publishDate = new Date().getDate();
                newComment.publishMonth = months[new Date().getMonth()];

                return data.posts.addReplyComment(newComment, commentId);
            })
            .then(() => {
                return res.status(201)
                    .json({
                        result: 'Comment posted successfully!'
                    });
            });
    }

    return {
        get: getById,
        getRecentComments: getRecentComments,
        getHomePaginationInfo: getHomePaginationInfo,
        getCategoryPaginationInfo: getCategoryPaginationInfo,
        getAllPosts: getAllPosts,
        getNumberOfPosts: getNumberOfPosts,
        getRecent: getRecent,
        post: publishPost,
        editPost: editPost,
        postComment: postComment,
        postReplyComment: postReplyComment
    };
};