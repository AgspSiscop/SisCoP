const express =  require('express');
const {uploadAsync, setHeader} = require('../../models/document_reader/UploadsReader');
const {isAuth} =require('../../../config/isAuth');
const resolver =  require('../../../config/errorHandler');
const Processes = require('../../models/document_reader/ProcessesDB');
const ProcessStates = require('../../models/document_reader/ProcessesStatesDB');
const Files = require('../../models/document_reader/FilesDB');

const router = express.Router();

router.get('/', isAuth, resolver((req, res) => {      
    res.render('document_reader/processInTransfer');
}));

router.post('/:year/delete/:id', isAuth, resolver( async(req, res) => {
    const process = new Processes(req.body, res.locals, req.params);    
    const states = new ProcessStates(req.body, res.locals, req.params);
    const files = new Files(req.body, res.locals, req.params);
        await states.delete();
        await process.deleteOne();
        await files.delete();  
        res.redirect(`/processosrecebidos`);    
}));

router.post('/:year/editprocess/:id', isAuth, resolver( async(req, res) => { 
    const process = new Processes(req.body, res.locals, req.params);
    let processObj = await process.findOne();
    processObj.nup = processObj.nup.replace(/([0-9]{5})([0-9]{6})([0-9]{4})([0-9]{2})/, '$1.$2/$3-$4');
    res.render('document_reader/editprocess', {process: processObj});         
}));

router.post('/:year/edit/:id', isAuth, resolver( async(req, res) =>{ 
    const process = new Processes(req.body, res.locals, req.params);    
    const update = await process.updateOne();
    if(update.errors.length > 0){
        let processObj = await process.findOne();
        processObj.nup = processObj.nup.replace(/([0-9]{5})([0-9]{6})([0-9]{4})([0-9]{2})/, '$1.$2/$3-$4');      
        res.render('document_reader/editprocess', {process: processObj, errors: update.errors});
    }else{        
        res.redirect(`/processosrecebidos`);
    }
}));

router.post('/:year/:id', isAuth, resolver( async(req, res) => {    
    let message = req.session.error || null; //mudar isso
    req.session.error = null;
    res.render('document_reader/filesInTransfer', {error: message});
}));

router.get('/:year/:id', isAuth, resolver( async(req, res) => {    
    res.redirect('/processosrecebidos');
}));

router.post('/:year/:id/edit/:fileid', isAuth, resolver( async(req, res) => { 
    const file = new Files(req.body, res.locals, req.params);
    await file.updateOne();    
    res.redirect( 307, `/processosrecebidos/${req.params.year}/${req.params.id}`);   
}));

router.post('/:year/:id/delete/:fileid', isAuth, resolver( async(req, res) => {     
    const file = new Files(req.body, res.locals, req.params);
    await file.deleteOne();
    res.redirect(307, `/processosrecebidos/${req.params.year}/${req.params.id}`);    
}));

router.post('/:year/:id/:fileid', isAuth, resolver( async(req, res) =>{ 
    const file = new Files(req.body, res.locals, req.params);
    const doc = await file.findOneByParam({_id: req.params.fileid});       
    
    res.set('Content-Type', setHeader(doc.extension));
    res.set('Content-Disposition', `filename="${doc.filename}${doc.extension}"`);
    res.end(Buffer.from(doc.file));         
}));

router.post('/:year/:id/upload/:local/', isAuth, resolver( async(req,res, next) =>{        
    const uploads = await uploadAsync(req, res);
    const files = new Files(req.body, res.locals, req.params);

    for(let file of Object.values(uploads)[0]){               
        await files.createFileProcess(file.buffer, file.originalname, req.params.id);        
    }
    res.redirect(307, `/processosrecebidos/${req.params.year}/${req.params.id}`);                                           
}));

router.post('/:year/:id/anotation/:title', isAuth, resolver((req,res) => {                                         
    res.render('document_reader/anotation', {title: req.params.title, year: req.params.year, link: req.params.id, baseurl: req.baseUrl, elementid: req.body.elementid});               
}));

router.post('/:year/:id/anotation/:title/create', isAuth, resolver( async(req,res) => {
    const state =  new ProcessStates(req.body, res.locals, req.params);
    await state.create();
    res.redirect(307, `/processosrecebidos/${req.params.year}/${req.params.id}`);          
}));

router.post('/:year/:id/anotation/:title/delete', isAuth, resolver( async(req,res) => {
    const state =  new ProcessStates(req.body, res.locals, req.params);
    await state.deleteOne();
    res.redirect(307, `/processosrecebidos/${req.params.year}/${req.params.id}`);    
}));

module.exports= router;