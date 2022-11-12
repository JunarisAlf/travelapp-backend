'use strict';
/** @type {import('sequelize-cli').Migration} */

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('driver', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            wa_nummber: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: true
            },
            password: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            departure_at: {
                type: Sequelize.DATE,
                allowNull: false
            },
            price: {
                type: Sequelize.INTEGER,
                allowNull: true
            },
            car_type: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            location_from: {
                type: Sequelize.INTEGER,
                allowNull: true,
            },
            location_to: {
                type: Sequelize.INTEGER,
                allowNull: true,
            },
            created_at: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updated_at: {
                allowNull: false,
                type: Sequelize.DATE,
            },
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('driver');
    },
};
