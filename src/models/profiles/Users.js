const mongoose = require('mongoose');
const Schema =  mongoose.Schema;

const User =  new Schema({
    name:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    pg:{
        type: String
    },
    section:{
        type: String,
        required: true
    },
    level:{
        type: Number,
        required: true
    }
});

mongoose.model('user', User);

