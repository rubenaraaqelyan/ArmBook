'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      firstName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      lastName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
        required:true,
      },
      avatar: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      role:{
        type: Sequelize.STRING,
        default:'user'
      },
      gender:{
        type: Sequelize.STRING,
        allowNull:false,
      },
      activation_code: {
        type: Sequelize.UUID,
        allowNull: true,
        unique: 'active_code',
      },
      status: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: 'pending',
      },
      mobile:{
        type: Sequelize.STRING,
      },
      address:{
        type: Sequelize.STRING,
      },
      story:{
        type: Sequelize.STRING,
      },
      birthDay:{
        type:Sequelize.DATE,
      },
      website:{
        type: Sequelize.STRING,
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
    await queryInterface.dropTable('Users');
  }
};
