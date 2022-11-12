const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {Admin} = require('../db/models')
const response = require('../utils/response');

module.exports = class adminController{
    static async login(req, res, next){
        const {username, password} = req.body;
        try{
            const adminRes = await Admin.findOne({where: { username}})
            if(adminRes == null) return next({name: 'UserNotFound'})
            const validUser = await bcrypt.compare(password, adminRes.password);
            if(validUser){
                const jwtToken = jwt.sign(
                    {role: 'admin', id: adminRes.id, username},
                    process.env.JWT_SECRET
                );
                res.status(200).json(response(200, true, "Login Successfull", {token: jwtToken}));
            }
            next({name: 'WrongPassword'})

        }catch(err){
            next(err)
        }
    }

    
}