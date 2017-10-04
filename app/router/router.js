import { adminController } from '../controllers/admin.controller';
import { usersController } from '../controllers/users.controller';
import { postsController } from '../controllers/posts.controller';
import { homeController } from '../controllers/home.controller';
import { categoryController } from '../controllers/category.controller';
import { commonController } from '../controllers/common.controller';

const router = (() => {
    let navigo;

    function init() {
        navigo = new Navigo(null, true);

        navigo.on({
            '/': () => {
                homeController.loadHome();
            },
            'home': () => {
                homeController.loadHome();
            },
            'home/:pageNumber': (params) => {
                homeController.loadHome(params.pageNumber);
            },
            'dashboard': () => {
                adminController.loadDashboard();
            },
            'register': () => {
                usersController.loadRegister();
            },
            'login': () => {
                usersController.loadLogin();
            },
            'logout': () => {
                usersController.loadLogout();
            },
            'publishpost': () => {
                postsController.loadPublishPost();
            },
            'categories/:categoryName/': (params) => {
                categoryController.loadCategory(params.categoryName);
            },
            'categories/:categoryName/:pageNumber': (params) => {
                categoryController.loadCategory(params.categoryName, params.pageNumber);
            },
            'posts/:id': (params) => {
                postsController.loadPost(params.id);
            },
        }).resolve();

        navigo.notFound(() => {
            commonController.loadPageNotFound();
        }).resolve();
        
    }

    return {
        init
    };

})();

export { router };