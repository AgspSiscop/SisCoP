const express = require('express');
const isAuth =require('../../../config/isAuth');
const resolver =  require('../../../config/errorHandler');
const router = express.Router();
const {DocumentManipulator} =  require('../../models/document_reader/DocumentManipulator')
const Processes =  require('../../models/document_reader/ProcessesDB');

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

router.get('/montagemdeprocesso', isAuth, resolver((req,res) => {    
    res.render('document_maker/index');   
}));



module.exports = router;