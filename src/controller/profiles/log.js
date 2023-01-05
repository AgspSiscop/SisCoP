const express = require('express');
const mongoose =  require('mongoose');
const bcrypt =  require('bcryptjs');
require('../../models/profiles/Users');
const Users =  mongoose.model('user');
const passport =  require('passport');
const fs = require('fs');


const router = express.Router();

router.get('/', (req, res) =>{
    //res.render('profiles/profile');
    res.render('profiles/index')
});

router.post('/', (req, res) => {
    const errors = [];    
    passport.authenticate('local', (error, user, info) => {        
        if(error){
            errors.push({text: 'Houve um erro! Por favor tente novamente mais tarde.'});
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

});

router.get('/log', (req, res) =>{
    res.render('profiles/register');
});

router.post('/saveregister', (req, res) =>{
    const errors = [];
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
                    section: req.body.section,
                    level: req.body.level
                };
                bcrypt.genSalt(10, (error, salt) => {
                    bcrypt.hash(newUser.password, salt, (error, hash) =>{
                        if(error){
                            res.send('Houve um erro ao Salvar as informações: ' + error);
                        }else{
                            newUser.password = hash
                            new Users(newUser).save().then(() => {
                                res.redirect('/');
                            }).catch((error) => {
                                console.log(error)
                            });
                        }
                    });
                });               
            }            
        }else{
            res.send('usuario já existe');
        }
    });
});

module.exports = router;

