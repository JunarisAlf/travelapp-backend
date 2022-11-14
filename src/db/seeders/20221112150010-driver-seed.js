'use strict';
const bcrypt = require('bcrypt');
const moment = require('moment');

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
                departure_at: new Date(2022, 10, 10, 5),
                departure: 'pagi',
                price: 250000,
                location_from: 1,
                location_to: 2,
                created_at: new Date(),
                updated_at: new Date(),
            },
            {
                name: 'driver01',
                wa_number: '082200001112',
                password: hashedPassword,
                car_type: "Inova",
                departure_at: new Date(2022, 10, 10, 11),
                departure: 'siang',
                price: 250000,
                location_from: 1,
                location_to: 3,
                created_at: new Date(),
                updated_at: new Date(),
            },
            {
                name: 'driver01',
                wa_number: '082200001113',
                password: hashedPassword,
                car_type: "Inova",
                departure_at: new Date(2022, 10, 10, 7),
                departure: 'pagi',
                price: 250000,
                location_from: 1,
                location_to: 2,
                created_at: new Date(),
                updated_at: new Date(),
            },
            {
                name: 'driver01',
                wa_number: '082200001114',
                password: hashedPassword,
                car_type: "Inova",
                departure_at: new Date(2022, 10, 10, 15),
                departure: 'sore',
                price: 250000,
                location_from: 2,
                location_to: 1,
                created_at: new Date(),
                updated_at: new Date(),
            },
        ]);
    },

    async down(queryInterface, Sequelize) {
        return queryInterface.bulkDelete('driver', null, {});
    },
};
