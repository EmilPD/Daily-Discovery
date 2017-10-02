import { data } from '../data/data';
import { templateLoader as tl} from '../utils/template-loader';
import { handlebarsSubstr } from '../helpers/handlebars-substr';

class CategoryController {
    loadCategory(categoryName) {

        Promise.all([
            data.categories.getByName(categoryName),
            tl.loadTemplate('category')
        ])
        .then(([posts, template]) => {
            if (posts.result !== null) {
                $('#main').html(template({posts}));
            }
        })
        .catch(console.log);
    }
}

let categoryController = new CategoryController();
export { categoryController };