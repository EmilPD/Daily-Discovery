import { data } from '../data/data';
import { templateLoader as tl} from '../utils/template-loader';
import { handlebarsSubstr } from '../helpers/handlebars-substr';
import { commonController } from '../controllers/common.controller';

class CategoryController {
    loadCategory(categoryName, pageNumber) {
        commonController.loadAll();

        Promise.all([
            data.categories.getByName(categoryName, pageNumber),
            data.posts.getRecentPosts(6),
            data.posts.getRecentComments(),
            tl.loadTemplate('category')
        ])
        .then(([posts, recentPosts, recentComments, template]) => {
            if (posts.result !== null) {
                $('#main').html(template({posts, recentPosts, recentComments}));
            }
        })
        .then(() => {
            data.posts.getCategoryPaginationInfo(categoryName)
            .then((paginationInfo) => {
                if (paginationInfo.postsCount === 'undefined') {
                    commonController.loadPageNotFound();
                    return;
                }

                $('#pagination').pagination({
                    currentPage: pageNumber,
                    items: paginationInfo.postsCount,
                    itemsOnPage: paginationInfo.postsPerPage,
                    prevText: '«',
                    nextText: '»',
                    hrefTextPrefix: '#/categories/' + categoryName + '/'
                });
            })
            .catch(console.log);
        })
        .catch(console.log);
    }
}

let categoryController = new CategoryController();
export { categoryController };