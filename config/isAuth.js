module.exports = (req,res,next) => {
    if(req.isAuthenticated() && req.user){
        next()
    }else{
        res.redirect('/');
    }   
}
