const express = require('express');
const isAuth =require('../../../config/isAuth');
const resolver =  require('../../../config/errorHandler');
const Processes = require('../../models/document_reader/ProcessesDB');
const ProcessStates = require('../../models/document_reader/ProcessesStatesDB');

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
  const processObj = await process.findOne();
  const state = new ProcessStates(req.body, res.locals, req.params);
  const states = await state.find();
  res.render('process_manager/managerstatus', {process: processObj, states: states});  
}));

module.exports = router;