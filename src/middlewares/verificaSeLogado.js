const verificaSeLogado = (req, res, next) => {
    
    if(req.session.admLogado){ 
        res.locals.admSession = req.session.adm;
    } else {
        res.redirect('/login-adm');
    }
    next();
}

module.exports = verificaSeLogado;