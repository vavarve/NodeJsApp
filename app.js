const express = require('express');
const mongoose = require('mongoose');

// express app
const app = express();
// connect to mongo db
const dbURI = 'mongodb+srv://vasilis:vas1234@nodejs.fpyoy.mongodb.net/nodejs?retryWrites=true&w=majority';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => app.listen(3000))
    .catch((err) => console.log(err));

// register view engine
app.set('view engine', 'ejs');


// custom middleware
app.use((req, res, next) => {
    console.log('new request made:');
    console.log('host: ', req.hostname);
    console.log('path: ', req.path);
    console.log('method: ', req.method);
    next();
});

app.use((req, res, next) => {
    console.log('in the next midlleware');
    next();
});

app.get('/', (req, res) => {
    const blogs = [
        {title: 'Blog One', snippet: 'Lorem ipsum dolor sit amet.'},
        {title: 'Blog Two', snippet: 'Lorem ipsum dolor sit amet.'},
        {title: 'Blog Three', snippet: 'Lorem ipsum dolor sit amet.'}
    ];
    res.render('index', { title: 'Home', blogs });
});
app.get('/about', (req, res) => {
    // res.send('<p>about page</p>');
    res.render('about', { title: 'About' });
});

app.get('/blogs/create', (req, res) => {
    res.render('create', { title: 'Create a new Blog' });
});

// 404 page
app.use((req, res) => {
    res.status(404).render('404', { title: '404' });
});