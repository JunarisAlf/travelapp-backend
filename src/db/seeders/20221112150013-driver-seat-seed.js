'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        const status = ['not-avalaible', 'avalaible', 'not-used' ]
        return queryInterface.bulkInsert('driver_seat', [
            {
                id: "1-A1",
                driver_id: 1,
                seat_id: "A1",
                status: status[0],
                created_at: new Date(),
                updated_at: new Date(),
            },
            {
                id: "1-B1",
                driver_id: 1,
                seat_id: "B1",
                status: status[0],
                created_at: new Date(),
                updated_at: new Date(),
            },
            {
                id: "1-B2",
                driver_id: 1,
                seat_id: "B2",
                status: status[1],
                created_at: new Date(),
                updated_at: new Date(),
            },
            {
                id: "1-B3",
                driver_id: 1,
                seat_id: "B3",
                status: status[0],
                created_at: new Date(),
                updated_at: new Date(),
            },
            {
                id: "1-C1",
                driver_id: 1,
                seat_id: "C1",
                status: status[1],
                created_at: new Date(),
                updated_at: new Date(),
            },
            {
                id: "1-C2",
                driver_id: 1,
                seat_id: "C2",
                status: status[2],
                created_at: new Date(),
                updated_at: new Date(),
            },
            {
                id: "1-C3",
                driver_id: 1,
                seat_id: "C3",
                status: status[1],
                created_at: new Date(),
                updated_at: new Date(),
            },
        ]);
    },

    async down(queryInterface, Sequelize) {
        return queryInterface.bulkDelete('driver_seat', null, {});
    },
};
