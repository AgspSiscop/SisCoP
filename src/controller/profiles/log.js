const express = require('express');
const mongoose =  require('mongoose');
const bcrypt =  require('bcryptjs');
//require('../../models/profiles/Users');
const isAuth =require('../../../config/isAuth');
const resolver =  require('../../../config/errorHandler');
//const Users =  mongoose.model('user');
const passport =  require('passport');
const Users = require('../../models/profiles/UsersDB');

const router = express.Router();

router.get('/', resolver((req, res) =>{       
    res.render('profiles/index')
}));

router.post('/', resolver((req, res) => {
    const errors = [];   
    passport.authenticate('local', (error, user, info) => {        
        if(error){
            errors.push({text: error});
            res.render('profiles/profile', {errors: errors});
        }else{
            if(!user){
                errors.push({text: 'Usuário ou senha inválidas.'});
                res.render('profiles/profile', {errors: errors});
            }else{
                req.login(user, (error) => {
                    if(error){
                        res.send('Erro: ' + error);
                    }else{
                        res.redirect('/mensageiro/caixadeentrada000');
                    }
                });
            }
        }
    })(req, res);

}));

router.get('/register', resolver((req, res) =>{
    res.render('profiles/register');
}));

router.post('/saveregister', isAuth, resolver( async(req, res) =>{
    const users = new Users(req.body, res.locals, req.params);
    const create = await users.register();
    if(create.errors > 0){
        res.render('profiles/register', {errors: create.errors});
    }else{
        res.redirect('/register');
    }
    
    /*const errors = [];
    Users.find({name: req.body.name}).lean().then((user) =>{        
        if(user.length == 0){
            if(!req.body.name || req.body.name == null ){
                errors.push({text: 'Nome inválido.'});
            }
            if(!req.body.password || req.body.password == null){
                errors.push({text: 'Senha inválida.'});
            }
            if(!req.body.section || req.body.section == null || req.body.section == '0'){
                errors.push({text: 'Seção inválida.'});
            }
            if(!req.body.level || req.body.level == null || req.body.level  < 1 && req.body.level > 5){
                errors.push({text: 'Level inválido.'});
            }
            if(errors.length > 0){
                res.render('profiles/register', {errors: errors});
            }else{
                const newUser = {
                    name: req.body.name,
                    password: req.body.password,
                    pg: req.body.pg,
                    section: req.body.section,
                    level: req.body.level
                };
                bcrypt.genSalt(10, (error, salt) => {
                    bcrypt.hash(newUser.password, salt, (error, hash) =>{
                        if(error){                            
                            console.log(error);
                            res.render('error/error', {serverError: {message: `Houve um erro ao Salvar as informações ${error.message}`, code: error.code}});
                        }else{
                            newUser.password = hash
                            new Users(newUser).save().then(() => {
                                res.redirect('/register');
                            }).catch((error) => {
                                console.log(error);
                                res.render('error/error', {serverError: {message: error.message, code: error.code}});
                            });
                        }
                    });
                });               
            }            
        }else{            
            res.render('error/error', {serverError: {message: `Usuário Já existe.`}});
        }
    }).catch((error) => {
        console.log(error);
        res.render('error/error', {serverError: {message: error.message, code: error.code}});
    });*/
}));

router.get('/updateuser', isAuth ,resolver((req, res) => {
    res.render('profiles/updateprofile')
}));

router.post('/getuser', isAuth, resolver( async(req,res) => {
    const user = new Users(req.body, res.locals, req.params);
    const userObj = await user.findOneByParam({name: req.body.name});
    res.send(JSON.stringify(userObj));
    
    /*Users.findOne({name: req.body.name}).lean().then((user) => {
        res.send(JSON.stringify(user));
    }).catch((error) => {
        console.log(error);
        res.render('error/error', {serverError: {message: error.message, code: error.code}});
    });*/
}));

