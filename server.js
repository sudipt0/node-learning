const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname + '/views/partials'); // header footer
app.set('view engine', 'hbs');

//Middleware
app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        if(err){
            console.log('Unable to append to server log.');
        }
    });
    next();
});

// app.use((req, res, next) => {
//     res.render('maintenance.hbs', {
//         pageTitle: 'Maintenance Page',
//         welcomeMsg: 'Welcome to nodeJs Express'
//     });
// });

//static page
app.use(express.static(__dirname + '/public'));


//Helper function HBS
hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

//Route
app.get('/', (req, res) => {
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        welcomeMsg: 'Welcome to nodeJs Express Home Page'
    });
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page',
        welcomeMsg: 'Welcome to nodeJs Express About Page'
    });
});

app.get('/projects', (req, res) => {
    res.render('projects.hbs', {
        pageTitle: 'Projects Page',
        welcomeMsg: 'Welcome to Projects Page'
    });
});

app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'Ops unable to handle request'
    }); 
});

app.listen(port, () => {
    console.log(`Server is up at port: ${port}`);
});
