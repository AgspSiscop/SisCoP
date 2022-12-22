const mongoose = require('mongoose');
const Schema =  mongoose.Schema;

const ProcessState =  new Schema({
    process: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'process',
        required: true
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
    }       
});

mongoose.model('processstate', ProcessState);
