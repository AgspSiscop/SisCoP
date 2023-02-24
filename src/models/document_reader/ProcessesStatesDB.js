const mongoose = require('mongoose');
const Schema =  mongoose.Schema;

const ProcessState =  new Schema({
    process: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'process',
        index: true,
        required: true
    },
    user: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'user'
    },
    state: {
        type: String,
        required: true
    },
    anotation: {
        type: String
    },   
    date: {
        type: String,
        required: true            
    },
    createdAt: {
        type: Date,
        default: Date.now
    }       
});

const ProcessStateModel = mongoose.model('processstate', ProcessState);

class ProcessStates {
    constructor(body, locals, params){
        this.body = body;
        this.locals = locals;
        this.params = params;
        this.erros = [];       
    }    

    async delete() {
        try {
            await ProcessStateModel.deleteMany({process: this.params.id});            
        } catch (error) {
            throw new Error(error);           
        }            
    }    

    async deleteOne(){
        try {
            await ProcessStateModel.deleteOne({_id: this.body.elementid});            
        } catch (error) {
            throw new Error(error);           
        }
    }

    async create(){
        try {
            const State = {
                process: this.body.elementid,
                user: this.locals.id,
                state: this.body.state,
                anotation: this.body.anotation,
                date: Intl.DateTimeFormat('pt-BR', { dateStyle: "full", timeStyle: "short" }).format(new Date())
            }
            await new ProcessStateModel(State).save();            
        } catch (error) {
            throw new Error(error);            
        }
    }

    async find(){
        try {
            const states = await ProcessStateModel.find({process: this.body.elementid}).sort({createdAt: -1}).lean();
            return states;            
        } catch (error) {
            throw new Error(error);            
        }
    }

    async findByParam(param){
        try {
            const states = await ProcessStateModel.find(param).sort({createdAt: -1}).populate('user').lean()
            return states;                       
        } catch (error) {
            throw new Error(error);            
        }
    }

    async registerState(processID){
        try {
            const newState = {
                process: processID,
                state: 'Processo Cadastrado',
                anotation: `Processo Cadastrado Por ${this.locals.pg} ${this.locals.name}`,
                date: Intl.DateTimeFormat('pt-BR', { dateStyle: "full", timeStyle: "short" }).format(new Date())
            }

            await ProcessStateModel(newState).save();
            
        } catch (error) {
            throw new Error(error);            
        }
    }

    async sendState(){
        try {
            let newState
            if(this.body.user){
                newState = {
                    process: this.body.process,
                    state: 'Em Transferência',
                    anotation: `Destinado à/ao ${this.body.username}`,
                    date: Intl.DateTimeFormat('pt-BR', { dateStyle: "full", timeStyle: "short" }).format(new Date())
                }
            }else{
                newState = {
                    process: this.body.process,
                    state: 'Em Transferência',
                    anotation: `Destinado à/ao ${this.body.messagesection}`,
                    date: Intl.DateTimeFormat('pt-BR', { dateStyle: "full", timeStyle: "short" }).format(new Date())
                }
            }    
            await ProcessStateModel(newState).save();            
        } catch (error) {
            throw new Error(error);            
        }
    }

    async doneState(){
        try {
            let newState = {
                    process: this.body.process,
                    state: 'Processo Concluído',
                    anotation: ``,
                    date: Intl.DateTimeFormat('pt-BR', { dateStyle: "full", timeStyle: "short" }).format(new Date())
                }              
            await ProcessStateModel(newState).save();            
        } catch (error) {
            throw new Error(error);            
        }
    }

    async returnState(){
        try {
            let newState = {
                    process: this.body.process,
                    state: 'Retificando Processo',
                    anotation: ``,
                    date: Intl.DateTimeFormat('pt-BR', { dateStyle: "full", timeStyle: "short" }).format(new Date())
                }              
            await ProcessStateModel(newState).save();            
        } catch (error) {
            throw new Error(error);            
        }

    }
}

module.exports = ProcessStates;