router.post('/updateuser/update', isAuth, resolver( async(req, res) => {
    const user = new Users(req.body, res.locals, req.params);
    const update = await user.updateOne();
    if(update.errors.length > 0){
        res.render('profiles/updateprofile', {errors: update.errors});
    }else{
        res.redirect('/updateuser');
    }
    /*const errors = [];
    Users.find({name: req.body.name}).lean().then((user) =>{        
        if((user.length == 0) || (user.length != 0 && req.body.name == req.body.userselected)){
            if(!req.body.name || req.body.name == null ){
                errors.push({text: 'Nome inválido.'});
            }           
            if(!req.body.level || req.body.level == null || req.body.level  < 1 && req.body.level > 5){
                errors.push({text: 'Level inválido.'});
            }
            if(errors.length > 0){
                res.render('profiles/updateprofile', {errors: errors});
            }else{
                if(req.body.password){
                    const User = {
                        name: req.body.name,
                        password: req.body.password,
                        pg: req.body.pg,
                        section: req.body.section,
                        level: req.body.level
                    };
                    bcrypt.genSalt(10, (error, salt) => {
                        bcrypt.hash(User.password, salt, (error, hash) =>{
                            if(error){                            
                                console.log(error);
                                res.render('error/error', {serverError: {message: `Houve um erro ao Salvar as informações ${error.message}`, code: error.code}});
                            }else{
                                User.password = hash
                                Users.updateOne({name: req.body.userselected}, {$set: User}).then(() => {
                                    res.redirect('/updateuser');
                                }).catch((error) => {
                                    console.log(error);
                                    res.render('error/error', {serverError: {message: error.message, code: error.code}});
                                });
                            }
                        });
                    });
                }else{
                    const User = {
                        name: req.body.name,                        
                        pg: req.body.pg,
                        section: req.body.section,
                        level: req.body.level
                    };
                    Users.updateOne(
                        {name: req.body.userselected}, {$set: User}).then(() => {            
                            res.redirect('/updateuser');
                        }).catch((error) => {
                            console.log(error);
                            res.render('error/error', {serverError: {message: error.message, code: error.code}});
                        });
                }
            }            
        }else{            
            res.render('error/error', {serverError: {message: `Usuário Já existe.`}});
        }
    }).catch((error) => {
        console.log(error);
        res.render('error/error', {serverError: {message: error.message, code: error.code}});
    });*/
}));

router.get('/profile/:name', isAuth, resolver( async(req, res) => {
    const user = new Users(req.body, res.locals, req.params);
    const userObj = await user.findOneByParam({name: req.params.name});
    res.render('profiles/profiledescription', {paramName: req.params.name, profile: userObj});
    
    /*Users.findOne({name: req.params.name}).lean().then((user) => {
        res.render('profiles/profiledescription', {paramName: req.params.name, profile: user});
    }).catch((error) => {
        console.log(error);
        res.render('error/error', {serverError: {message: error.message, code: error.code}});
    })*/
}))

router.get('/deleteuser', isAuth, resolver((req, res) => {
    res.render('profiles/deleteuser');
}));

router.post('/deleteuser/delete', isAuth, resolver( async(req, res) => {
    const user = new Users(req.body, res.locals, req.params);
    await user.deleteOne();
    res.redirect('/deleteuser');
    
    /*Users.deleteOne({name: req.body.name}).then(() => {
        res.redirect('/deleteuser');
    }).catch((error) => {
        console.log(error);
        res.render('error/error', {serverError: {message: error.message, code: error.code}})
    })*/
}));

router.post('/changedatas', isAuth, resolver( async(req, res) => {    
    const user = new Users(req.body, res.locals, req.params);
    const update = await user.updateOneByUser();
    if(update.errors.length > 0){
        res.render('profiles/profiledescription', {errors: update.errors});
    }else{
        res.redirect(`/profile/${res.locals.name}`);
    }
}));

router.post('/changepassword', isAuth, resolver( async(req, res) => {
    const user = new Users(req.body, res.locals, req.params);
    const update = await user.updateOneByUser();
    if(update.errors.length > 0){
        const userObj = await user.findOneByParam({name: res.locals.name});
        res.render('profiles/profiledescription', {paramName: res.locals.name, profile: userObj, errors: update.errors});
    }else{
        res.redirect(`/profile/${res.locals.name}`);
    }
}));

module.exports = router;

