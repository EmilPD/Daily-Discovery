import { data } from '../data/data';
import { templateLoader as tl} from '../utils/template-loader';
import { handlebarsSubstr } from '../helpers/handlebars-substr';
import { commonController } from '../controllers/common.controller';

class HomeController {
    loadHome(pageNumber) {
        commonController.loadAll();
        $('#home-link').addClass('active');

        Promise.all([data.posts.getAllPosts(pageNumber), tl.loadTemplate('home')])
            .then(([result, template]) =>  $('#main').html(template(result)))
            .then(() => {
                data.posts.getHomePaginationInfo()
                .then((paginationInfo) => {

                    $('#pagination').pagination({
                        currentPage: pageNumber,
                        items: paginationInfo.postsCount,
                        itemsOnPage: paginationInfo.postsPerPage,
                        prevText: '«',
                        nextText: '»',
                        hrefTextPrefix: '#/home/'
                    });
                });
            })
            .catch(console.log);
    }
}

let homeController = new HomeController();
export { homeController };