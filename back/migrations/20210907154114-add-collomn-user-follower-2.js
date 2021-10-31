'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('userFollowers', 'userId', {
      type: Sequelize.INTEGER,
      onDelete: 'Cascade',
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('userFollowers',
      'userId'
    )
  }
};
