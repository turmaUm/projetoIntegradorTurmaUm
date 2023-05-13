const verificaSeLogado = (req, res, next) => {
    
    if(true){ //req.session.admLogado
        // res.locals.admSession = req.session.adm;
        next();
    } else {
        res.redirect('/login-adm');
    }
}

module.exports = verificaSeLogado;