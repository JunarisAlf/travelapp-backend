'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Driver extends Model {
        static associate(models) {
            this.belongsTo(models.Location, {
                as: 'from',
                targetKey: 'id',
                foreignKey: 'location_from',
                onDelete: 'SET NULL',
                onUpdate: 'CASCADE',
            });

            this.belongsTo(models.Location, {
                as: 'to',
                targetKey: 'id',
                foreignKey: 'location_to',
                onDelete: 'SET NULL',
                onUpdate: 'CASCADE',
            });
            this.hasMany(models.DriverSeat, {
                as: 'seats',
                foreignKey: 'driver_id',

            })
            this.hasMany(models.Order, {
                foreignKey: 'driver_id',
            });
        }
    }
    Driver.init(
        {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER,
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false
            },
            wa_number: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            departure_at: {
                type: DataTypes.DATE,
                allowNull: true
            },
            price: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            car_type: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            location_from: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            location_to: {
                type: DataTypes.INTEGER,
                allowNull: true,
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
            tableName: 'driver',
            modelName: 'Driver',
            timestamps: true,
            createdAt: 'created_at',
            updatedAt: 'updated_at',
        }
    );
    return Driver;
};
