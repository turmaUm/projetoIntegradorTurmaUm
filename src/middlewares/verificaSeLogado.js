const verificaSeLogado = (req, res, next) => {
    
    if(req.session.admLogado){
        next();
    } else {
        res.redirect('/login-adm');
    }
}

module.exports = verificaSeLogado;