'use strict';
/** @type {import('sequelize-cli').Migration} */

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('order', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            admin_id: {
                allowNull: false,
                type: Sequelize.INTEGER,
            },
            driver_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            customer_name: {
                type: Sequelize.STRING,
                allowNull: false
            },
            destination: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            from: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            catatan: {
                type: Sequelize.STRING,
                allowNull: false
            },
            status: {
                type: Sequelize.STRING,
                allowNull: false
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
        await queryInterface.dropTable('order');
    },
};
