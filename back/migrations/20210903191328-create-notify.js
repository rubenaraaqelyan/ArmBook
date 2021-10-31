'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('notifies', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      usersId:{
        type: Sequelize.INTEGER,
      },
      recipients:{
        type:Sequelize.STRING,
      },
      url:{
        type:Sequelize.STRING,
      },
      text:{
        type:Sequelize.STRING,
      },
      content:{
        type:Sequelize.STRING,
      },
      image:{
        type:Sequelize.STRING,
      },
      isRead:{
        type:Sequelize.STRING,
        default:'false'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('notifies');
  }
};
