const localStrategy =  require('passport-local').Strategy;
const mongoose = require('mongoose');
const bcrypt =  require('bcryptjs');
//require('../src/models/profiles/Users');
//const Users = mongoose.model('user');
const Users = require('../src/models/profiles/UsersDB');
const passport = require('passport');

/*module.exports = function(passport){    
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
}*/

module.exports = function(passport){
    passport.use(new localStrategy({usernameField: 'name', passwordField: 'password'},
        async function(name, password, done){
            let user;
            try {
                const userObj =  new Users();
                user = await userObj.findOneByParam({name: name});               
                if(!user){
                    return done(null, false, {message: 'Usuário não encontrado!'});
                }           
            } catch (error) {
                return done(error);            
            }
    
           let match = bcrypt.compareSync(password, user.password);
           if(!match){
            return done(null, false, {message: 'Senha inválida.'});
           }
    
           return done(null, user);
        }
    ));

    passport.serializeUser((user, done) =>{
        done(null, user.name);
    });

    passport.deserializeUser(async (name, done) => {
        try{
            const userObj = new Users();
            let user = await userObj.findOneByParam({name: name});
            if(!user){
                return done(new Error('Usuário não encontrado.'));
            }
            done(null, user);
        }catch (error){
            done(error);
        }
    });
    

}

//module.exports = strategy;

