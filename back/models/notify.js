'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Notify extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Notify,User}) {
      Notify.belongsTo(User, {
        foreignKey: 'usersId'
      })
    }
  };
  Notify.init({
    usersId:{
      type: DataTypes.INTEGER,
      onDelete: 'Cascade',
      references: {
        model: 'users',
        key: 'id'
      }
    },
    recipients:{
      type:DataTypes.STRING,
    },
    url:{
      type:DataTypes.STRING,
      allowNull:true
    },
    text:{
      type:DataTypes.STRING,
      allowNull:true
    },
    content:{
      type:DataTypes.STRING,
      allowNull: true
    },
    image:{
      type:DataTypes.STRING,
    },
    isRead:{
      type:DataTypes.STRING,
      default:'false'
    }
  }, {
    sequelize,
    modelName: 'Notify',
    tableName: 'notifies'
  });
  return Notify;
};
