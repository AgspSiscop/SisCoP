const express = require('express');
const {isAuth} =require('../../../config/isAuth');
const resolver =  require('../../../config/errorHandler');
const Processes =  require('../../models/document_reader/ProcessesDB');
const Sections = require('../../models/profiles/SectionsDB');
const Year =  require('../../models/document_reader/YearDB');
const ProcessStates =  require('../../models/document_reader/ProcessesStatesDB');
const router = express.Router();

router.get('/', isAuth, resolver((req,res) =>{
    res.render('document_reader/create');
}));

router.post('/cadastro', isAuth, resolver( async(req, res) =>{
    const year = new Year(req.body, res.locals, req.params);
    const processYear =  await year.findOneYear(req.body.year);
    if(!processYear){
        await year.create();
    }
    const process = new Processes(req.body, res.locals);
    const state = new ProcessStates(req.body, res.locals, req.params);
    const processObj = await process.create();    
    await state.registerState(processObj.process._id);
    if(processObj.errors.length > 0){
        res.render('document_reader/create', {errors: processObj.errors});
    }else{       
        res.redirect(307, `/meusprocessos/${processObj.process.year}/${processObj.process._id}`);
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

router.post

router.get('/montagemdeprocesso', isAuth, resolver((req,res) => {    
    res.render('document_maker/index');   
}));



module.exports = router;