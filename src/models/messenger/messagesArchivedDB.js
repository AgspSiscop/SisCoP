const mongoose = require('mongoose');
const Schema =  mongoose.Schema;

const MessageArchived =  new Schema({
    sender: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'user',
        required: true
    },
    receiver: { 
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'user'        
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
        type: Boolean        
    },
    createdAt: {
        type: Date,
        default: Date.now
    }      
});

const MessageModel = mongoose.model('messagearchived', MessageArchived);



class Archived {
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

        if(this.erros.length > 0){
            throw new Error('Valor inválido!');
        }
    }

    async find(numMessages){
        try {
            const messages = await MessageModel.find({receiver: this.locals.id})
            .sort({createdAt: -1}).limit(numMessages).skip((this.params.page * numMessages)).populate('sender').populate('process').lean();

            const number = await MessageModel.find({receiver: this.locals.id}).sort({createdAt: -1}).count();

            return {messages: messages, index: this.params.page, count: number};            
        } catch (error) {
            throw new Error(error.message);           
        }
    }    

    async findOne(){
        try {                   
            const message = await  MessageModel.findOne({_id: this.params.id}).populate('process').populate('sender').populate('receiver').lean();                                      
            if(message.receiver.name == this.locals.name){
                return {message: message};
            }else{
                return '';
            }            
        } catch (error) {
            throw new Error(error.message);            
        }
    }

    async deleteOne(){
        try {
            await MessageModel.deleteOne({_id: this.params.id});            
        } catch (error) {
            throw new Error(error.message);             
        }
    }
    
    async findByFilter(numMessages){
        try {            
            let search = new Object();            
            search.receiver = this.locals.id;
            search[this.body.type] = new RegExp(`${this.body.search}`, 'i');
            
            const messages = await MessageModel.find(search).sort({createdAt: -1}).
            limit(numMessages).skip((this.params.page * numMessages)).populate('sender').populate('process').lean()
            const number = await MessageModel.find(search).sort({createdAt: -1}).count();
            return {messages: messages, count: number};            
        } catch (error) {
            throw new Error(error.message);           
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

    async create(newMessage){
        try {
            await new MessageModel(newMessage).save()
        } catch (error) {
            throw new Error(error);  
        }
    }    
}

module.exports = Archived