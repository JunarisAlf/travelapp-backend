'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class File extends Model {
        static associate(models) {
            this.belongsTo(models.User, {
                targetKey: 'id',
                foreignKey: 'user_id',
                onDelete: 'SET NULL',
                onUpdate: 'CASCADE',
            });
            this.belongsTo(models.Room, {
                targetKey: 'id',
                foreignKey: 'room_id',
                onDelete: 'SET NULL',
                onUpdate: 'CASCADE',
            });
        }
    }
    File.init(
        {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER,
            },
            user_id: {
                type: DataTypes.INTEGER,
            },
            room_id: {
                type: DataTypes.UUID,
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            extention: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            type: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            size: {
                type: DataTypes.INTEGER,
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
                allowNull: true,
                type: DataTypes.DATE,
            },
        },
        {
            sequelize,
            tableName: 'file',
            modelName: 'File',
            timestamps: true,
            createdAt: 'created_at',
            updatedAt: 'updated_at',
        }
    );
    return File;
};
