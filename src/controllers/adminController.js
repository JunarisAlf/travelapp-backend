const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {Admin} = require('../db/models');
const response = require('../utils/response');

module.exports = class adminController {
    static async login(req, res, next) {
        const {username, password} = req.body;
        try {
            const adminRes = await Admin.findOne({where: {username}});
            if (adminRes == null) return next({name: 'UserNotFound'});
            const validUser = await bcrypt.compare(password, adminRes.password);
            if (validUser) {
                const jwtToken = jwt.sign(
                    {role: 'admin', id: adminRes.id, username},
                    process.env.JWT_SECRET
                );
                return res.status(200).json(
                    response(200, true, 'Login Successfull', {token: jwtToken})
                );
            }
            next({name: 'WrongPassword'});
        } catch (err) {
            next(err);
        }
    }
    static async getAdmin(req, res, next) {
        const adminID = req.user.id;
        try {
            const {id, name, username} = await Admin.findOne({
                where: {id: adminID},
            });
            res.status(200).json(
                response(200, true, 'Data admin berhasil didapat', {
                    id,
                    name,
                    username,
                })
            );
        } catch (err) {
            next(err);
        }
    }
    static async updateAdmin(req, res, next) {
        const {username, name} = req.body;
        const jwtData = req.user; // (role, id, username)
        try {
            const adminRes = await Admin.update(
                {
                    username,
                    name,
                },
                {where: {id: jwtData.id}, returning: true, plain: true}
            );
            const jwtToken = jwt.sign(
                {role: 'admin', id: adminRes.id, username: adminRes.username},
                process.env.JWT_SECRET
            );
            res.status(200).json(
                response(200, true, 'Data admin berhasil di update', {
                    token: jwtToken,
                    id: adminRes[1].id,
                    username: adminRes[1].username,
                })
            );
        } catch (err) {
            next(err);
        }
    }
};
