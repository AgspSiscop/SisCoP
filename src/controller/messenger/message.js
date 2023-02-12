const express = require('express');
const isAuth = require('../../../config/isAuth');
const resolver =  require('../../../config/errorHandler');
const {DocumentManipulator} = require('../../models/messenger/DocumentManipulator');
const Msg = require('../../models/messenger/MessagesDB');
const MsgSent = require('../../models/messenger/MessageSentsDB');
const Processes = require('../../models/document_reader/ProcessesDB');
const ProcessStates = require('../../models/document_reader/ProcessesStatesDB');
const Users = require('../../models/profiles/UsersDB');

const router = express.Router();

router.get('/caixadeentrada:page', isAuth, resolver( async(req, res) => {   
    const message = new Msg(req.body, res.locals, req.params);    
    const messageObj = await message.findReceived(15); 
    res.render('messenger/messages', {messages: messageObj.messages, index: messageObj.index, count: messageObj.count});
}));

router.get('/enviadas:page', isAuth, resolver( async(req, res) => {   
    const message = new MsgSent(req.body, res.locals, req.params);
    const messageObj = await message.findSent(15);
    res.render('messenger/mymessages', {messages: messageObj.messages, index: messageObj.index, count: messageObj.count});
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
    const processObj = await process.findOneByParam({_id: req.body.process});    
    const processUpdate =  new Object();
    
    processUpdate.receiver =  req.body.user;
    processUpdate.section_receiver = null

    if(processObj.transfer_dir == null){
        await message.create();
        await messageSent.create();
        const transferDir = `${Date.now()}_${processObj.title}`;
        processUpdate.transfer_dir = transferDir;
        processUpdate.user_dir = null;
        await process.sendProcess(processUpdate);
        await DocumentManipulator.copy(`upload/inProcess/${processObj.year}/${processObj.user_dir}`, 
        `upload/inTransfer/${processObj.year}/${transferDir}`);
        await DocumentManipulator.removeProcess(`upload/inProcess/${processObj.year}/${processObj.user_dir}`);       
    }else{        
        await message.create();
        await messageSent.create();           
        await process.sendProcess(processUpdate);        
    }   
    await state.sendState();
    res.redirect('/mensageiro/enviadas000');
}));

router.post('/nova/section/:title', isAuth, resolver( async(req, res) => {
    /*console.log(req.params.title);
    console.log(req.body);
    res.send('oks')*/    
    const message = new Msg(req.body, res.locals, req.params);
    const messageSent = new MsgSent(req.body, res.locals, req.params);
    const process = new Processes(req.body, res.locals, req.params);
    const state = new ProcessStates(req.body, res.locals, req.params);    
    const processObj = await process.findOneByParam({_id: req.body.process});    
    const processUpdate =  new Object();
    
    processUpdate.receiver =  null;
    processUpdate.section_receiver = req.body.messagesection;

    if(processObj.transfer_dir == null){
        await message.create();
        await messageSent.create();
        const transferDir = `${Date.now()}_${processObj.title}`;
        processUpdate.transfer_dir = transferDir;
        processUpdate.user_dir = null;
        await process.sendProcess(processUpdate);
        await DocumentManipulator.copy(`upload/inProcess/${processObj.year}/${processObj.user_dir}`, 
        `upload/inTransfer/${processObj.year}/${transferDir}`);
        await DocumentManipulator.removeProcess(`upload/inProcess/${processObj.year}/${processObj.user_dir}`);       
    }else{        
        await message.create();
        await messageSent.create();           
        await process.sendProcess(processUpdate);        
    }   
    await state.sendState();
    res.redirect('/mensageiro/enviadas000');
}));

