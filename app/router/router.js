import { homeController } from '../controllers/home.controller';

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
            
        }).resolve();
        
    }

    return {
        init
    };

})();

export { router };