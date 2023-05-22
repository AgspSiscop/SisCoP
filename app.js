const express = require('express');
const dotenv = require('dotenv');
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

dotenv.config();
const app = express();
const PORT = process.env.PORT;
const hostname = process.env.HOST
const dbUser = process.env.DB_USER;
const dbPwd =  process.env.DB_PASSWORD;
const dbHost = process.env.DB_HOST;
const dbPort = process.env.DB_PORT;
const secret = process.env.SISCOP_SECRET;

app.use(session({
    secret: secret,
    store:  MongoConnect.create({mongoUrl: `mongodb://192.168.15.7:3002,192.168.15.7:3001,192.168.15.7:3003/siscop?replicaSet=siscop`}),
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
mongoose.connect(`mongodb://192.168.15.7:3002,192.168.15.7:3001,192.168.15.7:3003/siscop?replicaSet=siscop`).then(() => {
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
    app.listen(PORT, hostname, () => {
        console.log(`Server listen to http://${hostname}:${PORT}`)
    });
});
