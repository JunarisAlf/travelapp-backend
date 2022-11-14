const {Location, Seat} = require('../db/models');
const response = require('../utils/response');

module.exports = class utilsController {
    static async getOptions(req, res, next) {
        try {
            const locationRes = await Location.findAll({
                attributes: ['id', 'kabupaten', 'kecamatan'],
            });
            const seatRes = await Seat.findAll({attributes: ['id', 'catatan']})
            const options = {
                location: locationRes,
                seats: seatRes
            }
            res.status(200).json(response(200, true, "Berhasil mendapatkan data", options))
        } catch (err) {
            next(err);
        }
    }
};
