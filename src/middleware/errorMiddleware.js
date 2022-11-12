const response = require('../utils/response');

module.exports = (err, req, res, next) => {
    let code = 500;
    let message = 'Internal server error';

    if (err.name === 'JsonWebTokenError') {
        code = 401;
        message = 'Invalid token';
        return res.status(code).json(response(code, false, message, null));
    }

    if (err.name === 'InvalidToken') {
        code = 401;
        message = 'Invalid token';
        return res.status(code).json(response(code, false, message, null));
    }
    if (err.name === 'ExpiredToken') {
        code = 401;
        message = 'Expired token';
        return res.status(code).json(response(code, false, message, null));
    }
    if (err.name === 'Unauthorized' || err.name === 'NoAuthorization') {
        code = 401;
        message = 'Unauthorized';
        return res.status(code).json(response(code, false, message, null));
    }
    if (err.name === 'ErrNotFound') {
        code = 404;
        message = 'Data not found';
        return res.status(code).json(response(code, false, message, null));
    }
    if (err.name === 'UnlinkFailed') {
        code = 500;
        message = 'Unlink Failed';
        return res.status(code).json(response(code, false, message, null));
    }
    if (err.name === 'SequelizeValidationError') {
        code = 400;
        message = err.errors.map((e) => e.message);
        return res.status(code).json(response(code, false, message, null));
    }
    if (
        err.name === 'EmailNotFound') {
        code = 401;
        message = 'Email not found';
        return res.status(code).json(response(code, false, message, null));
    }
    if( err.name === 'WrongPassword' || err.name === 'EmailOrPasswordEmpty'){
        code = 401;
        message = 'Wrong email/password';
        return res.status(code).json(response(code, false, message, null));
    }
    if(err.name == 'EmailNotUnique'){
        code = 400;
        message = 'Email already used'
        return res.status(code).json(response(code, false, message, null));
    }
    if (err.name === 'SequelizeUniqueConstraintError') {
        code = 400;
        message = 'Bad request';
        return res.status(code).json(response(code, false, message, null));
    }
    if (err.name === 'RoomNotFound') {
        code = 404;
        message = 'Oops... Room Not Found Or Already Expired';
        return res.status(code).json(response(code, false, message, null));
    }
    if (err.name === 'WrongPIN') {
        code = 401;
        message = 'Wrong PIN';
        return res.status(code).json(response(code, false, message, null));
    }
    if (err.name === 'PageNotFound') {
        code = 404;
        message = 'Oops... nothing here';
        return res.status(code).json(response(code, false, message, null));
    }
};
