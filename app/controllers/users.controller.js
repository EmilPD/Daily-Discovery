import { notifier } from '../utils/notifier';
import { data } from '../data/data';
import { templateLoader as tl} from '../utils/template-loader';
import { commonController } from '../controllers/common.controller';
import { User } from '../models/user.js';

class UsersController {
    loadLogin() {
        commonController.loadAll();

        Promise.all([tl.loadTemplate('login')])
            .then((template) => $('#main').html(template))
            .then(() => {
                $('#login-form').on('submit', function(e) {
                    e.preventDefault();

                    const username = $('#input-username').val();
                    const password = $('#input-password').val();

                    data.users.login(username, password)
                    .then(
                        result => {
                            notifier.success(`Hi, ${username}`);
                            location.href = '#/home';
                        },
                        errorMsg => notifier.error(errorMsg.responseJSON));
                });
                
            })
            .catch(console.log);
        }

        loadRegister() {
            commonController.loadAll();

            Promise.all([tl.loadTemplate('register')])
                .then((template) => $('#main').html(template))
                .then(() => {

                    $('#register-form').on('submit', function(e) {
                        e.preventDefault();

                        const name = $('#input-name').val();
                        const username = $('#input-username').val();
                        const password = $('#input-password').val();
                        const imageUrl = $('#input-avatar').val();

                        const newUser = new User(name, username, password, imageUrl);
                        
                        data.users.register(newUser)
                        .then(
                            result => {
                                notifier.success(`${name} with ${username} registered successfully`);
                                location.href = '#/login';
                            },
                            errorMsg => {
                                notifier.error(errorMsg.responseJSON);
                            }
                        );
                    });
                    
                })
                .catch(console.log);
        }

        loadLogout() {
            data.users.logout()
                .then(() => {
                    commonController.loadAll();
                    notifier.success('Logged out');
                    location.href = '#/home';
                })
                .catch(() => {
                    notifier.error('Something bad happened - i cannot log you out')
                });
        }
}

let usersController = new UsersController();
export { usersController };