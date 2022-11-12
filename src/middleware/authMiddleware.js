const jwt = require('jsonwebtoken');
const {User} = require('../db/models');
// const Err = require('./errorMiddleware')

module.exports = async function (req, res, next) {
    try {
        const {authorization} = req.headers;
        if (!authorization) return next({name: 'NoAuthorization'});

        token = authorization.split('Bearer ');
        if (token.length !== 2) return next({name: 'InvalidToken'});

        const {type ,id, email} = jwt.verify(token[1], process.env.JWT_SECRET);
        if (type !== 'user' || type !== 'room') return next({name: InvalidToken});
        const user = await User.findOne({where: {id, email}});
        if (!user) return next({name: 'Unauthorized'});
        req.user = {type, id, email};
        next();
    } catch (err) {
        next(err);
    }
};
