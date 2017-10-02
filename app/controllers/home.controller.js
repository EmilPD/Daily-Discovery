import { data } from '../data/data';
import { templateLoader as tl} from '../utils/template-loader';
import { handlebarsSubstr } from '../helpers/handlebars-substr';

class HomeController {
    loadHome(pageNumber) {
        $('#home-link').addClass('active');

        Promise.all([tl.loadTemplate('home')])
            .then(([template]) =>  $('#main').html(template))
            .catch(console.log);
    }
}

let homeController = new HomeController();
export { homeController };