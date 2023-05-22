const express = require('express');
const {isAuth} = require('../../../config/isAuth');
const resolver =  require('../../../config/errorHandler');
const Processes = require('../../models/document_reader/ProcessesDB');
const ProcessStates = require('../../models/document_reader/ProcessesStatesDB');
const Files = require('../../models/document_reader/FilesDB');
const {setHeader} = require('../../models/process_manager/DocumentManipulator');

const router = express.Router();

router.get('/', isAuth, resolver( async(req, res) => {  
    res.render('process_manager/managerprocess');
}));

router.post('/:id', isAuth, resolver( async(req, res) => {
  const process = new Processes(req.body, res.locals, req.params);
  const state = new ProcessStates(req.body, res.locals, req.params);
  const states = await state.find();
  let processObj = await process.findOne(); 
  processObj.nup ? processObj.nup.replace(/([0-9]{5})([0-9]{6})([0-9]{4})([0-9]{2})/, '$1.$2/$3-$4'): 0; // altered
  res.render('process_manager/managerstatus', {process: processObj, states: states});  
}));

router.post('/:year/:id/:fileid', isAuth, resolver( async(req, res) =>{ ///ok
  const file = new Files(req.body, res.locals, req.params);
  const doc = await file.findOneByParam({_id: req.params.fileid});       
  
  res.set('Content-Type', setHeader(doc.extension));
  res.set('Content-Disposition', `filename="${doc.filename}${doc.extension}"`);
  res.end(Buffer.from(doc.file));         
}));

module.exports = router;