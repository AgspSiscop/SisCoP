const express =  require('express');
const mongoose = require('mongoose');
const {DocumentManipulator, uploadFile} = require('../../models/document_reader/DocumentManipulator');
require('../../models/document_reader/ProcessDB');
require('../../models/document_reader/ProcessStateDB')
const Process = mongoose.model('process');
const ProcessState = mongoose.model('processstate');

const router = express.Router();

router.get('/', (req, res) => { 
      
    res.render('document_reader/processInTransfer');
});

router.post('/:year', (req,res) => {     
    Process.find({$or: [{receiver: res.locals.id}, {section_receiver: res.locals.section}]}).where({year: req.params.year}).lean().then((process) => {               
        res.send(JSON.stringify(process))
    }).catch((error) =>{
        res.send(error);
    });    
});

/*router.post('/:year/edit/:link', (req, res) =>{
    try {        
        Process.updateOne({_id: req.body.elementid}, {$set: {title: req.body.ename}}).lean().then(() =>{                
            DocumentManipulator.rename(`upload/inTransfer/${req.params.year}/${req.params.link}`,
            `upload/inTransfer/${req.params.year}/${req.params.link.split('_')[0]}_${req.params.link.split('_')[1]}_${req.params.link.split('_')[2]}_${req.body.ename}`);
            res.redirect(`/processosrecebidos`);                
        }).catch((error) => {
            console.log(error);
            res.send('Erro: ' + error)
        });                 
    } catch (error) {
        res.send('error' + error)        
    }
});*/

router.post('/:year/delete/:link', (req, res) => { 
    try {        
        Process.findOne({_id: req.body.elementid}).then((process) => {
            if(process.user == null && (process.receiver == null || process.section_receiver == null) && process.done == false){
                ProcessState.deleteMany({process: req.body.elementid}).then(() =>{}).catch((error) => {
                    console.log('Erro: ' + error)
                });
                Process.deleteOne(process).then(() => {                        
                    DocumentManipulator.removeProcess(`upload/inTransfer/${req.params.year}/${req.params.link}`);
                    res.redirect(`/processosrecebidos/`);
                }).catch((error) =>{
                    res.send(error);
                });                    
            }else{
                if(process.receiver != null ^ process.section_receiver != null){
                    Process.updateOne({_id: process._id}, {$set: {section_receiver: null , section: null}}).then(() =>{
                        DocumentManipulator.removeProcess(`upload/inTransfer/${req.params.year}/${req.params.link}`);
                        res.redirect(`/processosrecebidos/`);
                    }).catch((error) => {
                        console.log(error);
                        res.send('Erro: ' + error)
                    });                    
                }else{
                    if(res.locals.section == process.section){
                        Process.updateOne({_id: process._id}, {$set: {section: null}}).then(() =>{                            
                            res.redirect(`/processosrecebidos/`);
                        }).catch((error) => {
                            console.log(error);
                            res.send('Erro: ' + error)
                        });
                    }else{
                        Process.updateOne({_id: process._id}, {$set: {section_receiver: null}}).then(() =>{                            
                            res.redirect(`/processosrecebidos/`);
                        }).catch((error) => {
                            console.log(error);
                            res.send('Erro: ' + error)
                        });
                    }
                }                                
            }
        }).catch((error) => {
            console.log(error);
            res.send('Erro: ' + error);
        });             
    } catch (error) {
        res.send('error' + error)        
    }
});

router.post('/:year/:link', (req, res) =>{ 
    let documents;
    try {            
        Process.findOne({dir: req.params.link}).lean().then((process) => {
            ProcessState.find({process: process}).lean().then((states) => {                
                let message = req.session.error || null; //mudar isso
                req.session.error = null
                documents = DocumentManipulator.readDir(`upload/inTransfer/${req.params.year}/${req.params.link}`);
                res.render('document_reader/documentsInTransfer', {id: process._id, date: process.date, year: req.params.year, title: req.params.link, documents: documents, error: message, states: states});

            }).catch((error) => {
                res.send('Erro: ' + error);
            })
        }).catch((error) => {
            res.send('Erro: ' + error);
        });             
    } catch (error){
        res.redirect('/')
    }    
});

router.post('/:year/:link/edit/:file', (req, res) => { 
    try {         
        let fileExtension = req.params.file.split('.');
        fileExtension = fileExtension[fileExtension.length -1];
        DocumentManipulator.rename(`upload/inTransfer/${req.params.year}/${req.params.link}/${req.params.file}`,
        `upload/inTransfer/${req.params.year}/${req.params.link}/${req.body.ename}.${fileExtension}`);
        res.redirect( 307, `/processosrecebidos/${req.params.year}/${req.params.link}`);
                  
    } catch (error) {
        res.send('error' + error)        
    }
});

router.post('/:year/:link/delete/:file', (req, res) => { 
    try {       
        DocumentManipulator.removeDocument(`upload/inTransfer/${req.params.year}/${req.params.link}/${req.params.file}`);
        res.redirect(307, `/processosrecebidos/${req.params.year}/${req.params.link}`);                 
    } catch (error) {
        res.send('error' + error)        
    }
});

router.post('/:year/:link/:file', (req, res) =>{ 
    try {        
        let doc = DocumentManipulator.readDocument(`upload/inTransfer/${req.params.year}/${req.params.link}/${req.params.file}`);
        res.end(doc);               
    } catch (error) {
        res.redirect('/');      
    }    
});

router.post('/:year/:link/upload/:local/', uploadFile,(req,res) =>{ 
    try {                                     
        res.redirect(307, `/processosrecebidos/${req.params.year}/${req.params.link}`);                
    } catch (error) {        
        res.redirect(307, `/processosrecebidos/${req.params.year}/${req.params.link}`, {error: error});     
    }        
});

router.get('/:year/:link/anotation/:title', (req,res) => {  
    try {                                      
        res.render('document_reader/anotation', {title: req.params.title, year: req.params.year, link: req.params.link, baseurl: req.baseUrl});                
    } catch (error) {
        res.redirect('/');        
    }            
});

router.post('/:year/:link/anotation/:title', (req,res) => { 
    Process.findOne({dir: req.params.link}).lean().then((process) => {
        const State = {
            process: process,
            state: req.body.state,
            anotation: req.body.anotation,
            date: Intl.DateTimeFormat('pt-BR', { dateStyle: "full", timeStyle: "short" }).format(new Date())
        }
        new ProcessState(State).save().then(() =>{
            res.redirect(307, `/processosrecebidos/${req.params.year}/${req.params.link}`)
        }).catch((error) =>{
            res.send('Erro: ' + error);
        }) 
    }).catch((error) => {
        res.send('Erro: ' + error);
    });          
});

router.post('/:year/:link/anotation/:title/delete', (req,res) => {
    try {        
        ProcessState.deleteOne({_id: req.body.elementid}). then(() =>{
            res.redirect(307, `/processosrecebidos/${req.params.year}/${req.params.link}`);
        }).catch((error) => {
            console.log('Erro: ' + error)
        });                 
    } catch (error) {
        res.send('error' + error)        
    }

})


module.exports= router;