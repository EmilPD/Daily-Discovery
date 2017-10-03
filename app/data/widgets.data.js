import { requester } from '../utils/requester';

const widgets = (() => {
    const LOCALSTORAGE_AUTH_KEY_NAME = 'daily-discovery-auth-key';

    return {
        getAll() {
            return requester.get(`/api/widgets`);
        },

        getFooterWidget() {
            return requester.get(`/api/widgets/footer`);
        },

        getSidebarWidget() {
            return requester.get(`/api/widgets/sidebar`);
        },

        saveWidget(title, text, id) {
            const body = {
                title: title,
                text: text
            };

            const headers = {
                'daily-discovery-auth-key': localStorage.getItem(LOCALSTORAGE_AUTH_KEY_NAME)
            };

            return requester.post(`/api/widgets/save/${id}`, body, headers);
        },
    };
})();

export { widgets };