module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('likes', 'postId', {
      type: Sequelize.INTEGER,
      onDelete: 'Cascade',
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('likes',
      'postId'
    )
  }
};
