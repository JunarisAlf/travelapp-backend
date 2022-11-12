'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Room extends Model {
        static associate(models) {
            this.hasMany(models.File, {foreignKey: "room_id"})
        }
    }
    Room.init(
        {
            id: {
                allowNull: false,
                primaryKey: true,
                type: DataTypes.UUIDV4,
                defaultValue: DataTypes.UUIDV4
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true
            },
            pin: {
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
            },
            deleted_at: {
                allowNull: false,
                type: DataTypes.DATE,
            }
        },
        {
            sequelize,
            tableName: 'room',
            modelName: 'Room',
            timestamps: true,
            createdAt: "created_at",
            updatedAt: "updated_at"
        }
    );
    return Room;
};
