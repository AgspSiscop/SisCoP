const mongoose = require('mongoose');
const Schema =  mongoose.Schema;

const File =  new Schema({
    file: {
        type: Buffer,
        required: true,      
    },
    filename: {
        type: String,
        required: true
    },
    extension: {
        type: String,
        required: true
    },
    process: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'process',
        index: true
    },
    message: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'message'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }    
});
File.index({filename: 1, extension: 1, process: 1, message: 1}, {unique: true});

const FileModel = mongoose.model('file', File);

class Files {
    constructor(body, locals, params){
        this.body = body;
        this.locals = locals;
        this.params = params;
        this.erros = [];       
    }

    #encodingName(filename){
        try {
            let originalName = Buffer.from(filename, 'latin1').toString('utf8');
            let clearName = originalName.slice(0, originalName.lastIndexOf('.')).replace(/\./g, ' ');
            let extension = originalName.slice(originalName.lastIndexOf('.', originalName.length-1));
            let name = [clearName, extension];
            return name;            
        } catch (error) {
            throw new Error(error);
        }
    }

    async createFileProcess(fileBuffer, filename, processID){
        try {
            const name = this.#encodingName(filename);
            const newFile = {
                file: fileBuffer,
                filename: name[0],
                extension: name[1],
                process: processID
            }
            let file;
            return file = await new FileModel(newFile).save();            
        } catch (error) {
            if(error.code == '11000'){
                throw new Error('Existem arquivos com este nome neste diretório. Por favor, retorne e troque o nome.');
            }else{
                throw new Error(error.code);
            }            
        }
    }

    async findByParam(param){
        try {
            const files = FileModel.find(param);
            return files;            
        } catch (error) {
            throw new Error(error);            
        }
    }

    async findByParamLight(param){
        try {
            const files = await FileModel.find(param, {filename: 1, extension: 1});            
            return files;            
        } catch (error) {
            throw new Error(error);            
        }
    }

    async ordenedFindByParam(param){
        try {
            const values = [];
            const find = new Object();
            
            if(typeof(Object.values(param)[0]) == 'object'){
                for(let i of Object.values(param)[0]){
                    find[Object.keys(param)] = i;                
                    values.push(await FileModel.findOne(find));
                }                
            }else{                
                find[Object.keys(param)] = Object.values(param)[0];
                values.push(await FileModel.findOne(find));
            }
            return values          
        } catch (error) {
            throw new Error(error);
        }
    }

    async findOneByParam(param){
        try {
            const file = FileModel.findOne(param);
            return file;            
        } catch (error) {
            throw new Error(error);            
        }
    }

    async updateOne(){
        try {           
            await FileModel.updateOne({_id: this.params.fileid}, {$set: { filename: this.body.ename}});           
        } catch (error) {
            if(error.code == '11000'){
                throw new Error('Existem arquivos com este nome neste diretório. Por favor, retorne e escolha outro nome.');
            }else{
                throw new Error(error.code);
            }
        }
    }

    async deleteOne(){
        try {
            await FileModel.deleteOne({_id: this.params.fileid});            
        } catch (error) {
            throw new Error(error);            
        }
    }

    async delete(){
        try {
            await FileModel.deleteMany({process: this.params.id});            
        } catch (error) {
            throw new Error(error);            
        }
    }
}

module.exports = Files;