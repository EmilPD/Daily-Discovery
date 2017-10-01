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

//User routes
const usersController = require('./controllers/users.controller')(data);
app.put('/api/auth/login', usersController.login);
app.post('/api/auth/register', usersController.register);

// Posts routes
const postsController = require('./controllers/posts.controller')(data);
app.post('/api/posts/:category', postsController.post);
app.get('/api/posts/:id', postsController.get);

app.listen(process.env.PORT || 80, () => {
    console.log('App is running');
});