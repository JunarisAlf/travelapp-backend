const {Driver, Location, DriverSeat, Seat, sequelize} = require('../db/models');
const response = require('../utils/response');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Op } = require("sequelize");


module.exports = class driverController {
    static async login(req, res, next) {
        const {wa_number, password} = req.body;
        try {
            await Sequelize.trans;
            const driverRes = await Driver.findOne({where: {wa_number}});
            if (driverRes == null) return next({name: 'UserNotFound'});
            const validUser = await bcrypt.compare(
                password,
                driverRes.password
            );
            if (validUser) {
                const jwtToken = jwt.sign(
                    {role: 'driver', id: driverRes.id, name: driverRes.name},
                    process.env.JWT_SECRET
                );
                return res.status(200).json(
                    response(200, true, 'Login Successfull', {
                        token: jwtToken,
                    })
                );
            }
            next({name: 'WrongPassword'});
        } catch (err) {
            next(err);
        }
    }
    static async createDriver(req, res, next) {
        const {name, wa_number, password, car_type} = req.body;
        try {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            const driverRes = await Driver.create({
                name,
                wa_number,
                password: hashedPassword,
                car_type,
            });
            res.status(201).json(
                response(201, true, 'Akun driver berhasil dibuat', {
                    id: driverRes.id,
                    name: driverRes.name,
                })
            );
        } catch (err) {
            next(err);
        }
    }

    static async updatePassword(req, res, next) {
        const password = req.body.password;
        const driverID = req.params.driverID;
        try {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            const driverRes = await Driver.update(
                {
                    password: hashedPassword,
                },
                {
                    where: {id: driverID},
                    returning: true,
                    plain: true,
                }
            );
            res.status(201).json(
                response(201, true, 'Password driver berhasil dirubah', {
                    id: driverRes[1].id,
                    name: driverRes[1].name,
                })
            );
        } catch (err) {
            next(err);
        }
    }
    static async updateDriver(req, res, next) {
        const {driverID} = req.params;
        const {
            name,
            wa_number,
            car_type,
            departure_at,
            price,
            location_from,
            location_to,
            departure
        } = req.body;

        try {
            const driverRes = await Driver.update(
                {
                    name,
                    wa_number,
                    car_type,
                    departure_at,
                    price,
                    location_from,
                    location_to,
                    departure
                },
                {
                    where: {id: driverID},
                    returning: true,
                    plain: true,
                }
            );
            res.status(200).json(
                response(201, true, 'Akun driver berhasil di update', {
                    id: driverRes[1].id,
                    name: driverRes[1].name,
                })
            );
        } catch (err) {
            next(err);
        }
    }

    static async getOneDriver(req, res, next) {
        let driverID;
        if (req.user.role == 'admin') {
            driverID = req.params.driverID;
        } else if (req.user.role == 'driver') {
            driverID = req.user.id;
        }
        try {
            const driverRes = await Driver.findOne({
                where: {id: driverID},
                attributes: {
                    exclude: ['password', 'location_to', 'location_from'],
                },
                include: [
                    {
                        model: Location,
                        as: 'from',
                        attributes: ['id', 'kabupaten', 'kecamatan'],
                    },
                    {
                        model: Location,
                        as: 'to',
                        attributes: ['id', 'kabupaten', 'kecamatan'],
                        attributes: ['id', 'kabupaten', 'kecamatan'],
                    },
                    {
                        model: DriverSeat,
                        as: 'seats',
                        attributes: ['id', 'status', 'seat_id'],
                        include: {
                            model: Seat,
                            attributes: ['catatan'],
                        },
                    },
                ],
            });
            res.status(200).json(
                response(
                    200,
                    true,
                    'Berhasil mendapatkan data driver',
                    driverRes
                )
            );
        } catch (err) {
            next(err);
        }
    }
    static async getAllDriver(req, res, next) {
        try {
            const driverRes = await Driver.findAll({
                attributes: {
                    exclude: ['password', 'location_to', 'location_from'],
                },
                include: [
                    {
                        model: Location,
                        as: 'from',
                        attributes: ['id', 'kabupaten', 'kecamatan'],
                    },
                    {
                        model: Location,
                        as: 'to',
                        attributes: ['id', 'kabupaten', 'kecamatan'],
                    },
                ],
            });
            res.status(200).json(
                response(
                    200,
                    true,
                    'Berhasil mendapatkan semua data driver',
                    driverRes
                )
            );
        } catch (err) {
            next(err);
        }
    }

    static async deleteDriver(req, res, next) {
        const driverID = req.params.driverID;
        try {
            const driverRes = await Driver.destroy({where: {id: driverID}});
            res.status(200).json(
                response(200, true, 'Berhasil menghapus driver')
            );
        } catch (err) {
            next(err);
        }
    }
    static async updateData(req, res, next) {
        const driverID = req.user.id;
        const {location_from, location_to, departure_at, price, seats} =
            req.body;
        try {
            await sequelize.transaction(async (t) => {
                await Driver.update(
                    {
                        location_from,
                        location_to,
                        departure_at,
                        price,
                    },
                    {
                        where: {id: driverID},
                    },
                    {transaction: t}
                );
                let updatePromise = [];
                seats.forEach((seat) => {
                    updatePromise.push(
                        DriverSeat.update(
                            {status: seat.status},
                            {where: {id: seat.id}},
                            {transaction: t}
                        )
                    );
                });
                await Promise.all(updatePromise);
            });
            res.status(200).json(response(200, true, 'Berhasil update data'));
        } catch (err) {
            next(err);
        }
    }

    static async updateSeat(req, res, next) {
        const seats = req.body.seats;
        let driverID ;

        if(req.user.role == 'admin'){
            driverID = req.params.driverID
        }else if(req.user.role == 'driver'){
            driverID = req.user.id;
        }
        try {
            await sequelize.transaction(async (t) => {
                let updatePromise = [];
                seats.forEach((seat) => {
                    updatePromise.push(
                        DriverSeat.upsert(
                            {
                                id: seat.id,
                                status: seat.status,
                                driver_id: driverID ,
                                seat_id: seat.seat_id
                            },
                            // {where: {id: seat.id, driver_id: driverID}},
                            {transaction: t}
                        )
                    );
                });
                await Promise.all(updatePromise);
            });
            res.status(200).json(response(200, true, 'Berhasil update data'));
        } catch (err) {
            console.log(err)
            next(err);
        }
    }

    static async getDriverSeat(req, res, next) {
        const driverID = req.params.driverID;
        try {
            const driverSeat = await DriverSeat.findAll({
                where: {driver_id: driverID},
                attributes: ['id', 'driver_id', 'seat_id', 'status']
            });
            res.status(200).json(
                response(
                    200,
                    true,
                    'Berhasil mendapatkan data seat',
                    driverSeat
                )
            );
        } catch (err) {
            next(err);
        }
    }

    static async filterDriver(req, res, next){
        const {name, from, to, time} = req.query
        let driverRes;
        try{
            if(name){
                driverRes = await Driver.findAll({
                    where: {
                        name: {
                            [Op.like]: `%${name}%`
                        }
                    },
                    attributes: {
                        exclude: ['password', 'created_at', 'updated_at']
                    },
                    include: [
                        {
                            model: Location,
                            as: 'from',
                            attributes: ['id', 'kabupaten', 'kecamatan'],
                        },
                        {
                            model: Location,
                            as: 'to',
                            attributes: ['id', 'kabupaten', 'kecamatan'],
                        },
                    ],
                })
                return res.status(200).json(response(200, true, "Berhasil mendapatkan data", driverRes))
            }
            if(from && to && time){
                driverRes = await Driver.findAll({
                    where: {
                       location_from: from,
                       location_to: to,
                       departure: time 
                    },
                    attributes: {
                        exclude: ['password', 'created_at', 'updated_at']
                    },
                    include: [
                        {
                            model: Location,
                            as: 'from',
                            attributes: ['id', 'kabupaten', 'kecamatan'],
                        },
                        {
                            model: Location,
                            as: 'to',
                            attributes: ['id', 'kabupaten', 'kecamatan'],
                        },
                    ],
                })
                return res.status(200).json(response(200, true, "Berhasil mendapatkan data", driverRes))
            }
            
        }catch(err){
            next(err)
        }
    }
};
