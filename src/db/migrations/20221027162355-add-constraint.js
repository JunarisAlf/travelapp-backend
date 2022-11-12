'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.sequelize.transaction((t) => {
            return Promise.all([
                queryInterface.addConstraint(
                    'driver',
                    {
                        fields: ['location_from'],
                        type: 'foreign key',
                        name: 'driver_from',
                        references: {
                            table: 'location',
                            field: 'id',
                        },
                        onDelete: 'restrict',
                        onUpdate: 'cascade',
                    },
                    {transaction: t}
                ),
                queryInterface.addConstraint(
                    'driver',
                    {
                        fields: ['location_to'],
                        type: 'foreign key',
                        name: 'driver_to',
                        references: {
                            table: 'location',
                            field: 'id',
                        },
                        onDelete: 'restrict',
                        onUpdate: 'cascade',
                    },
                    {transaction: t}
                ),
                queryInterface.addConstraint(
                    'seat',
                    {
                        fields: ['driver_id'],
                        type: 'foreign key',
                        name: 'driver_has_seat',
                        references: {
                            table: 'driver',
                            field: 'id',
                        },
                        onDelete: 'restrict',
                        onUpdate: 'cascade',
                    },
                    {transaction: t}
                ),
            ]);
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.sequelize.transaction((t) => {
            return Promise.all([
                queryInterface.removeConstraint('driver', 'driver_from', {
                    transaction: t,
                }),
                queryInterface.removeConstraint('driver', 'driver_to', {
                    transaction: t,
                }),
                queryInterface.removeConstraint('seat', 'driver_has_seat', {
                    transaction: t,
                }),
            ]);
        });
    },
};
