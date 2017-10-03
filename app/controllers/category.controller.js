import { data } from '../data/data';
import { templateLoader as tl} from '../utils/template-loader';
import { handlebarsSubstr } from '../helpers/handlebars-substr';
import { commonController } from '../controllers/common.controller';

class CategoryController {
    loadCategory(categoryName, pageNumber) {
        commonController.loadAll();

        Promise.all([
            data.categories.getByName(categoryName, pageNumber),
            tl.loadTemplate('category')
        ])
        .then(([posts, template]) => {
            if (posts.result !== null) {
                $('#main').html(template({posts}));
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