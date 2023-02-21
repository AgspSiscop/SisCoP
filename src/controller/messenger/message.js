const express = require('express');
const isAuth = require('../../../config/isAuth');
const resolver =  require('../../../config/errorHandler');
const Msg = require('../../models/messenger/MessagesDB');
const MsgSent = require('../../models/messenger/MessageSentsDB');
const Processes = require('../../models/document_reader/ProcessesDB');
const ProcessStates = require('../../models/document_reader/ProcessesStatesDB');
const Users = require('../../models/profiles/UsersDB');
const Sections = require('../../models/profiles/SectionsDB');

const router = express.Router();

router.get('/caixadeentrada', isAuth, resolver( async(req, res) => {  
    
    res.render('messenger/messages', );
}));

router.get('/enviadas', isAuth, resolver( async(req, res) => {      
    res.render('messenger/mymessages', );
}));

router.get('/nova', isAuth, resolver((req, res) =>{    
    res.render('messenger/newmessage');    
}));

router.post('/nova', isAuth, resolver((req, res) => {    
    res.render('messenger/processnewmessage', {processYear: req.body.year, processTitle: req.body.title, processId: req.body.id});    
}));

router.post('/nova/user/:title', isAuth, resolver( async(req, res) => { 
    const message = new Msg(req.body, res.locals, req.params);
    const messageSent = new MsgSent(req.body, res.locals, req.params);
    const process = new Processes(req.body, res.locals, req.params);
    const state = new ProcessStates(req.body, res.locals, req.params);    
    const processUpdate =  new Object();
    
    processUpdate.receiver =  req.body.user;
    processUpdate.section_receiver = null
    processUpdate.user = null
    await message.create();
    await messageSent.create();
    await process.sendProcess(processUpdate);      
    await state.sendState();
    res.redirect('/mensageiro/enviadas000');
}));

router.post('/nova/section/:title', isAuth, resolver( async(req, res) => {     
    const users = new Users(req.body, res.locals, req.params);
    const message = new Msg(req.body, res.locals, req.params);
    const messageSent = new MsgSent(req.body, res.locals, req.params);
    const process = new Processes(req.body, res.locals, req.params);    
    const sections = new Sections(req.body, res.locals, req.params);      
    const sectionsValue = await sections.findOneByParam({_id: req.body.messagesection});
    const usersValues = await users.findByParam({section: req.body.messagesection});    
    const processUpdate =  new Object();
    
    processUpdate.receiver =  null;
    processUpdate.section_receiver = req.body.messagesection; 
    processUpdate.user = null
    await message.createAlternative(usersValues);
    await messageSent.create();
    await process.sendProcess(processUpdate);

    req.body.messagesection = sectionsValue.name;
    const state = new ProcessStates(req.body, res.locals, req.params);
    await state.sendState();
    res.redirect('/mensageiro/enviadas000');    
}));

router.post('/novasemprocesso/user/:title', isAuth, resolver( async(req, res) => {  
    const message = new Msg(req.body, res.locals, req.params);
    const messageSent = new MsgSent(req.body, res.locals, req.params);
    await message.create();
    await messageSent.create();
    res.redirect('/mensageiro/enviadas000');
}));

router.post('/novasemprocesso/section/:title', isAuth, resolver( async(req, res) => {
    const users = new Users(req.body, res.locals, req.params);
    const message = new Msg(req.body, res.locals, req.params);
    const messageSent = new MsgSent(req.body, res.locals, req.params);
    const usersValues = await users.findByParam({section: req.body.messagesection});
    await message.createAlternative(usersValues);
    await messageSent.create();
    res.redirect('/mensageiro/enviadas000');
}));

router.get('/caixadeentrada/:id', isAuth, resolver( async(req, res) => {   
    const message = new Msg(req.body, res.locals, req.params);
    const messageObj = await message.findOneReceived();
    res.render('messenger/messagereader', {message: messageObj.message});  
}));

router.get('/enviadas/:id', isAuth, resolver( async(req, res) => {   
    const message = new MsgSent(req.body, res.locals, req.params);
    const messageObj = await message.findOneSent();    
    res.render('messenger/mymessagereader', {message: messageObj.message});    
}));

router.post('/caixadeentrada/:id/delete', isAuth, resolver( async(req, res) => {   
    const message = new Msg(req.body, res.locals, req.params);
    await message.deleteOneReceived();
    res.redirect('/mensageiro/caixadeentrada000');
}));

router.post('/enviadas/:id/delete', isAuth, resolver( async(req, res) => {    
    const message = new MsgSent(req.body, res.locals, req.params);
    await message.deleteOneSent();
    res.redirect('/mensageiro/enviadas000');      
}));

router.get('/teste', isAuth, resolver((req, res) => {    
    res.render('messenger/mymessagesbox');   
}));

module.exports = router;