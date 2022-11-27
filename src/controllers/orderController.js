const {Location, Order, Driver, Admin} = require('../db/models');
const response = require('../utils/response');

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
        try{
            const orderRes = await Order.create({
                admin_id,
                driver_id,
                customer,
                destination,
                from,
                departure,
                catatan
            })
            res.status(201).json(response(201, true, "Berhasil menambahkan data order", orderRes))
        }catch(err){
            console.log(err)
            next(err)
        }
    }
    static async update(req, res, next) {
        const orderID = req.params.orderID
        const {
            admin_id,
            driver_id,
            customer,
            destination,
            from,
            departure,
            catatan,
        } = req.body;
        try{
            const orderRes = await Order.update({
                admin_id,
                driver_id,
                customer,
                destination,
                from,
                departure,
                catatan
            }, {where: {id: orderID}})
            res.status(201).json(response(201, true, "Berhasil mengubah data order"))
        }catch(err){
            console.log(err)
            next(err)
        }
    }

    static async getAll(req, res, next){
        try{
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
                order: [['updated_at', 'DESC']]

            })
            res.status(200).json(response(200, true, "Berhasil mendapatkan data order", orderRes))

        }catch(err){
            console.log(err)
            next(err)
        }
    }

    static async getOne(req, res, next){
        const orderID =req.params.orderID;
        try{
            const orderRes = await Order.findOne({
                where:{id: orderID},
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
            })
            res.status(200).json(response(200, true, "Berhasil mendapatkan data order", orderRes))
            
        }catch(err){
            console.og(err)
            next(err)
        }
    }
};
