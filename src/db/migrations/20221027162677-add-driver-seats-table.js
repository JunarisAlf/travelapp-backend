'use strict';
/** @type {import('sequelize-cli').Migration} */

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('driver_seat', {
            id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.STRING,
            },
            driver_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            seat_id: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            status: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            created_at: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updated_at: {
                allowNull: false,
                type: Sequelize.DATE,
            }
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('driver_seat');
    },
};
