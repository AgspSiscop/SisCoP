const mongoose = require('mongoose');
const bcrypt =  require('bcryptjs');
const Schema =  mongoose.Schema;
const pg = require('../../../config/selectDatas').pg;
const sectionsName = require('../../../config/selectDatas').sectionsName;


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

const UsersModel = mongoose.model('user', User);

class Users {
    constructor(body, locals, params){
        this.body = body;
        this.locals = locals;
        this.params = params;
        this.erros = [];       
    }

    async #checkUp(){
        try {
            const errors = [];
            const user = await UsersModel.find({name: this.body.name}).lean();               
            if(user.length == 0){
                if(!this.body.name || this.body.name == null ){
                    errors.push({text: 'Nome inválido.'});
                }
                if(!this.body.password || this.body.password == null){
                    errors.push({text: 'Senha inválida.'});
                }
                if(!this.body.section || this.body.section == null || this.body.section == '0'){
                    errors.push({text: 'Seção inválida.'});
                }
                if(!this.body.level || this.body.level == null || this.body.level  < 1 && this.body.level > 5){
                    errors.push({text: 'Level inválido.'});
                }
            }else{
                errors.push({text: 'Usuário já existe.'});
            }
            return errors;            
        } catch (error) {
            throw new Error(error);            
        }
    }

    async #chekUpUpdate(){
        try {
            const errors = [];
            const user = await UsersModel.find({name: this.body.name}).lean()                
                if((user.length == 0) || (user.length != 0 && this.body.name == this.body.userselected)){
                    if(!this.body.name || this.body.name == null ){
                        errors.push({text: 'Nome inválido.'});
                    }           
                    if(!this.body.level || this.body.level == null || this.body.level  < 1 && this.body.level > 5){
                        errors.push({text: 'Level inválido.'});
                    }                
                }else{
                    errors.push({text: 'Usuário já existe.'});
                }
                return errors;            
        } catch (error) {
            throw new Error(error);            
        }
    }

    async #checkUpUpdateByUser(){
        try {                       
            const errors = [];
            if(this.body.pg){                
                if(!pg.some(x => x == this.body.pg)){
                    errors.push({text: 'Valor inválido em Posto/Graduação.'});
                }                
            }            
            if(this.body.password){                                
                const user = await UsersModel.findOne({name: this.locals.name}).lean();                
                if(this.body.newpassword !== this.body.password){                    
                    errors.push({text: 'As senhas novas não são iguais.'});
                }
                if(this.body.password.length <= 5){
                    errors.push({text: 'Senha deve ter mais do que 5 caracteres.'})
                }                
                if(!bcrypt.compareSync(this.body.oldpassword, user.password)){                    
                    errors.push({text: 'Senha antiga incorreta.'});
                }                
            }                 
            return errors;                        
        } catch (error) {
            throw new Error(error);            
        }
    }

    async #create(newUser){
        try {
           await new UsersModel(newUser).save();            
        } catch (error) {
            throw new Error(error);            
        }
    }    

    async register(){
        try {
            const errors = await this.#checkUp();
            if(errors.length > 0){
                return {errors: errors}
            }else{
                const salt = bcrypt.genSaltSync(10);
                this.body.password = bcrypt.hashSync(this.body.password, salt);
                const newUser = {
                    name: this.body.name,
                    password: this.body.password,
                    pg: this.body.pg,
                    section: this.body.section,
                    level: this.body.level
                };
                this.#create(newUser);            
                return {errors: errors};
            }            
        } catch (error) {
            throw new Error(error);            
        }
    }

    async updateOne(){
        try {            
            const errors =  await this.#chekUpUpdate();
            if(errors.length > 0){
                return {errors: errors}
            }else{
                if(this.body.password){
                    const salt = bcrypt.genSaltSync(10);
                    this.body.password = bcrypt.hashSync(this.body.password, salt);
                    const User = {
                        name: this.body.name,
                        password: this.body.password,
                        pg: this.body.pg,
                        section: this.body.section,
                        level: this.body.level
                    };                
                    await UsersModel.updateOne({name: this.body.userselected}, {$set: User});
                    return {errors: errors};                
                }else{
                    const User = {
                        name: this.body.name,                        
                        pg: this.body.pg,
                        section: this.body.section,
                        level: this.body.level
                    };
                    await UsersModel.updateOne({name: this.body.userselected}, {$set: User});
                    return {errors: errors};                   
                }
            }       
        } catch (error) {
        throw new Error(error);
        }
    }

    async updateOneByUser(){
        try {
            const errors = await this.#checkUpUpdateByUser();
            if(errors.length > 0){
                return {errors: errors}
            }else{
                if(this.body.pg){                    
                    const User = {                                                
                        pg: this.body.pg                                               
                    };                    
                    await UsersModel.updateOne({name: this.locals.name}, {$set: User});
                    return {errors: errors}; 
                }
                if(this.body.password){
                    const salt = bcrypt.genSaltSync(10);
                    this.body.password = bcrypt.hashSync(this.body.password, salt);
                    const User = {                        
                        password: this.body.password                        
                    };                
                    await UsersModel.updateOne({name: this.locals.name}, {$set: User});
                    return {errors: errors};
                }
            }            
        } catch (error) {
            throw new Error(error);            
        }
    }

    async findOneByParam(param){
        try {
            const user = await UsersModel.findOne(param).lean();
            return user;            
        } catch (error) {
            throw new Error(error);            
        }
    }

    async findByParam(param){
        try {
            const users = await UsersModel.find(param);
            return users;            
        } catch (error) {
            throw new Error(error);            
        }
    }

    async deleteOne(){
        try {
            await UsersModel.deleteOne({name: this.body.name});          
        } catch (error) {
            throw new Error(error);            
        }
    }

}

module.exports = Users;

