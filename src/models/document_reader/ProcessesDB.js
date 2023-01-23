const mongoose = require('mongoose');
const Schema =  mongoose.Schema;
const {DocumentManipulator} = require('./DocumentManipulator');

const Process =  new Schema({
    user: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'user',        
    },
    receiver:{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'user'
    },
    section_receiver: {
        type: String,
    },
    done:{
        type: Boolean,
        default: false     
    },    
    origin:{
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    nup: {
        type: String,
    },
    category: {
        type: String
    },
    description: {
        type: String
    },
    user_dir:{
        type:  String,
        required: true        
    },
    transfer_dir:{
        type: String        
    },
    done_dir:{
        type: String        
    },
    date: {
        type: String,
        required: true            
    },
    year: {
        type: String,
        required: true
    }    
});

const ProcessModel = mongoose.model('process', Process);

class Processes {
    constructor(body, locals, params){
        this.body = body;
        this.locals = locals;
        this.params = params;
        this.erros = [];       
    }

    checkUp(){

    }

    async create(){
        try {
            const process = {
                user: this.locals.user,
                receiver: null,
                section_receiver: null,
                origin: this.body.origin,           
                title: this.body.object,
                category: this.body.category,
                user_dir: `${Date.now() + '_' + this.body.object}`,
                transfer_dir: null,
                done_dir: null,
                description: this.body.description,
                date: Intl.DateTimeFormat('pt-BR', { dateStyle: "full", timeStyle: "short" }).format(new Date()),
                year: (new Date).getFullYear().toString()
            };
            
            await new ProcessModel(process).save();        
            //await DocumentManipulator.makeDir(`upload/inProcess/${(new Date).getFullYear()}/${process.user_dir}`);
            return process;            
            //res.redirect(307, `/meusprocessos/${(new Date).getFullYear()}/${process.user_dir}`)            
        } catch (error) {            
            if(error.code == 11000){
                throw new Error('Este processo já existe!');                          
            }else{
               throw new Error(`${error} Por Favor Comunique ao Administrador do Sistema.`)
            }  
        }
    }

    async findByFilter(){
        try {
            const process = await ProcessModel.find({user: this.locals.id}).where({year: this.params.year}).lean()
            return process;                       
        } catch (error) {
            throw new Error(error);            
        }        
    }

    async findByParam(param){
        try {
            const process = await ProcessModel.find(param).lean()
            return process;                       
        } catch (error) {
            throw new Error(error);            
        }
    }

    async findOne(){
        try {            
            const process = await ProcessModel.findOne({_id: this.body.elementid}).lean();
            return process;         
        } catch (error) {
            throw new Error(error);         
        }
    }

    async findOneByParam(param){
        try {
            const process = await ProcessModel.findOne(param).lean();
            return process;           
        } catch (error) {
            throw new Error(error);         
        }
    }   

    async updateOne(){
        try {
            await ProcessModel.updateOne({user_dir: this.params.link}, 
                {$set: {
                    title: this.body.object, 
                    user_dir: `${this.params.link.split('_')[0]}_${this.body.object}`, 
                    category: this.body.category, 
                    origin: this.body.origin, 
                    description: this.body.description
                }}).lean();            
        } catch (error) {
            throw new Error(error);            
        }
    }

    async deleteOne(){
        try {
            await ProcessModel.deleteOne({_id: this.body.elementid});            
        } catch (error) {
            throw new Error(error);            
        }
    }

    async deleteUser(){
        try {
            await ProcessModel.updateOne({_id: this.body.elementid}, {$set: {user: null, user_dir: null}});            
        } catch (error) {
            throw new Error(error);            
        }
    }

    async deleteInTransfer(){
        try {
            await ProcessModel.updateOne({_id: this.body.elementid}, {$set: {section_receiver: null , receiver: null, transfer_dir: null}});            
        } catch (error) {
            throw new Error(error);            
        }
    }

    async aggregateStates(param){
        try {
            const processes = await ProcessModel.aggregate([
                {
                  $match: param      
                },
                {
                  $lookup: {
                    from: 'processstates',
                    localField: '_id',
                    foreignField: 'process',            
                    as: 'status'             
                  },                    
                },
              ]).sort({_id: -1})
    
              return processes;            
        } catch (error) {
            throw new Error(error);            
        }
    }

    async sendProcess(param){
        try {
            await ProcessModel.updateOne({_id: this.body.process}, {$set: param}).lean();            
        } catch (error) {
            throw new Error(error);            
        }
    }



}

module.exports = Processes;
