'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {

        return queryInterface.bulkInsert('seat', [
            {
                id: "A1",
                catatan: "Bangku depan sebelah sopir",
                created_at: new Date(),
                updated_at: new Date(),
            },
            {
                id: "B1",
                catatan: "Bangku baris kedua paling kiri",
                created_at: new Date(),
                updated_at: new Date(),
            },
            {
                id: "B2",
                catatan: "Bangku baris kedua tengah",
                created_at: new Date(),
                updated_at: new Date(),
            },
            {
                id: "B3",
                catatan: "Bangku baris kedua paling kanan",
                created_at: new Date(),
                updated_at: new Date(),
            },
            {
                id: "C1",
                catatan: "Bangku baris ketiga paling kiri",
                created_at: new Date(),
                updated_at: new Date(),
            },
            {
                id: "C2",
                catatan: "Bangku baris ketiga tengah",
                created_at: new Date(),
                updated_at: new Date(),
            },
            {
                id: "C3",
                catatan: "Bangku baris ketiga paling kanan",
                created_at: new Date(),
                updated_at: new Date(),
            },
           
        ]);
    },

    async down(queryInterface, Sequelize) {
        return queryInterface.bulkDelete('seat', null, {});
    },
};
