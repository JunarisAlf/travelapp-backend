const {Driver, Location} = require('../db/models');
const response = require('../utils/response');
const bcrypt = require('bcrypt');

module.exports = class driverController {
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
        const driverID = req.params.driverID;
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
};
