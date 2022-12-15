const localStrategy =  require('passport-local').Strategy;
const mongoose = require('mongoose');
const bcrypt =  require('bcryptjs');
require('../src/models/profiles/Users');
const Users = mongoose.model('user');

module.exports = function(passport){    
    passport.use(new localStrategy({usernameField: 'name', passwordField: 'password'}, (name, password, done) =>{
        Users.findOne({name: name}).then((user) => {            
            if(!user){
                return done(null, false, {message: 'Esra conta não existe.'});
            }else{
                bcrypt.compare(password, user.password, (error, match) => {
                    if(match){
                        return done(null, user);
                    }else{
                        return done(null, false, {message: 'Senha inválida.'})
                    }
                });
            }

        });
    }));

    passport.serializeUser((user, done) => {
        done(null, user._id)
    });

    passport.deserializeUser((id, done) => {
        Users.findById(id, (error, user) =>{
            done(error, user);
        })
    });
}


