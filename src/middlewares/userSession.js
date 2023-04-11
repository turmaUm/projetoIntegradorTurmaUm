const userSession = (req, res, next) => {
    res.locals.userSession = req.session.user
    next()
} 
module.exports = userSession; 