import { requester } from '../utils/requester';

const categories = (() => {

    return {
        getByName(categoryName, pageNumber) {
            if (typeof pageNumber === 'undefined') {
                pageNumber = 1;
            }

            return requester.get(`/api/categories/${categoryName}/${pageNumber}`);
        },
    };
})();

export { categories };