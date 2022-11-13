'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class DriverSeat extends Model {
        static associate(models) {
            this.belongsTo(models.Driver, {
                targetKey: 'id',
                foreignKey: 'driver_id',
                onDelete: 'SET NULL',
                onUpdate: 'CASCADE',
            });
            this.belongsTo(models.Seat, {
                targetKey: 'id',
                foreignKey: 'seat_id',
                onDelete: 'RESTRICT',
                onUpdate: 'CASCADE',
            });
        }
    }
    DriverSeat.init(
        {
            id: {
                allowNull: false,
                primaryKey: true,
                type: DataTypes.STRING,
            },
            driver_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            seat_id: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            status: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            created_at: {
                allowNull: false,
                type: DataTypes.DATE,
            },
            updated_at: {
                allowNull: false,
                type: DataTypes.DATE,
            }
        },
        {
            indexes: [{name: 'driver_seat', fields: ['driver_id', 'seat_id']}],
            sequelize,
            tableName: 'driver_seat',
            modelName: 'DriverSeat',
            timestamps: true,
            createdAt: 'created_at',
            updatedAt: 'updated_at',
        }
    );
    return DriverSeat;
};
