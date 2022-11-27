'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Order extends Model {
        static associate(models) {
            this.belongsTo(models.Driver, {
                targetKey: 'id',
                foreignKey: 'driver_id',
                onDelete: 'SET NULL',
                onUpdate: 'CASCADE',
            });
            this.belongsTo(models.Admin, {
                targetKey: 'id',
                foreignKey: 'admin_id',
                onDelete: 'SET NULL',
                onUpdate: 'CASCADE',
            });
            this.belongsTo(models.Location, {
                as: 'to',
                targetKey: 'id',
                foreignKey: 'destination',
                onDelete: 'SET NULL',
                onUpdate: 'CASCADE',
            });
            this.belongsTo(models.Location, {
                as: 'location_from',
                targetKey: 'id',
                foreignKey: 'from',
                onDelete: 'SET NULL',
                onUpdate: 'CASCADE',
            });
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
            customer: {
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
            departure: {
                type: DataTypes.STRING,
                allowNull: false
            },
            catatan: {
                type: DataTypes.STRING,
                allowNull: true
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
