'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Comment, User,Post}) {
        Comment.belongsTo(User, {
          foreignKey: 'personId'
        })
      Post.hasMany(Comment, {
        foreignKey: 'postId',
        as: 'commentPost',
      })
    }
  };
  Comment.init({
    content: {
      type: DataTypes.STRING,
      required: true
    },
    personId:{
      type:DataTypes.INTEGER,
      allowNull:false,
      onDelete: 'Cascade',
      references: {
        model: 'users',
        key: 'id'
      }
    },
  }, {
    sequelize,
    modelName: 'Comment',
    tableName: 'Comments'
  });
  return Comment;
};
