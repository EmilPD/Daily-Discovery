import { requester } from '../utils/requester';

const admin = (() => {
    const LOCALSTORAGE_AUTH_KEY_NAME = 'daily-discovery-auth-key';

    return {
        saveConfig(homePostsCount, categoryPostsCount) {
            const body = {
                homePostsCount: homePostsCount,
                categoryPostsCount: categoryPostsCount
            };

            const headers = {
                'daily-discovery-auth-key': localStorage.getItem(LOCALSTORAGE_AUTH_KEY_NAME)
            };

            return requester.post(`/api/config/save`, body, headers);
        },

        getConfig() {
            return requester.get(`/api/config`);
        }
    };
})();

export { admin };