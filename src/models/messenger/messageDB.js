const mongoose = require('mongoose');
const Schema =  mongoose.Schema;

const Message =  new Schema({
    sender: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'user',
        required: true
    },
    receiver: { //ou array de usuários
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

mongoose.model('message', Message);
