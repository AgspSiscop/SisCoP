const express = require('express');
const isAuth =require('../../../config/isAuth');
const resolver =  require('../../../config/errorHandler');
const router = express.Router();
const {DocumentManipulator} =  require('../../models/document_reader/DocumentManipulator')
const Processes =  require('../../models/document_reader/ProcessesDB');
const Sections = require('../../models/profiles/SectionsDB');

router.get('/', isAuth, resolver((req,res) =>{
    res.render('document_reader/create');
}));

router.post('/cadastro', isAuth, resolver( async(req, res) =>{
    const process = new Processes(req.body, res.locals);
    const processObj = await process.create();    
    if(processObj.errors.length > 0){
        res.render('document_reader/create', {errors: processObj.errors});
    }else{
        await DocumentManipulator.makeDir(`upload/inProcess/${(new Date).getFullYear()}/${processObj.process.user_dir}`);
        res.redirect(307, `/meusprocessos/${(new Date).getFullYear()}/${processObj.process.user_dir}`);
    }
}));

router.post('/sections', isAuth, resolver( async(req, res) => {    
    const sections = new Sections(req.body, res.locals, req.params);
    const sectionsValues = await sections.findByParam({level: 1});
    res.send(JSON.stringify(sectionsValues));    
}));

router.post('/processsection', isAuth, resolver( async(req, res) => {
    const process = new Processes(req.body, res.locals, req.params);
    const processObj =  await process.findOneByParam({_id: req.body.process});
    res.send(JSON.stringify(processObj));     
}));

router.get('/montagemdeprocesso', isAuth, resolver((req,res) => {    
    res.render('document_maker/index');   
}));



module.exports = router;