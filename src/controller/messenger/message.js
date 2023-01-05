const { json } = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const fs = require('fs');
require('../../models/profiles/Users');
require('../../models/document_reader/ProcessDB');
require('../../models/document_reader/ProcessStateDB');
require('../../models/messenger/MessageDB');
require('../../models/messenger/MessageSentDB');
const Users =  mongoose.model('user');
const Process = mongoose.model('process');
const ProcessState =  mongoose.model('processstate');
const Message = mongoose.model('message');
const MessageSent = mongoose.model('messagesent');
const {DocumentManipulator, uploadFile} = require('../../models/messenger/DocumentManipulator');

const router = express.Router();

router.get('/caixadeentrada:page', (req, res) => {
    try {
        if(res.locals.user){          
            Message.find({$or: [{section_receiver: res.locals.section}, {receiver: res.locals.id}]}).sort({_id: -1}).limit(15).skip((req.params.page * 15)).populate('sender').populate('process').lean().then((messages) => {
                Message.find({$or: [{section_receiver: res.locals.section}, {receiver: res.locals.id}]}).sort({date: -1}).count().then((number) => {
                    res.render('messenger/message', {messages: messages, index: req.params.page, count: number});                    
                }).catch((error) => {
                    console.log(error)
                    res.send('Error: ' + error)
                });            
            }).catch((error) => {
                console.log(error)
                res.send('Error: ' + error)
            })
        }else{
            res.redirect('/');
        }     
    } catch (error) {
        console.log(error);
        res.send('Erro: ' + error);        
    }    
});

router.get('/enviadas:page', (req, res) => {
    try {        
        if(res.locals.user){
            MessageSent.find({sender: res.locals.user}).populate('process').sort({_id: -1}).limit(15).skip((req.params.page * 15)).lean().then((messages) => {
                MessageSent.find({sender: res.locals.user}).count().then((number) => {
                    res.render('messenger/mymessages', {messages: messages, index: req.params.page, count: number});
                }).catch((error) => {
                    console.log(error);
                    res.send('Erro: ' + error);
                });
            }).catch((error) => {
                console.log(error);
                res.send('Erro: ' + error);
            });
        }else{
            res.redirect('/');
        }
    } catch (error) {
        console.log(error);
        res.send('Erro: ' + error);        
    }
});

router.get('/nova', (req, res) =>{   
    res.render('messenger/newmessage');
});

router.post('/nova', (req, res) => {
    res.render('messenger/processnewmessage', {processYear: req.body.year, processTitle: req.body.title, processId: req.body.id});
});

router.post('/nova/:title', (req, res) => {
    try {
        if(res.locals.user){
            const newMessage = {            
                sender: res.locals.user,
                section_receiver: req.body.messagesection,
                process: req.body.process,
                title: req.body.title,
                process_title: req.params.title,            
                content: req.body.content,
                date: Intl.DateTimeFormat('pt-BR', { dateStyle: "full", timeStyle: "short" }).format(new Date()),            
            }
    
            Message(newMessage).save().then(() => {
                MessageSent(newMessage).save().then().catch((error) => {console.log(error); res.send('Erro: ' + error)});
                Process.findOne({_id: req.body.process}).lean().then((process) => {
                    if(process.transfer_dir == null){
                        const transferDir = `${Date.now()}_${process.title}`
                        Process.updateOne({_id: process._id}, {$set: {section_receiver: req.body.messagesection, transfer_dir: transferDir}}).lean().then(() => {                                          
                            DocumentManipulator.copy(`upload/inProcess/${process.year}/${process.user_dir}`, `upload/inTransfer/${process.year}/${transferDir}`);                    
                        }).catch((error) => {
                            console.log(error);
                            res.send('Erro: '+ error);
                        });
                    }else{
                        Process.updateOne({_id: process._id}, {$set: {section_receiver: req.body.messagesection}}).lean().then(() => {                                             
                        }).catch((error) => {
                            console.log(error);
                            res.send('Erro: '+ error);
                        });
                    }               
                }).catch((error) => {
                    console.log(error)
                    res.send('Erro: ' + error)
                });
                const newState = {
                    process: req.body.process,
                    state: 'Em transferência',
                    anotation: `Destinado à/ao ${req.body.messagesection}`,
                    date: Intl.DateTimeFormat('pt-BR', { dateStyle: "full", timeStyle: "short" }).format(new Date())
                }
    
                ProcessState(newState).save().then(()=>{}).catch((error) => {
                    console.log(error);
                    res.send('Erro: '+ error)
                });

                res.redirect('/mensageiro/caixadeentrada000');

            }).catch((error) => {
                console.log(error)
                res.send('Erro: ' + error)
            });

        }else{
            res.redirect('/');
        }        
    } catch (error) {
        console.log(error);      
        res.send('Erro: ' + error);
    }    
});

