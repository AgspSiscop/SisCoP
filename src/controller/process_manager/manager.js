const express = require('express');
const mongoose = require('mongoose');
require('../../models/document_reader/ProcessDB');
require('../../models/document_reader/ProcessStateDB');
const isAuth =require('../../../config/isAuth');
const resolver =  require('../../../config/errorHandler');
const Process = mongoose.model('process');
const ProcessState = mongoose.model('processstate');

const router = express.Router();

router.get('/', isAuth, resolver(async(req, res) => {  
    res.render('process_manager/managerprocess');
}));

router.post('/', resolver((req,res) => {  
    Process.aggregate([
      {
        $match: { origin: req.body.origin}      
      },
      {
        $lookup: {
          from: 'processstates',
          localField: '_id',
          foreignField: 'process',            
          as: 'status'             
        },                    
      },
    ]).sort({_id: -1}).then((processes) => {      
      res.send(JSON.stringify(processes));
      
    }).catch((error) => {
      console.log(error);
      res.render('error/error', {serverError: {message: error.message, code: error.code}});
    });   
}));

router.post('/search', isAuth, resolver((req, res) =>{  
  const search = new Object();
  search.origin = req.body.origin;
  search[req.body.type] = new RegExp(`${req.body.search}`, 'i');

  Process.aggregate([
    {
      $match: search      
    },
    {
      $lookup: {
        from: 'processstates',
        localField: '_id',
        foreignField: 'process',            
        as: 'status'             
      },                    
    },
  ]).sort({_id: -1}).then((processes) => {
    res.send(JSON.stringify(processes));

  }).catch((error) => {
    console.log(error);
    res.render('error/error', {serverError: {message: error.message, code: error.code}});
  });
}));

router.post('/:id', isAuth, resolver((req, res) => {  
  Process.findOne({_id: req.params.id}).lean().then((process) => {
    ProcessState.find({process: process._id}).lean().sort({_id: -1}).then((states) => {      
      res.render('process_manager/managerstatus', {process: process, states: states});
    }).catch((error) => {
      console.log(error);
      res.render('error/error', {serverError: {message: error.message, code: error.code}});
    })
  }).catch((error) => {
    console.log(error);
    res.render('error/error', {serverError: {message: error.message, code: error.code}});
  }); 
}));

module.exports = router;