const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const data = require('./data');

const app = express();
app.use(bodyParser.json());

app.use(express.static('public'));
app.use('/libs', express.static(path.join(__dirname, '../../node_modules')));
app.use('/app', express.static(path.join(__dirname, '../app')));
app.use('/templates', express.static(path.join(__dirname, '../public/templates')));
app.use('/css', express.static(path.join(__dirname, '../public/css')));
app.use('/js', express.static(path.join(__dirname, '../public/js')));

require('./middleware/authorize-user')(app, data);

//User routes
const usersController = require('./controllers/users.controller')(data);
app.put('/api/auth/login', usersController.login);
app.post('/api/auth/register', usersController.register);
app.get('/api/auth/isAdmin', usersController.isAdmin);
app.get('/api/auth/users', usersController.getAll);

// Categories routes
const categoriesController = require('./controllers/categories.controller')(data);
app.get('/api/categories/:categoryName/:pageNumber', categoriesController.get);

// Widgets
const widgetsController = require('./controllers/widgets.controller')(data);
app.get('/api/widgets', widgetsController.getAll);
app.get('/api/widgets/footer', widgetsController.getFooterWidget);
app.get('/api/widgets/sidebar', widgetsController.getSidebarWidget);
app.post('/api/widgets/save/:id', widgetsController.saveWidget);

// Posts routes
const postsController = require('./controllers/posts.controller')(data);
app.post('/api/posts/:category', postsController.post);
app.get('/api/posts/count/:count', postsController.getNumberOfPosts);
app.get('/api/posts/page/:number', postsController.getAllPosts);
app.get('/api/posts/paginationInfo', postsController.getHomePaginationInfo);
app.get('/api/posts/paginationInfo/:categoryName', postsController.getCategoryPaginationInfo);
app.get('/api/posts/comments', postsController.getRecentComments);
app.get('/api/posts/recent/:count', postsController.getRecent);
app.get('/api/posts/:id', postsController.get);
app.post('/api/comments/:id', postsController.postComment);
app.post('/api/comments/reply/:id', postsController.postReplyComment);
app.post('/api/posts/edit/:id', postsController.editPost);

app.listen(process.env.PORT || 80, () => {
    console.log('App is running');
});