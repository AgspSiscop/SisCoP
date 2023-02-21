const mongoose = require('mongoose');
const Schema =  mongoose.Schema;

const Year =  new Schema({
    year: {
        type: String,
        required: true,
        unique: true        
    }    
});

const YearModel = mongoose.model('year', Year);

class Years {
    constructor(body, locals, params){
        this.body = body;
        this.locals = locals;
        this.params = params;
        this.erros = [];       
    }

    async create(){
        try {
            await new YearModel({year: (new Date).getFullYear()}).save();            
        } catch (error) {
            throw new Error(error);
        }
    }

    async findYears(){
        try {
            const year = await YearModel.find().lean();
            return year;            
        } catch (error) {
            throw new Error(error);            
        }
    }

    async findOneYear(value){
        try {
            const year = await YearModel.findOne({year: value}).lean();
            return year
        } catch (error) {
            throw new Error(error)            
        }
    }
}

module.exports = Years