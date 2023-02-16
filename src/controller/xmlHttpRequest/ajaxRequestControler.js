const express = require('express');
const isAuth =require('../../../config/isAuth');
const resolver =  require('../../../config/errorHandler');
const Processes =  require('../../models/document_reader/ProcessesDB');
const Sections = require('../../models/profiles/SectionsDB');
const Year =  require('../../models/document_reader/YearDB');

const router = express.Router();

router.post('/allyears', isAuth, resolver( async(req, res) => {
    const year = new Year(req.body, res.locals, req.params);
    const allYears =  await year.findYears();
    res.send(JSON.stringify(allYears));
}) );


module.exports = router;