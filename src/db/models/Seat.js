'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Seat extends Model {
        static associate(models) {
            this.belongsTo(models.Driver, {
                targetKey: 'id',
                foreignKey: 'driver_id',
                onDelete: 'SET NULL',
                onUpdate: 'CASCADE',
            });
        }
    }
    Seat.init(
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
            is_avalaible: {
                type: DataTypes.BOOLEAN,
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
            sequelize,
            tableName: 'seat',
            modelName: 'Seat',
            timestamps: true,
            createdAt: 'created_at',
            updatedAt: 'updated_at',
        }
    );
    return Seat;
};
