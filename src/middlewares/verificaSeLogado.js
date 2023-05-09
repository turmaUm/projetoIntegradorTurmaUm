const verificaSeLogado = (req, res, next) => {
    
    if(req.session.admLogado){
        res.locals.admSession = req.session.adm;
        next();
    } else {
        res.redirect('/login-adm');
    }
}

module.exports = verificaSeLogado;