const express = require('express');
const isAuth =require('../../../config/isAuth');
const resolver =  require('../../../config/errorHandler');
const Processes =  require('../../models/document_reader/ProcessesDB');
const ProcessStates = require('../../models/document_reader/ProcessesStatesDB');
const Files =  require('../../models/document_reader/FilesDB');
const Sections = require('../../models/profiles/SectionsDB');
const Year =  require('../../models/document_reader/YearDB');
const Users = require('../../models/profiles/UsersDB');
const Msg = require('../../models/messenger/MessagesDB');
const MsgSent = require('../../models/messenger/MessageSentsDB');

const router = express.Router();

router.post('/allyears', isAuth, resolver( async(req, res) => {
    const year = new Year(req.body, res.locals, req.params);
    const allYears =  await year.findYears();
    res.send(JSON.stringify(allYears));
}));

router.post('/users', isAuth, resolver( async(req, res) => {       
    const users =  new Users(req.body, res.locals, req.params);
    const usersObj = await users.findByParam({_id: {$not: {$in: res.locals.id}}});
    res.send(JSON.stringify(usersObj));      
}));

router.post('/states', isAuth, resolver( async(req, res) => {
    const states = new ProcessStates(req.body, res.local, req.params);
    const stateValues = await states.findByParam({process: req.body.id});    
    res.send(JSON.stringify(stateValues));
}))

router.post('/message', isAuth, resolver( async(req, res) => {
    const message = new Msg(req.body, res.locals, req.params);    
    const messageObj = await message.findOneByParam({_id: req.params.id});
    res.send(JSON.stringify(messageObj));
}));

router.post('/processinmessage', isAuth, resolver( async(req, res) => {
    const process =  new Processes(req.body, res.locals, req.params);
    const processObj = await process.findOneByParam({$or: [
        {_id: req.body.process || null, receiver: res.locals.id},
        {_id: req.body.process || null, section_receiver: res.locals.sectionID}    
    ]});      
    res.send(JSON.stringify(processObj));  
}));

router.post('/processinmanager:page', resolver( async(req,res) => {    
    const process = new Processes(req.body, res.locals, req.params);  
    const sections = new Sections(req.body, res.locals, req.params);
    if(req.body.origin){
        const sectionObjId = await sections.findOneByParam({_id: req.body.origin}); 
        const processObj = await process.aggregateStates({origin: sectionObjId._id});
          
        res.send(JSON.stringify(processObj));
    }else{         
        const processObj = await process.aggregateAllStates();        
        res.send(JSON.stringify(processObj));
    }
  }));

router.post('/inbox/search:page', isAuth, resolver( async(req, res) => {  
    const message = new Msg(req.body, res.locals, req.params);
    const messageObj = await message.findByFilter(15);
    res.send(JSON.stringify({messages: messageObj.messages, count: messageObj.count}));        
}));

router.post('/sent/search:page', isAuth, resolver( async(req, res) => {    
    const message = new MsgSent(req.body, res.locals, req.params);
    const messageObj = await message.findByFilter(15);
    res.send(JSON.stringify({messages: messageObj.messages, count: messageObj.count}));           
}));

router.post('/manager/search:page', isAuth, resolver( async(req, res) =>{
    const process = new Processes(req.body, res.locals, req.params);
    const sections = new Sections(req.body, res.locals, req.params);
    
    if(req.body.origin !== 'Busca Geral'){
        const sectionObjId = await sections.findOneByParam({name: req.body.origin}); 
        const search = new Object();  
        search.origin = sectionObjId._id;
        search[req.body.type] = new RegExp(`${req.body.search}`, 'i');
        const processObj = await process.aggregateStates(search);
        res.send(JSON.stringify(processObj));
    }else{         
        const search = new Object();        
        search[req.body.type] = new RegExp(`${req.body.search}`, 'i');
        const processObj = await process.aggregateStates(search);
        res.send(JSON.stringify(processObj))

    }
  }));

router.post('/sections1', isAuth, resolver( async(req, res) => {
    const sections = new Sections(req.body, res.locals, req.params);
    const sectionsValues =  await sections.findByParam({level: 1});
    res.send(JSON.stringify(sectionsValues));
  }));

  router.post('/sections9', isAuth, resolver( async(req, res) => {
    const sections = new Sections(req.body, res.locals, req.params);
    const sectionsValues =  await sections.findByParam({level:{$not:{$in: 10}}});    
    res.send(JSON.stringify(sectionsValues));    
}));

router.post('/messageprocesses', isAuth, resolver( async(req, res) =>{
    const process = new Processes(req.body, res.locals, req.params);
    const processObj = await process.findByParam({ $or: [
        {user: res.locals.id, year: req.body.year, receiver: null, section_receiver: null}, 
        {section_receiver: res.locals.sectionID, year: req.body.year}, 
        {receiver: res.locals.id, year: req.body.year}
    ]});    
    res.send(JSON.stringify(processObj));         
}));

router.post('/myprocess', isAuth, resolver( async(req, res) => {
    const process = new Processes(req.body, res.locals, req.params);
    const processValues = await process.findByParam({user: res.locals.id, done: false, year: req.body.year});    
    res.send(JSON.stringify(processValues));
}));

router.post('/documents', isAuth, resolver( async(req, res) => {
    const files = new Files(req.body, res.locals, req.params);
    const filesValues = await files.findByParam({process: req.body.id});    
    res.send(JSON.stringify(filesValues));    
}));

router.post('/myprocess/process', isAuth, resolver( async(req, res) =>{
    const process = new Processes(req.body, res.locals, req.params);
    const processValues = await process.findOneByParam({_id: req.body.id, user: res.locals.user});
    const state =  new ProcessStates(req.body, res.locals, req.params);
    const states = await state.findByParam({process: processValues});     
    res.send(JSON.stringify({process: processValues, states: states, user: res.locals.id}));
}));

router.post('/processreceived', isAuth, resolver( async(req, res) => {    
    const process = new Processes(req.body, res.locals, req.params);
    const processValues = await process.findByParam({$or: [{receiver: res.locals.id, done: false, year: req.body.year}, {section_receiver: res.locals.sectionID, done: false, year: req.body.year}]});    
    res.send(JSON.stringify(processValues));
}));

router.post('/processreceived/process', isAuth, resolver( async(req, res) =>{
    const process = new Processes(req.body, res.locals, req.params);
    const processValues = await process.findOneByParam({$or: [{receiver: res.locals.id, _id: req.body.id}, {section_receiver: res.locals.sectionID, _id: req.body.id}]});
    const state =  new ProcessStates(req.body, res.locals, req.params);
    const states = await state.findByParam({process: processValues});     
    res.send(JSON.stringify({process: processValues, states: states, user: res.locals.id}));
}));

router.post('/processdone', isAuth, resolver( async(req, res) => {    
    const processes = new Processes(req.body, res.locals, req.params);
    if(res.locals.section === 'Chefe da SALC'){
        const processesObj = await processes.findByParam({done: true});
        res.send(JSON.stringify(processesObj));
    }    
}));

router.post('/processdone/process', isAuth, resolver(async(req, res) => {        
    const process = new Processes(req.body, res.locals, req.params);
    const processObj = await process.findOneByParam({_id: req.body.id});
    const state =  new ProcessStates(req.body, res.locals, req.params);
    const states = await state.findByParam({process: processObj});
    res.send(JSON.stringify({process: processObj, states: states}));
}));

module.exports = router;