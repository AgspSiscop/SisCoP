const express = require('express');
const fs =  require('fs');
const  mongoose  = require('mongoose');
require('../../models/document_reader/ProcessDB');
const Process = mongoose.model('process')
const router = express.Router();

router.get('/', (req,res) =>{
    res.render('document_maker/create');
});

router.post('/cadastro', (req, res) =>{
    try {       
        const process = {
            user: req.user,
            receiver: null,
            section_receiver: null,            
            title: req.body.object,
            category: req.body.category,
            dir: `${req.user.level + '_' + req.user.section + '_' + req.user.name + '_' + req.body.object}`,
            description: req.body.description,
            date: Intl.DateTimeFormat('pt-BR', { dateStyle: "full", timeStyle: "short" }).format(new Date()),
            year: (new Date).getFullYear().toString()
        };
        new Process(process).save().then(() => {
            fs.mkdir(`upload/inProcess/${(new Date).getFullYear()}/${req.user.level + '_' + req.user.section + '_' + req.user.name + '_' + req.body.object}`, {recursive: true} ,(error) =>{});
            res.redirect(307, `/meusprocessos/${(new Date).getFullYear()}/${req.user.level + '_' + req.user.section + '_' + req.user.name + '_' + req.body.object}`)
        }
        ).catch((error) => {
            if(error.code == 11000){
                res.render('document_maker/create', {error: 'Este processo já existe!'});
            }else{
                res.send('ERRO. POR FAVOR COMUNICAR O ADMINISTRADOR DO SISTEMA ANTES DE FAZER QUALQUER OPERAÇÃO!'+ error);
            }
        });
               
    } catch (error) {
        res.send('Erro: ' + error);
    }
});

router.get('/montagemdeprocesso', (req,res) => {
    try {
        res.render('document_maker/index');        
    } catch (error) {        
    }
})



module.exports = router;