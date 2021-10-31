'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Conversation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Conversation, User}) {
        Conversation.belongsTo(User, {
          foreignKey: 'recipient_id'
        })
    }
  };
  Conversation.init({
    recipient_id:{
      type: DataTypes.INTEGER,
      allowNull: false,
      onDelete: 'Cascade',
      references: {
        model: 'users',
        key: 'id'
      }
    },
    text:{
      type:DataTypes.STRING,
      allowNull:true
    },
    media:{
      type:DataTypes.STRING,
    },
    call:{
      type:DataTypes.STRING
    }
  }, {
    sequelize,
    modelName: 'Conversation',
    tableName: 'Conversations'
  });
  return Conversation;
};
