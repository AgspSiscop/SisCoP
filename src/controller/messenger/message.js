const express = require('express');
const mongoose = require('mongoose');
require('../../models/profiles/Users');
require('../../models/document_reader/ProcessDB');
require('../../models/document_reader/ProcessStateDB');
require('../../models/messenger/MessageDB');
require('../../models/messenger/MessageSentDB');
const isAuth = require('../../../config/isAuth');
const resolver =  require('../../../config/errorHandler');
const Users =  mongoose.model('user');
const Process = mongoose.model('process');
const ProcessState =  mongoose.model('processstate');
const Message = mongoose.model('message');
const MessageSent = mongoose.model('messagesent');
const {DocumentManipulator} = require('../../models/messenger/DocumentManipulator');

const router = express.Router();

router.get('/caixadeentrada:page', isAuth, resolver((req, res) => {                               
    Message.find({$or: [{section_receiver: res.locals.section}, {receiver: res.locals.id}]}).sort({_id: -1}).limit(15).skip((req.params.page * 15)).populate('sender').populate('process').lean().then((messages) => {
        Message.find({$or: [{section_receiver: res.locals.section}, {receiver: res.locals.id}]}).sort({date: -1}).count().then((number) => {
            res.render('messenger/message', {messages: messages, index: req.params.page, count: number});                    
        }).catch((error) => {
            console.log(error);
            res.render('error/error', {serverError: {message: error.message, code: error.code}});
        });            
    }).catch((error) => {
        console.log(error);
        res.render('error/error', {serverError: {message: error.message, code: error.code}});
    });    
}));

router.get('/enviadas:page', isAuth, resolver((req, res) => {         
    MessageSent.find({sender: res.locals.user}).populate('process').populate('receiver').sort({_id: -1}).limit(15).skip((req.params.page * 15)).lean().then((messages) => {
        MessageSent.find({sender: res.locals.user}).count().then((number) => {
            res.render('messenger/mymessages', {messages: messages, index: req.params.page, count: number});
        }).catch((error) => {
            console.log(error);
            res.render('error/error', {serverError: {message: error.message, code: error.code}})
        });
    }).catch((error) => {
        console.log(error);
        res.render('error/error', {serverError: {message: error.message, code: error.code}})
    });
}));

router.get('/nova', isAuth, resolver((req, res) =>{    
    res.render('messenger/newmessage');    
}));

router.post('/nova', isAuth, resolver((req, res) => {    
    res.render('messenger/processnewmessage', {processYear: req.body.year, processTitle: req.body.title, processId: req.body.id});    
}));

router.post('/nova/:title', isAuth, resolver((req, res) => {           
    let newMessage;
    if(req.body.user){
        newMessage = {            
            sender: res.locals.user,
            receiver: req.body.user,
            process: req.body.process,
            title: req.body.title,
            process_title: req.params.title,            
            content: req.body.content,
            date: Intl.DateTimeFormat('pt-BR', { dateStyle: "full", timeStyle: "short" }).format(new Date()),            
        }
    }else{
        newMessage = {            
            sender: res.locals.user,
            section_receiver: req.body.messagesection,
            process: req.body.process,
            title: req.body.title,
            process_title: req.params.title,            
            content: req.body.content,
            date: Intl.DateTimeFormat('pt-BR', { dateStyle: "full", timeStyle: "short" }).format(new Date()),            
        }
    }

    Message(newMessage).save().then(() => {
        MessageSent(newMessage).save().then().catch((error) => {console.log(error); res.send('Erro: ' + error)});
        Process.findOne({_id: req.body.process}).lean().then((process) => {
            const processUpdate =  new Object();                    
            processUpdate.section_receiver = req.body.messagesection || null
            processUpdate.receiver =  req.body.user || null

            if(process.transfer_dir == null){
                const transferDir = `${Date.now()}_${process.title}`;
                processUpdate.transfer_dir = transferDir

                Process.updateOne({_id: process._id}, {$set: processUpdate}).lean().then(() => {                                          
                    DocumentManipulator.copy(`upload/inProcess/${process.year}/${process.user_dir}`, `upload/inTransfer/${process.year}/${transferDir}`);                    
                }).catch((error) => {
                    console.log(error);
                    res.render('error/error', {serverError: {message: error.message, code: error.code}})
                });
            }else{
                Process.updateOne({_id: process._id}, {$set: processUpdate}).lean().then(() => {                                             
                }).catch((error) => {
                    console.log(error);
                    res.render('error/error', {serverError: {message: error.message, code: error.code}});
                });
            }               
        }).catch((error) => {
            console.log(error);
            res.render('error/error', {serverError: {message: error.message, code: error.code}})
        });
        let newState
        if(req.body.user){
            newState = {
                process: req.body.process,
                state: 'Em transferência',
                anotation: `Destinado à/ao ${req.body.username}`,
                date: Intl.DateTimeFormat('pt-BR', { dateStyle: "full", timeStyle: "short" }).format(new Date())
            }
        }else{
            newState = {
                process: req.body.process,
                state: 'Em transferência',
                anotation: `Destinado à/ao ${req.body.messagesection}`,
                date: Intl.DateTimeFormat('pt-BR', { dateStyle: "full", timeStyle: "short" }).format(new Date())
            }
        }

        ProcessState(newState).save().then(()=>{}).catch((error) => {
            console.log(error);
            res.render('error/error', {serverError: {message: error.message, code: error.code}});
        });

        res.redirect('/mensageiro/caixadeentrada000');

    }).catch((error) => {
        console.log(error);
        res.render('error/error', {serverError: {message: error.message, code: error.code}});
    });  
}));

