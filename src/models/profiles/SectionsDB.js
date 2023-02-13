const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Section = new Schema ({
    name:{
        type: String,
        required: true,
        unique: true 
    },
    level:{
        type: Number,
        required: true
    }
});

const SectionsModel = mongoose.model('section', Section);

class Sections {
    constructor(body, locals, params){
        this.body = body;
        this.locals = locals;
        this.params = params;
        this.erros = []; 
    }

    async findByParam(param){
        try {
            const sections = await SectionsModel.find(param).sort({name: 1});
            return sections;            
        } catch (error) {
            throw new Error(error);            
        }
    }

    async findOneByParam(param){
        try {
            const sections = await SectionsModel.findOne(param);
            return sections;            
        } catch (error) {
            throw new Error(error);            
        }
    }
}

module.exports = Sections