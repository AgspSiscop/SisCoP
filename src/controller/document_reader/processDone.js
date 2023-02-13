const express = require('express');
const {DocumentManipulator, uploadAsync} = require('../../models/document_reader/DocumentManipulator');
const isAuth =require('../../../config/isAuth');
const resolver =  require('../../../config/errorHandler');
const Processes = require('../../models/document_reader/ProcessesDB');
const ProcessStates = require('../../models/document_reader/ProcessesStatesDB');

const router = express.Router();

router.get('/', isAuth, resolver((req, res) => {       
    res.render('document_reader/processdone');           
}));

router.post('/processes', isAuth, resolver( async(req, res) => {    
    const processes = new Processes(req.body, res.locals, req.params);
    if(res.locals.section === 'Chefe da SALC'){
        const processesObj = await processes.findByParam({done: true});
        res.send(JSON.stringify(processesObj));
    }    
}));

router.post('/:year/:link', isAuth, resolver( async(req, res) => {
    const process = new Processes(req.body, res.locals, req.params);
    const processObj = await process.findOneByParam({done_dir: req.params.link});    
    const state =  new ProcessStates(req.body, res.locals, req.params);
    const states = await state.findByParam({process: processObj});
    let message = req.session.error || null; //mudar isso
    req.session.error = null;
    res.render('document_reader/donefiles', {process: processObj, error: message, states: states});
}));

router.post('/search/meus/documents', isAuth, resolver( async(req, res) => {      
    let documents = await DocumentManipulator.readDir(`upload/${req.body.local}/${req.body.year}/${req.body.link}`);
    res.send(JSON.stringify(documents));
      
}));

router.post('/search/meus/process', isAuth, resolver(async(req, res) => {        
    const process = new Processes(req.body, res.locals, req.params);
    const processObj = await process.findOneByParam({done_dir: req.body.link});
    const state =  new ProcessStates(req.body, res.locals, req.params);
    const states = await state.findByParam({process: processObj});
    res.send(JSON.stringify({process: processObj, states: states}));
}));

router.post('/:year/:link/:local/done/process', isAuth, resolver( async(req, res) => {   
    const process = new Processes(req.body, res.locals, req.params);
    const state = new ProcessStates(req.body, res.locals, req.params);
    const processObj = await process.findOneByParam({_id: req.body.process});
    const doneDir = `${Date.now()}_${processObj.title}`;

    await process.sendProcess({done: true, done_dir: doneDir, user: null, user_dir: null, receiver: null, section_receiver: null, transfer_dir: null});
    await DocumentManipulator.copy(`upload/${req.params.local}/${req.params.year}/${req.params.link}`, `upload/done/${req.params.year}/${doneDir}`);
    if(processObj.user_dir !== null){
        await DocumentManipulator.removeProcess(`upload/inProcess/${processObj.year}/${processObj.user_dir}`);
    }
    if(processObj.transfer_dir !== null){
        await DocumentManipulator.removeProcess(`upload/inTransfer/${processObj.year}/${processObj.transfer_dir}`);
    }
    await state.doneState();
    if(req.params.local === 'inProcess'){
        res.redirect('/meusprocessos');
    }
    if(req.params.local === 'inTransfer'){
        res.redirect('/processosrecebidos');
    }
}));

router.post('/:year/:link/:file', isAuth, resolver( async(req, res) =>{
    const doc = await DocumentManipulator.readDocument(`upload/done/${req.params.year}/${req.params.link}/${req.params.file}`);
    res.end(doc);         
}));

router.post('/:year/:link/:local/return/process', isAuth, resolver( async(req, res) => {
    const process = new Processes(req.body, res.locals, req.params);
    const state = new ProcessStates(req.body, res.locals, req.params);
    const processObj = await process.findOneByParam({_id: req.body.process});
    const newUserDir = `${Date.now()}_${processObj.title}`
    await process.sendProcess({done: false, done_dir: null, user: res.locals.user._id, user_dir: `${newUserDir}`});
    await DocumentManipulator.copy(`upload/done/${processObj.year}/${processObj.done_dir}`, `upload/inProcess/${processObj.year}/${newUserDir}`);
    await DocumentManipulator.removeProcess(`upload/done/${req.params.year}/${processObj.done_dir}`);
    await state.returnState();
    if(req.params.local === 'inTransfer'){
        res.redirect('/processosrecebidos');
    }else{        
        res.redirect('/meusprocessos');        
    }
        
    
}))
module.exports = router;

