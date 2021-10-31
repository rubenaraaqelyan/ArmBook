'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Like extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Like, Post}) {
      Post.hasMany(Like, {
        foreignKey: 'postId',
        as: 'likePost',
      })
    }
  };
  Like.init({
    userId: {
      type: DataTypes.INTEGER,
      onDelete: 'Cascade',
      references: {
        model: 'users',
        key: 'id'
      },
    }
  }, {
    sequelize,
    modelName: 'Like',
    tableName: 'likes'
  });
  return Like;
};
