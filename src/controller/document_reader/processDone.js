const express = require('express');
const {setHeader} = require('../../models/document_reader/UploadsReader');
const {isAuth} = require('../../../config/isAuth');
const resolver =  require('../../../config/errorHandler');
const Processes = require('../../models/document_reader/ProcessesDB');
const ProcessStates = require('../../models/document_reader/ProcessesStatesDB');
const Files =  require('../../models/document_reader/FilesDB');

const router = express.Router();

router.get('/', isAuth, resolver((req, res) => {       
    res.render('document_reader/processdone');           
}));

router.post('/:year/:id', isAuth, resolver( async(req, res) => {    
    let message = req.session.error || null; //mudar isso
    req.session.error = null;
    res.render('document_reader/donefiles', {error: message});
}));

router.post('/:year/:id/:local/done/process', isAuth, resolver( async(req, res) => {
    const process = new Processes(req.body, res.locals, req.params);
    const state = new ProcessStates(req.body, res.locals, req.params);    
       
    await process.sendProcess({done: true, user: null, receiver: null, section_receiver: null,});
    await state.doneState();
    if(req.params.local === 'myprocess'){
        res.redirect('/meusprocessos');
    }
    if(req.params.local === 'processreceived'){
        res.redirect('/processosrecebidos');
    }    
}));

router.post('/:year/:id/:fileid', isAuth, resolver( async(req, res) =>{ 
    const file = new Files(req.body, res.locals, req.params);
    const doc = await file.findOneByParam({_id: req.params.fileid});       
    
    res.set('Content-Type', setHeader(doc.extension));
    res.set('Content-Disposition', `filename="${doc.filename}${doc.extension}"`);
    res.end(Buffer.from(doc.file));         
}));

router.post('/:year/:link/:local/return/process', isAuth, resolver( async(req, res) => { 
    const process = new Processes(req.body, res.locals, req.params);
    const state = new ProcessStates(req.body, res.locals, req.params);
    
    await process.sendProcess({done: false, user: res.locals.user._id});
    await state.returnState();    
    res.redirect('/meusprocessos');    
}));

module.exports = router;

