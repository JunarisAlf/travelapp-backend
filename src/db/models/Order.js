'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Order extends Model {
        static associate(models) {
            
        }
    }
    Order.init(
        {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER,
            },
            admin_id: {
                allowNull: false,
                type: DataTypes.INTEGER,
            },
            driver_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            customer_name: {
                type: DataTypes.STRING,
                allowNull: false
            },
            destination: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            from: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            catatan: {
                type: DataTypes.STRING,
                allowNull: false
            },
            status: {
                type: DataTypes.STRING,
                allowNull: false
            },
            created_at: {
                allowNull: false,
                type: DataTypes.DATE,
            },
            updated_at: {
                allowNull: false,
                type: DataTypes.DATE,
            }, 
        },
        {
            sequelize,
            tableName: 'order',
            modelName: 'Order',
            timestamps: true,
            createdAt: 'created_at',
            updatedAt: 'updated_at',
        }
    );
    return Order;
};
