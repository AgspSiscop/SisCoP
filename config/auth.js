const localStrategy =  require('passport-local').Strategy;
const bcrypt =  require('bcryptjs');
const Users = require('../src/models/profiles/UsersDB');

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



