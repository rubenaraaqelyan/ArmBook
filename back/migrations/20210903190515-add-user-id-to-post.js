'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.addColumn('Posts', 'userId', {
            type: Sequelize.INTEGER,
            onDelete: 'Cascade',
            references: {
                model: 'Users',
                key: 'id'
            }
        })
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.removeColumn('Posts', 'userId');
    }
};