router.post('/novasemprocesso/:title', isAuth, resolver((req, res) => {        
    let newMessage;
    if(req.body.user){
        newMessage = {            
            sender: res.locals.user,
            receiver: req.body.user,
            process: req.body.process,
            title: req.body.title,
            process_title: req.params.title,            
            content: req.body.content,
            date: Intl.DateTimeFormat('pt-BR', { dateStyle: "full", timeStyle: "short" }).format(new Date()),            
        }
    }else{
        newMessage = {            
            sender: res.locals.user,
            section_receiver: req.body.messagesection,
            process: req.body.process,
            title: req.body.title,
            process_title: req.params.title,            
            content: req.body.content,
            date: Intl.DateTimeFormat('pt-BR', { dateStyle: "full", timeStyle: "short" }).format(new Date()),            
        }
    }
    Message(newMessage).save().then(() => {
        MessageSent(newMessage).save().then().catch((error) => {console.log(error); res.send('Erro: ' + error)});           
        res.redirect('/mensageiro/caixadeentrada000')
    }).catch((error) => {
        console.log(error);
        res.render('error/error', {serverError: {message: error.message, code: error.code}});
    });   

}));

router.post('/processes', isAuth, resolver((req, res) =>{            
    Process.find({ $or: [{user: res.locals.id, year: req.body.year, receiver: null, section_receiver: null}, {section_receiver: res.locals.section, year: req.body.year}, {receiver: res.locals.id, year: req.body.year}]}).lean().then((process) => {        
        res.send(JSON.stringify(process))
    }).catch((error) => {
        console.log(error);
        res.render('error/error', {serverError: {message: error.message, code: error.code}});
    });
               
        
}));

router.post('/users', isAuth, resolver((req, res) => {  //se alterar a forma de envio para usuários acrescentar o :section  e usar como parametro de busca    
    if(res.locals.section == 'Chefe da SALC'){
        Users.find({section: 'SALC'}).lean().then((users) => {
            res.send(JSON.stringify(users));
        }).catch((error) => {
            console.log(error);
            res.render('error/error', {serverError: {message: error.message, code: error.code}});
        })
    }        
    
}));

router.get('/caixadeentrada/:id', isAuth, resolver((req, res) => { // mudar para post          
    Message.findOne({_id: req.params.id}).populate('sender').populate('process').lean().then((message) => {        
        res.render('messenger/messagereader', {message: message})
    }).catch((error) => {
        console.log(error);
        res.render('error/error', {serverError: {message: error.message, code: error.code}});
    });
    
}));
router.get('/enviadas/:id', isAuth, resolver((req, res) => {            
    MessageSent.findOne({_id: req.params.id}).populate('process').populate('receiver').lean().then((message) => {        
        res.render('messenger/mymessagereader', {message: message})
    }).catch((error) => {
        console.log(error);
        res.send('Erro: ' + error);
    });
    
}));

router.post('/caixadeentrada/:id/delete', isAuth, resolver((req, res) => {            
    Message.deleteOne({_id: req.params.id}).then(() => {
        res.redirect('/mensageiro/caixadeentrada000');
    }).catch((error) => {
        console.log(error);
        res.render('error/error', {serverError: {message: error.message, code: error.code}});
    });      
}));

router.post('/enviadas/:id/delete', isAuth, resolver((req, res) => {            
    MessageSent.deleteOne({_id: req.params.id}).then(() => {
        res.redirect('/mensageiro/enviadas000');
    }).catch((error) => {
        console.log(error);
        res.render('error/error', {serverError: {message: error.message, code: error.code}});
    });       
}));

router.get('/teste', isAuth, resolver((req, res) => {    
    res.render('messenger/mymessagesbox');   
}));

router.post('/caixadeentrada/search:page', isAuth, resolver((req, res) => {           
    let search1 =  new Object();
    let search2 = new Object();            
    search1.section_receiver = res.locals.section;
    search1[req.body.type] = new RegExp(`${req.body.search}`, 'i');
    search2.receiver = res.locals.id;
    search2[req.body.type] = new RegExp(`${req.body.search}`, 'i');
    console.log(search1)
    Message.find({$or: [search1, search2]}).sort({_id: -1}).limit(15).skip((req.params.page* 15)).populate('sender').populate('process').lean().then((messages) => {
        Message.find({$or: [search1, search2]}).sort({date: -1}).count().then((number) => {
            res.send(JSON.stringify({messages: messages, count: number}));                    
        }).catch((error) => {
            console.log(error);
            res.render('error/error', {serverError: {message: error.message, code: error.code}});
        });           
    }).catch((error) => {
        console.log(error);
        res.render('error/error', {serverError: {message: error.message, code: error.code}});
    });       
}));

router.post('/enviadas/search:page', isAuth, resolver((req, res) => {           
    let search1 =  new Object();           
    search1.sender = res.locals.id;
    search1[req.body.type] = new RegExp(`${req.body.search}`, 'i');

    MessageSent.find(search1).sort({_id: -1}).limit(15).skip((req.params.page* 15)).populate('sender').populate('process').lean().then((messages) => {
        MessageSent.find(search1).sort({date: -1}).count().then((number) => {
            res.send(JSON.stringify({messages: messages, count: number}));                    
        }).catch((error) => {
            console.log(error);
            res.render('error/error', {serverError: {message: error.message, code: error.code}});
        });           
    }).catch((error) => {
        console.log(error);
        res.render('error/error', {serverError: {message: error.message, code: error.code}});
    });        
}));

router.post('/process', isAuth, resolver((req, res) => {           
    Process.findOne({$or: [{_id: req.body.process, receiver: res.locals.user }, {_id: req.body.process, section_receiver: res.locals.section }]}).lean().then((process) => {
        res.send(JSON.stringify(process));
    }).catch((error) => {
        console.log(error);
        res.render('error/error', {serverError: {message: error.message, code: error.code}});
    });
}));


module.exports = router;