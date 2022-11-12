'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Admin extends Model {
        static associate(models) {
        }
    }
    Admin.init(
        {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER,
            },
            name: {
                allowNull: false,
                type: DataTypes.STRING,
            },
            username: {
                allowNull: false,
                type: DataTypes.STRING,
            },
            password: {
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
        },
        {
            sequelize,
            tableName: 'admin',
            modelName: 'Admin',
            timestamps: true,
            createdAt: 'created_at',
            updatedAt: 'updated_at',
        }
    );
    return Admin;
};
