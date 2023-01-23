const mongoose = require('mongoose');
const Schema =  mongoose.Schema;
const sectionsName =  require('../../../config/selectDatas');

const Message =  new Schema({
    sender: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'user',
        required: true
    },
    receiver: { 
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'user'        
    },
    section_receiver: {
        type: String
    }, 
    process: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'process'        
    },
    title: {
        type: String,
        required: true
    },
    process_title:{
        type: String,
        required: true
    },
    content: {
        type: String,
    },     
    date: {
        type: String,
        required: true            
    },
    visualized: {
        type: Boolean,
        default: false
    }    
});

const MessageModel = mongoose.model('message', Message);



class Msg {
    constructor(body, locals, params){
        this.body = body;
        this.locals = locals;
        this.params = params;
        this.erros = [];       
    }

    #checkUp(){
        for(let key in this.body){
            if(typeof(this.body[key]) !== 'string'){
                this.erros.push('Valor inválido!');
            }
        }
        console.log(this.body.section);

        /*if(!sectionsName.some(this.body.section)){
            this.erros.push('Valor inválido!')
        }*/

        if(this.erros.length > 0){
            throw new Error('Valor inválido!');
        }
    }

    async findReceived(numMessages){
        try {
            const messages = await MessageModel.find({$or: [{section_receiver: this.locals.section}, {receiver: this.locals.id}]})
            .sort({_id: -1}).limit(numMessages).skip((this.params.page * numMessages)).populate('sender').populate('process').lean();

            const number = await MessageModel.find({$or: [{section_receiver: this.locals.section}, {receiver: this.locals.id}]}).sort({date: -1}).count();

            return {messages: messages, index: this.params.page, count: number};            
        } catch (error) {
            throw new Error(error.message);           
        }
    }    

    async findOneReceived(){
        try {
            const message = await  MessageModel.findOne({_id: this.params.id}).populate('process').populate('sender').populate('receiver').lean(); 
            if(message.receiver){                
                if(message.receiver.name == this.locals.name){
                    return {message: message};
                }else{
                    return '';
                }
            }else{
                if(message.section_receiver == this.locals.section){
                    return {message: message};
                }else{
                    return '';
                }
            }
        } catch (error) {
            throw new Error(error.message);            
        }
    }

    async deleteOneReceived(){
        try {
            await MessageModel.deleteOne({_id: this.params.id});            
        } catch (error) {
            throw new Error(error.message);             
        }
    }
    
    async findByFilter(numMessages){
        try {
            let search1 =  new Object();
            let search2 = new Object();            
            search1.section_receiver = this.locals.section;
            search1[this.body.type] = new RegExp(`${this.body.search}`, 'i');
            search2.receiver = this.locals.id;
            search2[this.body.type] = new RegExp(`${this.body.search}`, 'i');
            
            const messages = await MessageModel.find({$or: [search1, search2]}).sort({_id: -1}).
            limit(numMessages).skip((this.params.page * numMessages)).populate('sender').populate('process').lean()
            const number = await MessageModel.find({$or: [search1, search2]}).sort({date: -1}).count();
            return {messages: messages, count: number};            
        } catch (error) {
            throw new Error(error.message);           
        }
    }

    async findOne(){
        try {            
            const message = await MessageModel.findOne({_id: this.body.elementid}).lean();
            return message;         
        } catch (error) {
            throw new Error(error);         
        }
    }

    async findOneByParam(param){
        try {
            const message = await MessageModel.findOne(param).lean();
            return message;
            
        } catch (error) {
            throw new Error(error);
        }        
    }

    async create(){
        try {
            let newMessage;
            if(this.body.user){
                newMessage = {            
                    sender: this.locals.user,
                    receiver: this.body.user,
                    process: this.body.process,
                    title: this.body.title,
                    process_title: this.params.title,            
                    content: this.body.content,
                    date: Intl.DateTimeFormat('pt-BR', { dateStyle: "full", timeStyle: "short" }).format(new Date()),            
                }
            }else{
                newMessage = {            
                    sender: this.locals.user,
                    section_receiver: this.body.messagesection,
                    process: this.body.process,
                    title: this.body.title,
                    process_title: this.params.title,            
                    content: this.body.content,
                    date: Intl.DateTimeFormat('pt-BR', { dateStyle: "full", timeStyle: "short" }).format(new Date()),            
                }
            }
    
           await new MessageModel(newMessage).save();            
        } catch (error) {
            throw new Error(error);            
        }
    }
}

module.exports = Msg