import { requester } from '../utils/requester';

const posts = (() => {
    const LOCALSTORAGE_AUTH_KEY_NAME = 'daily-discovery-auth-key';

    return {
        getPost(id) {
            return requester.get(`/api/posts/${id}`);
        },

        getAllPosts(pageNumber) {
            if (typeof pageNumber === 'undefined') {
                pageNumber = 1;
            }

            return requester.get(`/api/posts/page/${pageNumber}`);
        },

        getRecentPosts(count) {
            return requester.get(`/api/posts/recent/${count}`);
        },

        getRecentComments() {
            return requester.get(`/api/posts/comments`);
        },

        publishPost(post) {
            const body = {
                title: post.title,
                content: post.content,
                imageUrl: post.imageUrl,
                tags: post.tags
            };

            const category = post.category;

            const headers = {
                'daily-discovery-auth-key': localStorage.getItem(LOCALSTORAGE_AUTH_KEY_NAME)
            };

            return requester.post(`/api/posts/${category}`, body, headers);
        },

        postComment(comment) {
            const body = {
                id: comment.postId,
                text: comment.text
            };

            const headers = {
                'daily-discovery-auth-key': localStorage.getItem(LOCALSTORAGE_AUTH_KEY_NAME)
            };

            return requester.post(`/api/comments/${comment.postId}`, body, headers);
        },

        postReplyComment(comment) {
            const body = {
                id: comment.commentId,
                text: comment.text
            };

            const headers = {
                'daily-discovery-auth-key': localStorage.getItem(LOCALSTORAGE_AUTH_KEY_NAME)
            };

            return requester.post(`/api/comments/reply/${comment.commentId}`, body, headers);
        },
    };
})();

export { posts };