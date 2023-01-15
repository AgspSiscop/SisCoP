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
    res.render('document_reader/processInTransfer');
}));

router.post('/:year', isAuth, resolver((req,res) => {     
    Process.find({$or: [{receiver: res.locals.id}, {section_receiver: res.locals.section}]}).where({year: req.params.year}).lean().then((process) => {               
        res.send(JSON.stringify(process))
    }).catch((error) =>{
        console.log(error);
        res.render('error/error', {serverError: {message: error.message, code: error.code}});
    });    
}));

router.post('/:year/delete/:link', isAuth, resolver((req, res) => {            
    Process.findOne({_id: req.body.elementid}).then((process) => {
        if(process.user == null && (process.receiver == null || process.section_receiver == null) && process.done == false){                
            ProcessState.deleteMany({process: req.body.elementid}).then(() =>{}).catch((error) => {
                console.log(error);
                res.render('error/error', {serverError: {message: error.message, code: error.code}});
            });
            Process.deleteOne(process).then(async() => {                        
               await DocumentManipulator.removeProcess(`upload/inTransfer/${req.params.year}/${req.params.link}`);
                res.redirect(`/processosrecebidos/`);
            }).catch((error) =>{
                console.log(error);
                res.render('error/error', {serverError: {message: error.message, code: error.code}});
            });                    
        }else{
            if((process.receiver != null) !== (process.section_receiver != null)){                    
                Process.updateOne({_id: process._id}, {$set: {section_receiver: null , receiver: null, transfer_dir: null}}).then(async() =>{
                   await DocumentManipulator.removeProcess(`upload/inTransfer/${req.params.year}/${req.params.link}`);
                    res.redirect(`/processosrecebidos/`);
                }).catch((error) => {
                    console.log(error);
                    res.render('error/error', {serverError: {message: error.message, code: error.code}});
                });                    
            }else{
                if(res.locals.section == process.section_receiver){                        
                    Process.updateOne({_id: process._id}, {$set: {section_receiver: null}}).then(() =>{                            
                        res.redirect(`/processosrecebidos/`);
                    }).catch((error) => {
                        console.log(error);
                        res.render('error/error', {serverError: {message: error.message, code: error.code}});
                    });
                }else{                                              
                    Process.updateOne({_id: process._id}, {$set: {receiver: null}}).then(() =>{                            
                        res.redirect(`/processosrecebidos/`);
                    }).catch((error) => {
                        console.log(error);
                        res.render('error/error', {serverError: {message: error.message, code: error.code}});
                    });
                }
            }                                
        }
    }).catch((error) => {
        console.log(error);
        res.render('error/error', {serverError: {message: error.message, code: error.code}});;
    });             
    
}));

router.post('/:year/:link', isAuth, resolver((req, res) =>{ 
    let documents;              
    Process.findOne({transfer_dir: req.params.link}).lean().then((process) => {
        ProcessState.find({process: process}).lean().then( async(states) => {                
            let message = req.session.error || null; //mudar isso
            req.session.error = null
            documents = await DocumentManipulator.readDir(`upload/inTransfer/${req.params.year}/${req.params.link}`);
            res.render('document_reader/documentsInTransfer', {process: process, documents: documents, error: message, states: states});
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
    await DocumentManipulator.rename(`upload/inTransfer/${req.params.year}/${req.params.link}/${req.params.file}`,
    `upload/inTransfer/${req.params.year}/${req.params.link}/${req.body.ename}.${fileExtension}`);
    res.redirect( 307, `/processosrecebidos/${req.params.year}/${req.params.link}`);   
}));

router.post('/:year/:link/delete/:file', isAuth, resolver(async(req, res) => {           
    await DocumentManipulator.removeDocument(`upload/inTransfer/${req.params.year}/${req.params.link}/${req.params.file}`);
    res.redirect(307, `/processosrecebidos/${req.params.year}/${req.params.link}`);   
}));

router.post('/:year/:link/:file', isAuth, resolver(async(req, res) =>{          
    let doc = await DocumentManipulator.readDocument(`upload/inTransfer/${req.params.year}/${req.params.link}/${req.params.file}`);
    res.end(doc);      
}));

router.post('/:year/:link/upload/:local/', isAuth, uploadAsync, resolver((req,res) =>{                                       
    res.redirect(307, `/processosrecebidos/${req.params.year}/${req.params.link}`);          
}));

router.get('/:year/:link/anotation/:title', isAuth, resolver((req,res) => {                                         
    res.render('document_reader/anotation', {title: req.params.title, year: req.params.year, link: req.params.link, baseurl: req.baseUrl});               
}));

router.post('/:year/:link/anotation/:title', isAuth, resolver((req,res) => { 
    Process.findOne({transfer_dir: req.params.link}).lean().then((process) => {
        const State = {
            process: process,
            state: req.body.state,
            anotation: req.body.anotation,
            date: Intl.DateTimeFormat('pt-BR', { dateStyle: "full", timeStyle: "short" }).format(new Date())
        }
        new ProcessState(State).save().then(() =>{
            res.redirect(307, `/processosrecebidos/${req.params.year}/${req.params.link}`)
        }).catch((error) =>{
            console.log(error);
            res.render('error/error', {serverError: {message: error.message, code: error.code}});
        }) 
    }).catch((error) => {
        console.log(error);
        res.render('error/error', {serverError: {message: error.message, code: error.code}});;
    });          
}));

router.post('/:year/:link/anotation/:title/delete', isAuth, resolver((req,res) => {            
    ProcessState.deleteOne({_id: req.body.elementid}). then(() =>{
        res.redirect(307, `/processosrecebidos/${req.params.year}/${req.params.link}`);
    }).catch((error) => {
        console.log(error);
        res.render('error/error', {serverError: {message: error.message, code: error.code}});
    });
}));

module.exports= router;