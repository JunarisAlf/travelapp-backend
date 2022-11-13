'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Seat extends Model {
        static associate(models) {
           
        }
    }
    Seat.init(
        {
            id: {
                allowNull: false,
                primaryKey: true,
                type: DataTypes.STRING,
            },
            catatan: {
                allowNull: false,
                type: DataTypes.STRING,
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
            tableName: 'seat',
            modelName: 'Seat',
            timestamps: true,
            createdAt: 'created_at',
            updatedAt: 'updated_at',
        }
    );
    return Seat;
};
