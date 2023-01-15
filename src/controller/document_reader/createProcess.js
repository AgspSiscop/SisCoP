const express = require('express');
const fs =  require('fs');
const  mongoose  = require('mongoose');
require('../../models/document_reader/ProcessDB');
const isAuth =require('../../../config/isAuth');
const resolver =  require('../../../config/errorHandler');
const Process = mongoose.model('process')
const router = express.Router();

router.get('/', isAuth, resolver((req,res) =>{
    res.render('document_maker/create');
}));

router.post('/cadastro', isAuth, resolver((req, res) =>{          
    const process = {
        user: req.user,
        receiver: null,
        section_receiver: null,
        origin: req.body.origin,           
        title: req.body.object,
        category: req.body.category,
        user_dir: `${Date.now() + '_' + req.body.object}`,
        transfer_dir: null,
        done_dir: null,
        description: req.body.description,
        date: Intl.DateTimeFormat('pt-BR', { dateStyle: "full", timeStyle: "short" }).format(new Date()),
        year: (new Date).getFullYear().toString()
    };
    new Process(process).save().then(() => {
        fs.mkdir(`upload/inProcess/${(new Date).getFullYear()}/${process.user_dir}`, {recursive: true} ,(error) =>{});
        res.redirect(307, `/meusprocessos/${(new Date).getFullYear()}/${process.user_dir}`)
    }).catch((error) => {
        if(error.code == 11000){
            console.log(error)
            res.render('error/error', {serverError: {message: `Este processo já existe!`, code: error.statusCode}});            
        }else{
            console.log(error)
            res.render('error/error', {serverError: {message: `ERRO. POR FAVOR COMUNICAR O ADMINISTRADOR DO SISTEMA ANTES DE FAZER QUALQUER OPERAÇÃO! ${error}`, code: error.statusCode}} )            
        }
    });   
}));

router.get('/montagemdeprocesso', isAuth, resolver((req,res) => {    
    res.render('document_maker/index');   
}));



module.exports = router;