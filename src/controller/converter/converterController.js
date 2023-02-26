const express = require('express');
const {isAuth} = require('../../../config/isAuth');
const resolver =  require('../../../config/errorHandler');
const {DocumentManipulator} = require('../../models/converter/converterDocManipulator');
const CAM = require('../../models/converter/ConverterAndMerger');
const Files = require('../../models/document_reader/FilesDB');

const router = express.Router();

router.post('/arquivos/:year/:id/:name/:local', isAuth, resolver( async(req, res) => {   
    res.render('converter/converter', {processName: req.params.name})
}));

router.post('/conversion/:year/:id/:local', isAuth, resolver( async(req, res) => {
    const files = new Files(req.user, res.locals, req.params);       
    const fileValues = await files.ordenedFindByParam({_id: req.body.file});    
    const docs = new DocumentManipulator(fileValues);
    const dirName = `./conversor/${fileValues[0].process}`
    const filePaths = await docs.generateFiles();    
    const documents = new CAM(filePaths, dirName);
    const pdf = await documents.converter();    
    
    const newFile = await docs.readDocument(pdf);
    await files.deleteOne();
    await files.createFileProcess(newFile.file, newFile.filename, newFile.id);
    await docs.deleteDocs()
    if(req.params.local === 'myprocess'){
        res.redirect(307, `/meusprocessos/${req.params.year}/${req.params.id}`);
    }
    if(req.params.local === 'processreceived'){
        res.redirect(307, `/processosrecebidos/${req.params.year}/${req.params.id}`);
    }    
}));

module.exports = router