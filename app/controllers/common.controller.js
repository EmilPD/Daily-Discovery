import { data } from '../data/data';
import { templateLoader as tl} from '../utils/template-loader';

class CommonController {
    showHideLoginRegister() {
        if (data.users.hasUser()) {
            data.users.isAdmin()
            .then((result) => {
                if (result.isAdmin === 'true') {
                    $('#publish-post-link').removeClass('hidden');
                    $('#dashboard-link').removeClass('hidden');
                } else {
                    $('#publish-post-link').addClass('hidden');
                    $('#dashboard-link').addClass('hidden');
                }
            })
            .catch(console.log);

            const loggedInUserName = data.users.getUserName();

            $('#login-link').addClass('hidden');
            $('#register-link').addClass('hidden');
            $('#logout-link').removeClass('hidden');
            $('#hello-user').html(`Hello ${loggedInUserName}! `);
            $('#hello-user').removeClass('hidden');
        } else {
            $('#publish-post-link').addClass('hidden');
            $('#dashboard-link').addClass('hidden');
            $('#hello-user').addClass('hidden');
            $('#login-link').removeClass('hidden');
            $('#register-link').removeClass('hidden');
            $('#logout-link').addClass('hidden');
        }
    }

    navLinksSelectActive() {
        $('#top-navbar li').click(function(e) {
            const target = e.target;
            $(target).parent().addClass('active');
            $(target).parent().siblings().removeClass('active');
        });
    }

    showSearchResults() {
        $('#search-box-form').submit(function(e) {
            e.preventDefault();
        });

        $('#search-box').on('keyup', function (e) {
            if (e.keyCode == 13) {
                const searchTerm = $('#search-box').val();
                if (searchTerm) {
                    Promise.all([data.posts.getSearchPosts(searchTerm), tl.loadTemplate('search')])
                    .then(([result, template]) => $('#main').html(template(result)))
                    .catch(console.log);
                }
            }
        });
    }

    loadFooter() {
        Promise.all([
            data.posts.getNumberOfPosts(7),
            data.posts.getRecentPosts(7),
            data.widgets.getFooterWidget(),
            tl.loadTemplate('footer')
        ])
        .then(([posts, recentPosts, footerWidget, template]) => {
            $('footer').html(template({posts, recentPosts, footerWidget}))
        })
        .catch(console.log);
    }

    loadAll() {
        this.showHideLoginRegister();
        this.navLinksSelectActive();
        this.loadFooter();
        this.showSearchResults();
    }

    loadPageNotFound() {
        this.showHideLoginRegister();

        Promise.all([tl.loadTemplate('pagenotfound')])
            .then((template) => $('#main').html(template))
            .catch(console.log);
        }
    }

let commonController = new CommonController();
export { commonController };