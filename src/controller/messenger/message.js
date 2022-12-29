const { json } = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const fs = require('fs');
require('../../models/profiles/Users');
require('../../models/document_reader/ProcessDB');
require('../../models/document_reader/ProcessStateDB');
require('../../models/messenger/messageDB');
const Users =  mongoose.model('user');
const Process = mongoose.model('process');
const ProcessState =  mongoose.model('processstate');
const Message = mongoose.model('message');
const {DocumentManipulator, uploadFile} = require('../../models/messenger/DocumentManipulator')

const router = express.Router();

router.get('/', (req, res) => {
    try {
        Message.find({$or: [{section_receiver: res.locals.section}, {receiver: res.locals.id}]}).populate('sender').populate('process').lean().then((messages) => {
                
            res.render('messenger/message', {messages: messages});
        }).catch((error) => {
            console.log(error)
            res.send('Error: ' + error)
        })        
    } catch (error) {
        console.log(error);
        res.send('Erro: ' + error);        
    }    
});

router.get('/nova', (req, res) =>{   
    res.render('messenger/newmessage')
});

router.post('/nova/', (req, res) => {
    res.render('messenger/processnewmessage', {processYear: req.body.year, processTitle: req.body.title, processId: req.body.id});
});

router.post('/nova/:title', (req, res) => {  
    try {
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
            Process.findOne({_id: req.body.process}).lean().then((process) => {                
                Process.updateOne({_id: process._id}, {$set: {section_receiver: req.body.messagesection}}).lean().then(() => {
                    DocumentManipulator.copy(`upload/inProcess/${process.year}/${process.dir}`, `upload/inTransfer/${process.year}/${process.dir}`);                    
                }).catch((error) => {
                    console.log(error);
                    res.send('Erro: '+ error);
                });
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
            res.redirect('/')
        }).catch((error) => {
            res.send('Erro: ' + error)
        })
        
    } catch (error) {
        
    }    
});

router.post('/teste', (req, res) =>{
    Process.find({ or: [{user: res.locals.id, year: req.body.year}, {section_receiver: res.locals.section, year: req.body.year}, {receiver: res.locals.id, year: req.body.year}]}).lean().then((process) => {        
        res.send(JSON.stringify(process))
    })
});

router.post('/nova', (req, res) =>{
    DocumentManipulator.copy(`upload/inProcess/2022/10_ADM_Jorge Luiz_Aquisição de Rádio`, `upload/2022/teste`); 
    res.send('ok')
});

router.get('/mensagem/:id', (req, res) => { // mudar para post
    try {
        Message.findOne({_id: req.params.id}).populate('sender').populate('process').lean().then((message) => {        
            res.render('messenger/messagereader', {message: message})
        }).catch((error) => {
            console.log(error);
            res.send('Erro: ' + error);
        });
        
    } catch (error) {
        console.log(error);
        req.send('Erro: ' + error);    
    }
});

router.post('/mensagem/:id/delete', (req, res) => {
    Message.deleteOne({_id: req.params.id}).then(() => {
        res.redirect('/');
    }).catch((error) => {
        console.log(error);
        res.send('Erro: ' + error);
    });
})




module.exports = router;