'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('userFollowers', 'followerId', {
      type: Sequelize.INTEGER,
      onDelete: 'Cascade',
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('userFollowers',
      'followerId'
    )
  }
};
