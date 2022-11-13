'use strict';
const bcrypt = require('bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        const password = 'driver1234';
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        return queryInterface.bulkInsert('driver', [
            {
                name: 'driver01',
                wa_number: '082200001111',
                password: hashedPassword,
                car_type: "Inova",
                departure_at: new Date(),
                price: 250000,
                location_from: 1,
                location_to: 2,
                created_at: new Date(),
                updated_at: new Date(),
            },
        ]);
    },

    async down(queryInterface, Sequelize) {
        return queryInterface.bulkDelete('driver', null, {});
    },
};
