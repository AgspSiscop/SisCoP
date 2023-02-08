const express = require('express');
const {DocumentManipulator, uploadAsync} = require('../../models/document_reader/DocumentManipulator');
const isAuth =require('../../../config/isAuth');
const resolver =  require('../../../config/errorHandler');
const Processes = require('../../models/document_reader/ProcessesDB');
const ProcessStates = require('../../models/document_reader/ProcessesStatesDB');

const router = express.Router();

router.get('/:year/:link', isAuth, resolver( async(req, res) => {
    const process = new Processes(req.body, res.locals, req.params);
    const processObj = await process.findOneByParam({user_dir: req.params.link});
    const state =  new ProcessStates(req.body, res.locals, req.params);
    const states = await state.findByParam({process: processObj});
    let message = req.session.error || null; //mudar isso
    req.session.error = null;
    res.render('teste/files', {process: processObj, error: message, states: states});
}));

router.post('/documents', isAuth, resolver( async(req, res) => {      
    let documents = await DocumentManipulator.readDir(`upload/${req.body.local}/${req.body.year}/${req.body.link}`);
    res.send(JSON.stringify(documents));
      
}));

router.post('/process', isAuth, resolver(async(req, res) => {    
    const process = new Processes(req.body, res.locals, req.params);
    const processObj = await process.findOneByParam({user_dir: req.body.link});
    const state =  new ProcessStates(req.body, res.locals, req.params);
    const states = await state.findByParam({process: processObj});
    res.send(JSON.stringify({process: processObj, states: states}));
}));


module.exports = router;