/*router.post('/nova/:title', isAuth, resolver( async(req, res) => {    
    const message = new Msg(req.body, res.locals, req.params);
    const messageSent = new MsgSent(req.body, res.locals, req.params);
    const process = new Processes(req.body, res.locals, req.params);
    const state = new ProcessStates(req.body, res.locals, req.params);
    const user = new Users(req.body, res.locals, req.params);
    const processObj = await process.findOneByParam({_id: req.body.process});
    const userProcess =  await user.findOneByParam({_id: processObj.user});
    const processUpdate =  new Object();

    processUpdate.section_receiver = req.body.messagesection || null;
    processUpdate.receiver =  req.body.user || null;

    if(processObj.transfer_dir == null){
        await message.create();
        await messageSent.create();
        const transferDir = `${Date.now()}_${processObj.title}`;
        processUpdate.transfer_dir = transferDir;
        processUpdate.user_dir = null;
        await process.sendProcess(processUpdate);
        await DocumentManipulator.copy(`upload/inProcess/${processObj.year}/${processObj.user_dir}`, 
        `upload/inTransfer/${processObj.year}/${transferDir}`);
        await DocumentManipulator.removeProcess(`upload/inProcess/${processObj.year}/${processObj.user_dir}`);       
    }else{
        if(userProcess.section === processUpdate.section_receiver || userProcess._id === processUpdate.receiver){
            const userDir = `${Date.now()}_${processObj.title}`;
            processUpdate.transfer_dir = null;
            processUpdate.section_receiver = null;
            processUpdate.receiver = null;
            processUpdate.user_dir = userDir;
            await message.createAlternative(userProcess._id);
            await messageSent.createAlternative(userProcess._id)
            await process.sendProcess(processUpdate);
            await DocumentManipulator.copy(`upload/inTransfer/${processObj.year}/${processObj.transfer_dir}`, 
            `upload/inProcess/${processObj.year}/${userDir}`);
            await DocumentManipulator.removeProcess(`upload/inTransfer/${processObj.year}/${processObj.transfer_dir}`);            
        }else{
            await message.create();
            await messageSent.create();           
            await process.sendProcess(processUpdate);
        }
    }   
    await state.sendState();
    res.redirect('/mensageiro/caixadeentrada000');    
}));*/

router.post('/novasemprocesso/user/:title', isAuth, resolver( async(req, res) => {    //******
    const message = new Msg(req.body, res.locals, req.params);
    const messageSent = new MsgSent(req.body, res.locals, req.params);
    await message.create();
    await messageSent.create();
    res.redirect('/mensageiro/enviadas000');
}));

router.post('/novasemprocesso/section/:title', isAuth, resolver( async(req, res) => {    //****** */
    const message = new Msg(req.body, res.locals, req.params);
    const messageSent = new MsgSent(req.body, res.locals, req.params);
    await message.create();
    await messageSent.create();
    res.redirect('/mensageiro/enviadas000');
}));

router.post('/processes', isAuth, resolver( async(req, res) =>{
    const process = new Processes(req.body, res.locals, req.params);
    const processObj = await process.findByParam({ $or: [
        {user: res.locals.id, year: req.body.year, receiver: null, section_receiver: null}, 
        {section_receiver: res.locals.section, year: req.body.year}, 
        {receiver: res.locals.id, year: req.body.year}
    ]});    
    res.send(JSON.stringify(processObj));         
}));

router.post('/message', isAuth, resolver( async(req, res) => {
    const message = new Msg(req.body, res.locals, req.params);    
    const messageObj = await message.findOneByParam({_id: req.params.id});
    res.send(JSON.stringify(messageObj));
}))

router.post('/users', isAuth, resolver( async(req, res) => {  //se alterar a forma de envio para usuários acrescentar o :section  e usar como parametro de busca     
    const users =  new Users(req.body, res.locals, req.params);
    const usersObj = await users.findByParam();
    res.send(JSON.stringify(usersObj));      
      
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

router.post('/caixadeentrada/search:page', isAuth, resolver( async(req, res) => {  
    const message = new Msg(req.body, res.locals, req.params);
    const messageObj = await message.findByFilter(15);
    res.send(JSON.stringify({messages: messageObj.messages, count: messageObj.count}));        
}));

router.post('/enviadas/search:page', isAuth, resolver( async(req, res) => {    
    const message = new MsgSent(req.body, res.locals, req.params);
    const messageObj = await message.findByFilter(15);
    res.send(JSON.stringify({messages: messageObj.messages, count: messageObj.count}));           
}));

router.post('/process', isAuth, resolver( async(req, res) => {
    const process =  new Processes(req.body, res.locals, req.params);
    const processObj = await process.findOneByParam({_id: req.body.process || null});      
    res.send(JSON.stringify(processObj));   
}));

module.exports = router;