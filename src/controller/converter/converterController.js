const express = require('express');
const isAuth = require('../../../config/isAuth');
const resolver =  require('../../../config/errorHandler');
const {DocumentManipulator} = require('../../models/converter/converterDocManipulator');
const CAM = require('../../models/converter/ConverterAndMerger');


const router = express.Router();

router.post('/:year/:link/:local', isAuth, resolver( async(req, res) => {   
    res.render('converter/converter', {processName: req.params.link.split('_')[1]})
}));

router.post('/:year/:link/:local/search/files', isAuth, resolver ( async(req, res) => {
    let documents = await DocumentManipulator.readDir(`upload/${req.params.local}/${req.params.year}/${req.params.link}`) || [];
    res.send(JSON.stringify({documents: documents, path: `upload/${req.params.local}/${req.params.year}/${req.params.link}`}));
}));

router.post('/conversion/:local/:year/:link', isAuth, resolver( async(req, res) => {    
    const document = new CAM(req.body.file, `./upload/${req.params.local}/${req.params.year}/${req.params.link}`);
    await document.converter();
    if(req.params.local === 'inTransfer'){
        res.redirect(307, `/processosrecebidos/${req.params.year}/${req.params.link}`);
    }
    if(req.params.local === 'inProcess'){
        res.redirect(307, `/meusprocessos/${req.params.year}/${req.params.link}`);
    }
}));



module.exports = router