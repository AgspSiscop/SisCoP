const express =  require('express');
const {DocumentManipulator, uploadAsync} = require('../../models/document_reader/DocumentManipulator');
const isAuth =require('../../../config/isAuth');
const resolver =  require('../../../config/errorHandler');
const Processes = require('../../models/document_reader/ProcessesDB');
const ProcessStates = require('../../models/document_reader/ProcessesStatesDB');

const router = express.Router();

router.get('/', isAuth, resolver((req, res) => {      
    res.render('document_reader/processInTransfer');
}));

router.post('/:year', isAuth, resolver( async(req,res) => {
    const process = new Processes(req.body, res.locals, req.params);    
    const processObj = await process.findByParam({$or: [{receiver: res.locals.id, done: false, year: req.params.year}, {section_receiver: res.locals.sectionID, done: false, year: req.params.year}]});    
    res.send(JSON.stringify(processObj));  
}));

router.post('/:year/delete/:link', isAuth, resolver( async(req, res) => {
    const process = new Processes(req.body, res.locals, req.params);
    const processObj = await process.findOne();
    const states = new ProcessStates(req.body, res.locals, req.params);
        await states.delete();
        await process.deleteOne();
        await DocumentManipulator.removeProcess(`upload/inTransfer/${req.params.year}/${req.params.link}`);
        res.redirect(`/processosrecebidos/`);
    /*if(processObj.user == null && (processObj.receiver == null || processObj.section_receiver == null) && processObj.done == false){
        const states = new ProcessStates(req.body, res.locals, req.params);
        await states.delete();
        await process.deleteOne();
        await DocumentManipulator.removeProcess(`upload/inTransfer/${req.params.year}/${req.params.link}`);
        res.redirect(`/processosrecebidos/`);
    }else{
        process.deleteInTransfer();
        await DocumentManipulator.removeProcess(`upload/inTransfer/${req.params.year}/${req.params.link}`);
        res.redirect(`/processosrecebidos/`);
    }*/
}));

router.post('/:year/:link', isAuth, resolver( async(req, res) => {
    const process = new Processes(req.body, res.locals, req.params);
    const processObj = await process.findOneByParam({transfer_dir: req.params.link});
    const state =  new ProcessStates(req.body, res.locals, req.params);
    const states = await state.findByParam({process: processObj});
    let message = req.session.error || null; //mudar isso
    req.session.error = null;
    res.render('document_reader/filesInTransfer', {process: processObj, error: message, states: states});
}));

router.post('/search/meus/documents', isAuth, resolver( async(req, res) => {      
    let documents = await DocumentManipulator.readDir(`upload/${req.body.local}/${req.body.year}/${req.body.link}`);
    res.send(JSON.stringify(documents));
      
}));

router.post('/search/meus/process', isAuth, resolver(async(req, res) => {           
    const process = new Processes(req.body, res.locals, req.params);
    const processObj = await process.findOneByParam({transfer_dir: req.body.link});
    const state =  new ProcessStates(req.body, res.locals, req.params);
    const states = await state.findByParam({process: processObj});
    res.send(JSON.stringify({process: processObj, states: states}));
}));

router.post('/:year/:link/edit/:file', isAuth, resolver( async(req, res) => {           
    let fileExtension = req.params.file.split('.');
    fileExtension = fileExtension[fileExtension.length -1];
    await DocumentManipulator.rename(`upload/inTransfer/${req.params.year}/${req.params.link}/${req.params.file}`,
    `upload/inTransfer/${req.params.year}/${req.params.link}/${req.body.ename}.${fileExtension}`);
    res.redirect( 307, `/processosrecebidos/${req.params.year}/${req.params.link}`);   
}));

router.post('/:year/:link/delete/:file', isAuth, resolver( async(req, res) => {           
    await DocumentManipulator.removeDocument(`upload/inTransfer/${req.params.year}/${req.params.link}/${req.params.file}`);
    res.redirect(307, `/processosrecebidos/${req.params.year}/${req.params.link}`);   
}));

router.post('/:year/:link/:file', isAuth, resolver( async(req, res) =>{          
    let doc = await DocumentManipulator.readDocument(`upload/inTransfer/${req.params.year}/${req.params.link}/${req.params.file}`);
    res.end(doc);      
}));

router.post('/:year/:link/upload/:local/', isAuth, resolver( async(req, res, next) =>{
    await uploadAsync(req, res);                                      
    res.redirect(307, `/processosrecebidos/${req.params.year}/${req.params.link}`);          
}));

router.post('/:year/:link/anotation/:title', isAuth, resolver((req,res) => {                                         
    res.render('document_reader/anotation', {title: req.params.title, year: req.params.year, link: req.params.link, baseurl: req.baseUrl, elementid: req.body.elementid});               
}));

router.post('/:year/:link/anotation/:title/create', isAuth, resolver( async(req,res) => {
    const state =  new ProcessStates(req.body, res.locals, req.params);
    await state.create();
    res.redirect(307, `/processosrecebidos/${req.params.year}/${req.params.link}`);          
}));

router.post('/:year/:link/anotation/:title/delete', isAuth, resolver( async(req,res) => {
    const state =  new ProcessStates(req.body, res.locals, req.params);
    await state.deleteOne();
    res.redirect(307, `/processosrecebidos/${req.params.year}/${req.params.link}`);    
}));

module.exports= router;