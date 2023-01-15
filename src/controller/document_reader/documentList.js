const express =  require('express');
const mongoose = require('mongoose');
const {DocumentManipulator, uploadAsync} = require('../../models/document_reader/DocumentManipulator');
require('../../models/document_reader/ProcessDB');
require('../../models/document_reader/ProcessStateDB');
const isAuth =require('../../../config/isAuth');
const resolver =  require('../../../config/errorHandler');
const Process = mongoose.model('process');
const ProcessState = mongoose.model('processstate');

const router = express.Router();


router.get('/', isAuth, resolver((req, res) => {       
    res.render('document_reader/process');           
}));

router.post('/:year', isAuth, resolver((req,res) => {    
    Process.find({user: res.locals.id}).where({year: req.params.year}).lean().then((process) => {              
        res.send(JSON.stringify(process))
    }).catch((error) =>{
        console.log(error);
        res.render('error/error', {serverError: {message: error.message, code: error.code}});
    });     
}));

router.post('/:year/editprocess/:id', isAuth, resolver((req, res) => {    
    Process.findOne({_id: req.params.id}).lean().then((process) => {
        res.render('document_reader/editprocess', {process: process});

    }).catch((error) => {
        console.log(error);
        res.render('error/error', {serverError: {message: error.message, code: error.code}});
    });       
}));

router.post('/:year/edit/:link', isAuth, resolver((req, res) =>{           
    Process.updateOne({user_dir: req.params.link}, {$set: {title: req.body.object, user_dir: `${req.params.link.split('_')[0]}_${req.body.object}`, category: req.body.category, origin: req.body.origin, description: req.body.description}}).lean().then(async() =>{                
        await DocumentManipulator.rename(`upload/inProcess/${req.params.year}/${req.params.link}`,
        `upload/inProcess/${req.params.year}/${req.params.link.split('_')[0]}_${req.body.object}`);
        res.redirect(`/meusprocessos/`);                
    }).catch((error) => {
        console.log(error);
        res.render('error/error', {serverError: {message: error.message, code: error.code}});
    })    
}));

router.post('/:year/delete/:link', isAuth, resolver((req, res) => { //DONE          
    Process.findOne({_id: req.body.elementid}).then((process) => {
        if(process.receiver == null && process.section_receiver == null && process.done == false){            
            ProcessState.deleteMany({process: req.body.elementid}). then(() =>{
                return Process.deleteOne(process)
            }).then(async() => {                
                await DocumentManipulator.removeProcess(`upload/inProcess/${req.params.year}/${req.params.link}`);
                res.redirect(`/meusprocessos/`);
            }).catch((error) => {
                console.log(error);
                res.render('error/error', {serverError: {message: error.message, code: error.code}});
            });
                                
        }else{            
            Process.updateOne({_id: process._id}, {$set: {user: null, user_dir: null}}).then(async() =>{                
                await DocumentManipulator.removeProcess(`upload/inProcess/${req.params.year}/${req.params.link}`);
                res.redirect(`/meusprocessos/`);
            }).catch((error) => {
                console.log(error);
                res.render('error/error', {serverError: {message: error.message, code: error.code}});
            });               
        }
    }).catch((error) => {
        console.log(error);
        res.render('error/error', {serverError: {message: error.message, code: error.code}});
    });                 
    
}));

router.post('/:year/:link', isAuth, resolver((req, res) =>{
    let documents;         
    Process.findOne({user_dir: req.params.link}).lean().then((process) => {

        ProcessState.find({process: process}).lean().then(async(states) => {                
            let message = req.session.error || null; //mudar isso
            req.session.error = null
            documents = await DocumentManipulator.readDir(`upload/inProcess/${req.params.year}/${req.params.link}`);
            res.render('document_reader/documents', {process: process, documents: documents, error: message, states: states});

        }).catch((error) => {
            console.log(error);
            res.render('error/error', {serverError: {message: error.message, code: error.code}});
        })
    }).catch((error) => {
        console.log(error);
        res.render('error/error', {serverError: {message: error.message, code: error.code}});
    });            
        
}));

router.post('/:year/:link/edit/:file', isAuth, resolver(async(req, res) => {          
    let fileExtension = req.params.file.split('.');
    fileExtension = fileExtension[fileExtension.length -1];
    await DocumentManipulator.rename(`upload/inProcess/${req.params.year}/${req.params.link}/${req.params.file}`,
    `upload/inProcess/${req.params.year}/${req.params.link}/${req.body.ename}.${fileExtension}`);
    res.redirect(307, `/meusprocessos/${req.params.year}/${req.params.link}`);    
}));

router.post('/:year/:link/delete/:file', isAuth, resolver(async(req, res) => {         
    let fileExtension = req.params.file.split('.');
    fileExtension = fileExtension[fileExtension.length -1];
    await DocumentManipulator.removeDocument(`upload/inProcess/${req.params.year}/${req.params.link}/${req.params.file}`);
    res.redirect(307, `/meusprocessos/${req.params.year}/${req.params.link}`);    
}));

router.post('/:year/:link/:file', isAuth, resolver(async(req, res) =>{
    const doc = await DocumentManipulator.readDocument(`upload/inProcess/${req.params.year}/${req.params.link}/${req.params.file}`)
    res.end(doc);         
}));

router.post('/:year/:link/upload/:local/', isAuth, resolver(async(req,res, next) =>{    
    await uploadAsync(req, res);    
    res.redirect(307, `/meusprocessos/${req.params.year}/${req.params.link}`);                                           
}));

router.get('/:year/:link/anotation/:title', isAuth, resolver((req,res) => {                                        
    res.render('document_reader/anotation', {title: req.params.title, year: req.params.year, link: req.params.link, baseurl: req.baseUrl});              
}));

router.post('/:year/:link/anotation/:title', isAuth, resolver((req,res) => {   
    Process.findOne({user_dir: req.params.link}).lean().then((process) => {
        const State = {
            process: process,
            state: req.body.state,
            anotation: req.body.anotation,
            date: Intl.DateTimeFormat('pt-BR', { dateStyle: "full", timeStyle: "short" }).format(new Date())
        }
        new ProcessState(State).save().then(() =>{
            res.redirect(307, `/meusprocessos/${req.params.year}/${req.params.link}`)
        }).catch((error) =>{
            console.log(error);
            res.render('error/error', {serverError: {message: error.message, code: error.code}});
        }) 
    }).catch((error) => {
        console.log(error);
        res.render('error/error', {serverError: {message: error.message, code: error.code}});
    });   
}));

router.post('/:year/:link/anotation/:title/delete', isAuth, resolver((req,res) => {          
    ProcessState.deleteOne({_id: req.body.elementid}). then(() =>{
        res.redirect(307, `/meusprocessos/${req.params.year}/${req.params.link}`)

    }).catch((error) => {
        console.log(error);
        res.render('error/error', {serverError: {message: error.message, code: error.code}});
    });                  
    
}));

module.exports = router;