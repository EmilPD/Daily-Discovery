import { notifier } from '../utils/notifier';
import { data } from '../data/data';
import { templateLoader as tl} from '../utils/template-loader';
import { commonController } from '../controllers/common.controller';

class AdminController {

    loadDashboard() {
        const self = this;
        commonController.loadAll();

        data.users.isAdmin()
        .then((result) => {
            if (result.isAdmin === 'false') {
                notifier.error('Only admin can use dashboard!');
                location.href = '#/home';
                return;
            }
        })
        .then(() => {
            Promise.all([
                data.users.getAll(),
                tl.loadTemplate('admin')
            ])
            .then(([users, template]) => {
                $('#main').html(template({users}));

                return data.admin.getConfig();
            })
            .then((config) => {
                if (config.postsCountHome === '12') {
                    $('select[name="post_count_home"]').find('option[value="12"]').attr('selected', true);
                } else {
                    $('select[name="post_count_home"]').find('option[value="6"]').attr('selected', true);
                }

                if (config.postsCountCategory === '8') {
                    $('select[name="post_count_category"]').find('option[value="8"]').attr('selected', true);
                } else {
                    $('select[name="post_count_category"]').find('option[value="4"]').attr('selected', true);
                }

                $('.posts-count-form').on('submit', function(e) {
                    e.preventDefault();

                    const homePostsCount = $('#post-count-home').val();
                    const categoryPostsCount = $('#post-count-category').val();

                    data.admin.saveConfig(homePostsCount, categoryPostsCount)
                    .then(
                        result => {
                            notifier.success(`Your config was saved!`);
                            location.href = '#/dashboard';
                        },
                        errorMsg => {
                            notifier.error(errorMsg.responseJSON);
                            location.href = '#/dashboard';
                        }
                    )
                    .catch(console.log);
                });
            })
            .catch(console.log);
        });
    }
}

let adminController = new AdminController();
export { adminController };