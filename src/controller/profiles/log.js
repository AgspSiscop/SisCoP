const express = require('express');
const isAuth =require('../../../config/isAuth');
const resolver =  require('../../../config/errorHandler');
const passport =  require('passport');
const Users = require('../../models/profiles/UsersDB');
const Sections = require('../../models/profiles/SectionsDB');

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
                        res.redirect('/mensageiro/caixadeentrada');
                    }
                });
            }
        }
    })(req, res);

}));

router.get('/register', resolver((req, res) =>{
    res.render('profiles/register');
}));

router.post('/saveregister', /*isAuth,*/ resolver( async(req, res) =>{
    const users = new Users(req.body, res.locals, req.params);
    const create = await users.register();    
    if(create.errors.length > 0){
        res.render('profiles/register', {errors: create.errors});
    }else{
        res.redirect('/register');
    }   
}));

router.get('/updateuser', isAuth ,resolver((req, res) => {
    res.render('profiles/updateprofile')
}));

router.post('/getuser', isAuth, resolver( async(req,res) => {
    const user = new Users(req.body, res.locals, req.params);
    const userObj = await user.findOneByParam({name: req.body.name});
    res.send(JSON.stringify(userObj));    
}));

router.post('/updateuser/update', isAuth, resolver( async(req, res) => {    
    const user = new Users(req.body, res.locals, req.params);
    const update = await user.updateOne();
    if(update.errors.length > 0){
        res.render('profiles/updateprofile', {errors: update.errors});
    }else{       
        res.redirect('/updateuser');
    }   
}));

router.get('/profile/:name', isAuth, resolver( async(req, res) => {
    const user = new Users(req.body, res.locals, req.params);
    const userObj = await user.findOneByParam({name: req.params.name});
    res.render('profiles/profiledescription', {paramName: req.params.name, profile: userObj});   
}));

router.post('/sections', /*isAuth,*/ resolver( async(req, res) => {
    const sections = new Sections(req.body, res.locals, req.params);
    const sectionsValues = await sections.findByParam();
    res.send(JSON.stringify(sectionsValues));
    
}));

router.get('/deleteuser', isAuth, resolver((req, res) => {
    res.render('profiles/deleteuser');
}));

router.post('/deleteuser/delete', isAuth, resolver( async(req, res) => {
    const user = new Users(req.body, res.locals, req.params);
    await user.deleteOne();
    res.redirect('/deleteuser');    
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

