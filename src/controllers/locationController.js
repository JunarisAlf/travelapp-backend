const {Location} = require('../db/models');
const response = require('../utils/response');

module.exports = class locationController {
    static async createLocation(req, res, next) {
        const {kabupaten,kecamatan, catatan} = req.body;
        try{
            const locRes = await Location.create({
                kabupaten,
                kecamatan,
                catatan
            })
            res.status(201).json(response(201, true, "Lokasi baru berhasil ditambahkan", locRes))
        }catch(err){
            next(err)
        }
    }
    static async getAllLocation(req, res, next) {
        try {
            const locRes = await Location.findAll();
            res.status(200).json(
                response(
                    200,
                    true,
                    'Berhasil mendapatkan semua data driver',
                    locRes
                )
            );
        } catch (err) {
            next(err);
        }
    }

    static async updateLocation(req, res, next) {
        const {kabupaten,kecamatan, catatan} = req.body;
        const locID = req.params.locID
        try {
            const locRes = await Location.update({
                kabupaten,
                kecamatan,
                catatan
            },{
                where: {id: locID},
                returning: true,
                plain: true,
            });
            res.status(200).json(
                response(
                    200,
                    true,
                    'Berhasil mendapatkan semua data driver',
                    locRes[1]
                )
            );
        } catch (err) {
            next(err);
        }
    }

    static async deleteLocation(req, res, next){
        const locID = req.params.locID
        try{
            await Location.destroy({where: {id: locID}})
            res.status(200).json(
                response(200, true, 'Berhasil menghapus Lokasi')
            );
        }catch(err){
            next(err)
        }
    }
};
