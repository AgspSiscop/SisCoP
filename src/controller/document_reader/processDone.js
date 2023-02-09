const express = require('express');
const {DocumentManipulator, uploadAsync} = require('../../models/document_reader/DocumentManipulator');
const isAuth =require('../../../config/isAuth');
const resolver =  require('../../../config/errorHandler');
const Processes = require('../../models/document_reader/ProcessesDB');
const ProcessStates = require('../../models/document_reader/ProcessesStatesDB');

const router = express.Router();

router.post('/:year/:link/:local', isAuth, resolver( async(req, res) => {
    const process = new Processes(req.body, res.locals, req.params);
    const state = new ProcessStates(req.body, res.locals, req.params);
    const processObj = await process.findOneByParam({_id: req.body.process});
    const doneDir = `${Date.now()}_${processObj.title}`;

    await process.sendProcess({done: true, done_dir: doneDir});
    DocumentManipulator.copy(`upload/${req.params.local}/${req.params.year}/${req.params.link}`, `upload/done/${req.params.year}/${doneDir}`);
    await state.doneState();
    if(req.params.local === 'inProcess'){
        res.redirect('/meusprocessos');
    }
    if(req.params.local === 'inTransfer'){
        res.redirect('/processosrecebidos');
    }

}));

router.post('/:year/:link/:local/return', isAuth, resolver( async(req, res) => {
    const process = new Processes(req.body, res.locals, req.params);
    const state = new ProcessStates(req.body, res.locals, req.params);
    const processObj = await process.findOneByParam({_id: req.body.process});
    
    await process.sendProcess({done: false, done_dir: null});
    await DocumentManipulator.removeProcess(`upload/done/${req.params.year}/${processObj.done_dir}`);
    await state.returnState();
    if(req.params.local === 'inProcess'){
        res.redirect('/meusprocessos');
    }
    if(req.params.local === 'inTransfer'){
        res.redirect('/processosrecebidos');
    }
    
}))
module.exports = router;

