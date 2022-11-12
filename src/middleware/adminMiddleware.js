const jwt = require('jsonwebtoken');
const {Admin} = require('../db/models');
// const Err = require('./errorMiddleware')

module.exports = async function (req, res, next) {
    try {
        const {authorization} = req.headers;
        if (!authorization) return next({name: 'NoAuthorization'});
        token = authorization.split('Bearer ');
        if (token.length !== 2) return next({name: 'InvalidToken'});

        const {role ,id, username} = jwt.verify(token[1], process.env.JWT_SECRET);
        
        if (role !== 'admin') return next({name: 'Unauthorized'});
        const user = await Admin.findOne({where: {id, username}});
        if (!user) return next({name: 'Unauthorized'});
        req.user = {role, id, username};
        next();
    } catch (err) {
        next(err);
    }
};
