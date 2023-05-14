const verificaSeClienteLogado = (req,res,next)=>{
    if(req.session.userLogado){ //req.session.admLogado
        res.locals.userSession = req.session.user;
        next();
    } else {
        res.redirect('/login');
    }
}


module.exports = verificaSeClienteLogado