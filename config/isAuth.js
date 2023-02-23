function isAuth (req,res,next){
    if(req.isAuthenticated() && req.user){
        next();
    }else{
        res.redirect('/');
    }
}
function isAuthLog (req, res, next){
    if(req.isAuthenticated() && req.user){
        res.redirect('/mensageiro/caixadeentrada')
    }else{
        next();
    }
}

module.exports = {isAuth, isAuthLog}