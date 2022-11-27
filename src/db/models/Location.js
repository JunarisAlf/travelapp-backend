'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Location extends Model {
        static associate(models) {
            this.hasMany(models.Driver, {
                as: 'driver_from',
                foreignKey: 'location_from',
            });
            this.hasMany(models.Driver, {
                as: 'driver_to',
                foreignKey: 'location_to',
            });
            // this.hasMany(models.Order, {
            //     as: 'order_from',
            //     foreignKey: 'from',
            // });
            // this.hasMany(models.Order, {
            //     as: 'order_to',
            //     foreignKey: 'destination',
            // });
        }
    }
    Location.init(
        {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER,
            },
            kabupaten: {
                allowNull: false,
                type: DataTypes.STRING,
            },
            kecamatan: {
                allowNull: false,
                type: DataTypes.STRING,
            },
            catatan: {
                type: DataTypes.STRING,
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
            indexes: [{name: 'kabupaten_kecamatan', fields: ['kabupaten', 'kecamatan']}],
            sequelize,
            tableName: 'location',
            modelName: 'Location',
            timestamps: true,
            createdAt: 'created_at',
            updatedAt: 'updated_at',
        }
    );
    return Location;
};