router.post('/novasemprocesso/:title', (req, res) =>{
    try {
        if(res.locals.user){
            const newMessage = {            
                sender: res.locals.user,
                section_receiver: req.body.messagesection,
                process: null,
                title: req.body.title,
                process_title: req.params.title,            
                content: req.body.content,
                date: Intl.DateTimeFormat('pt-BR', { dateStyle: "full", timeStyle: "short" }).format(new Date()),            
            }
            Message(newMessage).save().then(() => {
                MessageSent(newMessage).save().then().catch((error) => {console.log(error); res.send('Erro: ' + error)});           
                res.redirect('/mensageiro/caixadeentrada000')
            }).catch((error) => {
                console.log(error)
                res.send('Erro: ' + error)
            });

        }else{
            res.redirect('/');
        }        
    } catch (error) {
        console.log(error);      
        res.send('Erro: ' + error);
    }    

});

router.post('/processes', (req, res) =>{
    try {
        if(res.locals.user){
            Process.find({ $or: [{user: res.locals.id, year: req.body.year, receiver: null, section_receiver: null}, {section_receiver: res.locals.section, year: req.body.year}, {receiver: res.locals.id, year: req.body.year}]}).lean().then((process) => {        
                res.send(JSON.stringify(process))
            });
        }else{
            res.send('');
        }        
    } catch (error) {
        console.log(error);
        res.send('ERRO')        
    }    
});

/*router.post('/nova', (req, res) =>{
    DocumentManipulator.copy(`upload/inProcess/2022/10_ADM_Jorge Luiz_Aquisição de Rádio`, `upload/2022/teste`); 
    res.send('ok')
});*/

router.get('/caixadeentrada/:id', (req, res) => { // mudar para post
    try {
        if(res.locals.user){
            Message.findOne({_id: req.params.id}).populate('sender').populate('process').lean().then((message) => {        
                res.render('messenger/messagereader', {message: message})
            }).catch((error) => {
                console.log(error);
                res.send('Erro: ' + error);
            });

        }else{
            res.redirect('/');
        }        
    } catch (error) {
        console.log(error);
        req.send('Erro: ' + error);    
    }
});
router.get('/enviadas/:id', (req, res) => {
    try {
        if(res.locals.user){
            MessageSent.findOne({_id: req.params.id}).populate('process').lean().then((message) => {        
                res.render('messenger/mymessagereader', {message: message})
            }).catch((error) => {
                console.log(error);
                res.send('Erro: ' + error);
            });
        }else{
            res.redirect('/');
        }
    } catch (error) {
        console.log(error);
        req.send('Erro: ' + error);    
    }
});

router.post('/caixadeentrada/:id/delete', (req, res) => {
    try {
        if(res.locals.user){
            Message.deleteOne({_id: req.params.id}).then(() => {
                res.redirect('/mensageiro/caixadeentrada000');
            }).catch((error) => {
                console.log(error);
                res.send('Erro: ' + error);
            });
        }else{
            res.redirect('/');
        }        
    } catch (error) {
        console.log(error);
        res.send('Erro: ' + error);
    }    
});

router.post('/enviadas/:id/delete', (req, res) => {
    try {
        if(res.locals.user){
            MessageSent.deleteOne({_id: req.params.id}).then(() => {
                res.redirect('/mensageiro/enviadas000');
            }).catch((error) => {
                console.log(error);
                res.send('Erro: ' + error);
            });
        }else{
            res.redirect('/');
        }        
    } catch (error) {
        console.log(error);
        res.send('Erro: ' + error);        
    }    
});

router.get('/teste', (req, res) => {
    res.render('messenger/mymessagesbox')
});

router.post('/caixadeentrada/search:page', (req, res) => {
    try {
        if(res.locals.user){
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
                    res.send('Error: ' + error);
                });           
            }).catch((error) => {
                console.log(error)
                res.send('Error: ' + error);
            })
        }else{
            res.redirect('/');
        }     
    } catch (error) {
        console.log(error);
        res.send('Erro: ' + error);        
    }    
});

router.post('/enviadas/search:page', (req, res) => {
    try {
        if(res.locals.user){
            let search1 =  new Object();           
            search1.sender = res.locals.id;
            search1[req.body.type] = new RegExp(`${req.body.search}`, 'i');

            MessageSent.find(search1).sort({_id: -1}).limit(15).skip((req.params.page* 15)).populate('sender').populate('process').lean().then((messages) => {
                MessageSent.find(search1).sort({date: -1}).count().then((number) => {
                    res.send(JSON.stringify({messages: messages, count: number}));                    
                }).catch((error) => {
                    console.log(error);
                    res.send('Error: ' + error);
                });           
            }).catch((error) => {
                console.log(error)
                res.send('Error: ' + error);
            })
        }else{
            res.redirect('/');
        }     
    } catch (error) {
        console.log(error);
        res.send('Erro: ' + error);        
    }    
});


module.exports = router;