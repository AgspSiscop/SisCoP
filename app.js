const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoConnect = require('connect-mongo');
const handlebars =  require('express-handlebars');
const bodyParser =  require('body-parser')
const path = require('path');
const router =  require('./routes');
const passport = require('passport');
require('./config/auth')(passport);
require('./public/js/registerhelper/registerHelper');

const app = express();

app.use(session({
    secret: 'LKnlka1spk,ansmn7bç jbsaçm KJ46SDLJBÇ4SMmaKm sabs ekasbdçq82',
    store:  MongoConnect.create({mongoUrl: 'mongodb://localhost/siscop'}),
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 30,        
        httpOnly: true
    },
    rolling: true
}));

app.use(passport.initialize());
app.use(passport.session());
app.use((req, res, next) => {
    let user = req.user || 0;
    res.locals.user =  user;
    res.locals.name = user.name;    
    res.locals.level =  user.level;
    res.locals.id = user._id;
    res.locals.pg = user.pg
    if(user.section){
        res.locals.section =  user.section.name;
        res.locals.sectionID = user.section._id;
    }        
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
mongoose.set('strictQuery', false);
mongoose.connect('mongodb://localhost/siscop').then(() => {
    console.log('Conected to the Database');
    app.emit('done')
}).catch((e) => {
    console.log('Erros ' + e);
});

app.use(router);

app.use((error, req, res, next) => {
    if(error){
        const serverError = new Object();
        serverError.message = error.message;
        serverError.code = error.statusCode || error.code;
        console.log(error)
        res.render('error/error', {serverError: serverError})
    }
});

app.on('done', () => {
    const PORT = 8903;
    const hostname = '127.0.0.1'
    app.listen(PORT, hostname, () => {
        console.log(`Server listen to http://${hostname}:${PORT} ${new Date().getFullYear()}`)
    });
});
