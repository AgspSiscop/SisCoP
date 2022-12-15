module.exports = {
    isAuth: function(req,res,next){
        if(req.isAuthenticated() && req.user){
            return next()
        }else{
            res.redirect('http://127.0.0.1:8903/');
        }
    }
}