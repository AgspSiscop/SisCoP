const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const handlebars =  require('express-handlebars');
const bodyParser =  require('body-parser')
const path = require('path');
const router =  require('./routes');
const passport = require('passport');
require('./config/auth')(passport);

const app = express();

app.use(session({
    secret: '******',
    resave: true,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());
app.use((req, res, next) => {
    let user = req.user || 0;
    res.locals.user =  user;
    res.locals.name = user.name;
    res.locals.section =  user.section;
    res.locals.level =  user.level;
    res.locals.id = user.id;           
    next();
});

function logUser(){return users};
    module.exports = logUser 

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

const handle = handlebars.create({
    defaultLayout: 'main'
});
app.engine('handlebars', handle.engine);
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, '/src', 'views'));

mongoose.Promise =  global.Promise;
mongoose.connect('mongodb://localhost/licitacao').then(() => {
    console.log('Conected to Database');
}).catch((e) => {
    console.log('Erro: ' + e);
});

app.use(router)

const PORT = 8903;
const hostname = '127.0.0.1'
app.listen(PORT, hostname, () => {
    console.log(`Server listen to http://${hostname}:${PORT}`)
})
