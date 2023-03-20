function count (req, res, next){
    res.locals.carrinho = req.session.carrinho
    next()
}

module.exports = count  