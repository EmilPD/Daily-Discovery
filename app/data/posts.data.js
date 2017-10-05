import { requester } from '../utils/requester';

const posts = (() => {
    const LOCALSTORAGE_AUTH_KEY_NAME = 'daily-discovery-auth-key';

    return {
        getPost(id) {
            return requester.get(`/api/posts/${id}`);
        },

        getHomePaginationInfo() {
            return requester.get(`/api/posts/paginationInfo`);
        },

        getCategoryPaginationInfo(categoryName) {
            return requester.get(`/api/posts/paginationInfo/${categoryName}`);
        },

        getAllPosts(pageNumber) {
            if (typeof pageNumber === 'undefined') {
                pageNumber = 1;
            }

            return requester.get(`/api/posts/page/${pageNumber}`);
        },

        getNumberOfPosts(count) {
            return requester.get(`/api/posts/count/${count}`);
        },

        getSearchPosts(searchTerm) {
            return requester.get(`/api/posts/search/${searchTerm}`);
        },

        getRelatedPosts(categoryId, postId) {
            return requester.get(`/api/posts/related/${categoryId}/${postId}`);
        },

        getRecentPosts(count) {
            return requester.get(`/api/posts/recent/${count}`);
        },

        getRecentComments() {
            return requester.get(`/api/posts/comments`);
        },

        getPopularPosts() {
            return requester.get(`/api/posts/popular`);
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

        editPost(post, id) {
            const body = {
                title: post.title,
                category: post.category,
                content: post.content,
                imageUrl: post.imageUrl,
                tags: post.tags
            };

            const headers = {
                'daily-discovery-auth-key': localStorage.getItem(LOCALSTORAGE_AUTH_KEY_NAME)
            };

            return requester.post(`/api/posts/edit/${id}`, body, headers);
        },

        deletePost(postId) {
            const body = {};

            const headers = {
                'daily-discovery-auth-key': localStorage.getItem(LOCALSTORAGE_AUTH_KEY_NAME)
            };

            return requester.post(`/api/posts/delete/${postId}`, body, headers);
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