const express = require('express');
const isAuth =require('../../../config/isAuth');
const resolver =  require('../../../config/errorHandler');
const Processes = require('../../models/document_reader/ProcessesDB');
const ProcessStates = require('../../models/document_reader/ProcessesStatesDB');
const {DocumentManipulator} = require('../../models/process_manager/DocumentManipulator');

const router = express.Router();

router.get('/', isAuth, resolver( async(req, res) => {  
    res.render('process_manager/managerprocess');
}));

router.post('/', resolver( async(req,res) => {
  const process = new Processes(req.body, res.locals, req.params);
  const processObj = await process.aggregateStates({origin: req.body.origin});
  res.send(JSON.stringify(processObj));   
}));

router.post('/search', isAuth, resolver( async(req, res) =>{  
  const search = new Object();
  search.origin = req.body.origin;
  search[req.body.type] = new RegExp(`${req.body.search}`, 'i');
  const process = new Processes(req.body, res.locals, req.params);
  const processObj = await process.aggregateStates(search);
  res.send(JSON.stringify(processObj));  
}));

router.post('/:id', isAuth, resolver( async(req, res) => {
  const process = new Processes(req.body, res.locals, req.params);
  const state = new ProcessStates(req.body, res.locals, req.params);
  const states = await state.find();
  let processObj = await process.findOne(); 
  processObj.nup = processObj.nup.replace(/([0-9]{5})([0-9]{6})([0-9]{4})([0-9]{2})/, '$1.$2/$3-$4');
  res.render('process_manager/managerstatus', {process: processObj, states: states});  
}));

router.post('/:id/files', isAuth, resolver( async(req, res) => {
  const process =  new Processes(req.body, res.locals, req.params);
  const processObj = await process.findOneByParam({_id: req.params.id});
  const documents = await DocumentManipulator.readDir(`upload/done/${processObj.year}/${processObj.done_dir}`);
  res.send(JSON.stringify(documents));
}));

router.post('/:year/:link/:file', isAuth, resolver( async(req, res) =>{
  const doc = await DocumentManipulator.readDocument(`upload/done/${req.params.year}/${req.params.link}/${req.params.file}`);
  res.end(doc);         
}));

module.exports = router;