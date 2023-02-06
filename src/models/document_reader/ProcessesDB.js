const mongoose = require('mongoose');
const Schema =  mongoose.Schema;
const category = require('../../../config/selectDatas').category
const sectionsName = require('../../../config/selectDatas').sectionsName

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

    #checkUp(){
        try {
            const errors = [];
            if(this.body.object.length < 15 || !this.body.object || this.body.object == null){
                errors.push({text: 'Nome inválido! Nome precisa ter no mínimo 15 caracteres'});
            }
            if(this.body.nup.replace(/\./g, '').replace(/\//g, '').replace(/-/, '').length !== 17){
                errors.push({text: 'Nup inválido.'});
            }
            if(!category.some(x => x == this.body.category)){
                errors.push({text: 'Categoria inválida.'});
            }
            if(!sectionsName.slice(8).some(x => x == this.body.origin)){
                errors.push({text: 'Nome da seção de origem inválida.'});
            }
            return errors            
        } catch (error) {
            throw new Error(error);
        }
    }

    async create(){
        try {
            const errors = this.#checkUp();
            if(errors.length > 0){
                return {errors: errors};
            }else{
                this.body.nup = this.body.nup.replace(/\./g, '').replace(/\//g, '').replace(/-/, '');
                this.body.object = this.body.object.replace(/\./g, '').replace(/\_/g, ' ').replace(/\//g, '')
                const process = {
                    user: this.locals.user,
                    receiver: null,
                    section_receiver: null,
                    origin: this.body.origin,           
                    title: this.body.object,
                    nup: this.body.nup,
                    category: this.body.category,
                    user_dir: `${Date.now() + '_' + this.body.object}`,
                    transfer_dir: null,
                    done_dir: null,
                    description: this.body.description,
                    date: Intl.DateTimeFormat('pt-BR', { dateStyle: "full", timeStyle: "short" }).format(new Date()),
                    year: (new Date).getFullYear().toString()
                };                
                await new ProcessModel(process).save();               
                return {process: process, errors: errors};               
            }
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
            const errors = this.#checkUp();
            if(errors.length > 0){
                return {errors: errors}
            }else{
                this.body.nup = this.body.nup.replace(/\./g, '').replace(/\//g, '').replace(/-/, '');
                await ProcessModel.updateOne({user_dir: this.params.link}, 
                    {$set: {
                        title: this.body.object,
                        nup: this.body.nup,
                        user_dir: `${this.params.link.split('_')[0]}_${this.body.object}`, 
                        category: this.body.category, 
                        origin: this.body.origin, 
                        description: this.body.description
                    }}).lean();
                    return {errors: errors}
            }
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
