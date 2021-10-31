'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Message extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Message, User}) {
      Message.belongsTo(User, {
        foreignKey: 'senderId'
      })
    }
  };
  Message.init({
    senderId:{
      type:DataTypes.BIGINT,
      allowNull: false,
      onDelete: 'Cascade',
      references: {
        model: 'users',
        key: 'id'
      }
    },
    text:{
      type:DataTypes.STRING,
    },
    media:{
      type:DataTypes.STRING,
    },
    call:{
      type:DataTypes.STRING
    }
  }, {
    sequelize,
    modelName: 'Message',
    tableName: 'Messages'
  });
  return Message;
};
