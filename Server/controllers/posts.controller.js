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
        post: publishPost,
        postComment: postComment,
        postReplyComment: postReplyComment
    };
};