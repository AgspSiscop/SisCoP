const express = require('express');
const mongoose = require('mongoose');
require('../../models/document_reader/ProcessDB');
require('../../models/document_reader/ProcessStateDB')
const Process = mongoose.model('process');
const ProcessState = mongoose.model('processstate');

const router = express.Router();

router.get('/', (req, res) => {
    res.render('process_manager/managerprocess');
});

router.post('/', (req,res) => {    
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
        console.log(processes)
        res.send(JSON.stringify(processes))
      })
})


module.exports = router;