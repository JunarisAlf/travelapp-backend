const {Location, Order, Driver, Admin} = require('../db/models');
const response = require('../utils/response');
const {Op} = require('sequelize');

module.exports = class utilsController {
    static async create(req, res, next) {
        const {
            admin_id,
            driver_id,
            customer,
            destination,
            from,
            departure,
            catatan,
        } = req.body;
        try {
            const orderRes = await Order.create({
                admin_id,
                driver_id,
                customer,
                destination,
                from,
                departure,
                catatan,
            });
            res.status(201).json(
                response(201, true, 'Berhasil menambahkan data order', orderRes)
            );
        } catch (err) {
            console.log(err);
            next(err);
        }
    }
    static async update(req, res, next) {
        const orderID = req.params.orderID;
        const {
            admin_id,
            driver_id,
            customer,
            destination,
            from,
            departure,
            catatan,
        } = req.body;
        try {
            const orderRes = await Order.update(
                {
                    admin_id,
                    driver_id,
                    customer,
                    destination,
                    from,
                    departure,
                    catatan,
                },
                {where: {id: orderID}}
            );
            res.status(201).json(
                response(201, true, 'Berhasil mengubah data order')
            );
        } catch (err) {
            console.log(err);
            next(err);
        }
    }

    static async getAll(req, res, next) {
        try {
            const orderRes = await Order.findAll({
                include: [
                    {
                        model: Admin,
                        attributes: ['id', 'name'],
                    },
                    {
                        model: Driver,
                        attributes: ['id', 'name'],
                    },
                    {
                        model: Location,
                        as: 'location_from',
                        attributes: ['id', 'kabupaten', 'kecamatan'],
                    },
                    {
                        model: Location,
                        as: 'to',
                        attributes: ['id', 'kabupaten', 'kecamatan'],
                    },
                ],
                order: [['updated_at', 'DESC']],
            });
            res.status(200).json(
                response(200, true, 'Berhasil mendapatkan data order', orderRes)
            );
        } catch (err) {
            console.log(err);
            next(err);
        }
    }

    static async getOne(req, res, next) {
        const orderID = req.params.orderID;
        try {
            const orderRes = await Order.findOne({
                where: {id: orderID},
                include: [
                    {
                        model: Admin,
                        attributes: ['id', 'name'],
                    },
                    {
                        model: Driver,
                        attributes: ['id', 'name'],
                    },
                    {
                        model: Location,
                        as: 'location_from',
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
                response(200, true, 'Berhasil mendapatkan data order', orderRes)
            );
        } catch (err) {
            console.log(err);
            next(err);
        }
    }

    static async search(req, res, next) {
        const {admin, driver} = req.query;
        let searchRes;
        if (admin != null) {
            const adminID = await Admin.findOne({
                where: {
                    name: {
                        [Op.like]: `%${admin}%`,
                    },
                },
            });
            if (adminID == null) {
                return res.status(200).json(
                    response(200, true, 'Tidak ada admin dengan nama tersebut', [])
                );
            }
            searchRes = await Order.findAll({
                where: {admin_id: adminID.id},
                include: [
                    {
                        model: Admin,
                        attributes: ['id', 'name'],
                    },
                    {
                        model: Driver,
                        attributes: ['id', 'name'],
                    },
                    {
                        model: Location,
                        as: 'location_from',
                        attributes: ['id', 'kabupaten', 'kecamatan'],
                    },
                    {
                        model: Location,
                        as: 'to',
                        attributes: ['id', 'kabupaten', 'kecamatan'],
                    },
                ],
                order: [['updated_at', 'DESC']],
            });
        } else if (driver != null) {
            const driverID = await Driver.findOne({
                where: {
                    name: {
                        [Op.like]: `%${driver}%`,
                    },
                },
            });
            if (driverID == null) {
                return res.status(200).json(
                    response(200, true, 'Tidak ada driver dengan nama tersebut', [])
                );
            }
            searchRes = await Order.findAll({
                where: {driver_id: driverID.id},
                include: [
                    {
                        model: Admin,
                        attributes: ['id', 'name'],
                    },
                    {
                        model: Driver,
                        attributes: ['id', 'name'],
                    },
                    {
                        model: Location,
                        as: 'location_from',
                        attributes: ['id', 'kabupaten', 'kecamatan'],
                    },
                    {
                        model: Location,
                        as: 'to',
                        attributes: ['id', 'kabupaten', 'kecamatan'],
                    },
                ],
                order: [['updated_at', 'DESC']],
            });
        }

        res.status(200).json(
            response(200, true, 'Berhasil mendapatkan data order', searchRes)
        );
    }
};
