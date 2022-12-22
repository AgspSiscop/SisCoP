const mongoose = require('mongoose');
const Schema =  mongoose.Schema;

const Process =  new Schema({
    user: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'user',
        required: true
    },
    title: {
        type: String,
        required: true
    },
    category: {
        type: String
    },
    description: {
        type: String
    },
    dir:{
        type:  String,
        required: true
    },
    date: {
        type: String,
        default: Intl.DateTimeFormat('pt-BR', { dateStyle: "full", timeStyle: "short" }).format(new Date())
    },
    year: {
        type: String,
        default: (new Date).getFullYear().toString()
    }    
});

mongoose.model('process', Process);