'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {

        return queryInterface.bulkInsert('location', [
            {
                kabupaten: "Pekanbaru",
                kecamatan: "semua daerah",
                created_at: new Date(),
                updated_at: new Date(),
            },
            {
                kabupaten: "Indragiri Hilir",
                kecamatan: "Terminal A",
                created_at: new Date(),
                updated_at: new Date(),
            },
            {
                kabupaten: "Indragiri Hilir",
                kecamatan: "Terminal B",
                created_at: new Date(),
                updated_at: new Date(),
            },
            {
                kabupaten: "Indragiri Hilir",
                kecamatan: "Terminal C",
                created_at: new Date(),
                updated_at: new Date(),
            },
        ]);
    },

    async down(queryInterface, Sequelize) {
        return queryInterface.bulkDelete('location', null, {});
    },
};
