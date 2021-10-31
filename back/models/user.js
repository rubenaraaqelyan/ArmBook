'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({User,Post,Notify, Message,Conversation,Comment,UserFollower,Like}) {
      User.hasMany(Post, {
        foreignKey: 'userId',
        as: "posts"
      })
      User.hasMany(Notify, {
        foreignKey: 'usersId'
      })
      User.hasMany(Message, {
        foreignKey: 'senderId'
      })
      User.hasMany(Conversation, {
        foreignKey: 'recipient_id'
      })
      User.hasMany(Comment, {
        foreignKey: 'personId'
      })
      User.belongsToMany(User, {
        through: UserFollower,
        as: "followers",
        foreignKey: "userId"
      })
      User.belongsToMany(User, {
        through: UserFollower,
        as: "followings",
        foreignKey: "followerId"
      })
      User.belongsToMany(Post, {
        through: Like,
        as: "likes",
        foreignKey: "userId"
      })
      User.hasMany(UserFollower, {
        foreignKey: 'followerId',
        as:'users'
      });
    }
  };
  User.init({
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      required:true,
    },
    avatar: {
      type: DataTypes.STRING,
      allowNull: true,
      get() {
        const avatar = this.getDataValue('avatar');
        if (avatar !== undefined){
          return avatar;
        }
        return undefined;
      }
    },
    role:{
      type: DataTypes.STRING,
      default:'user'
    },
    gender:{
      type: DataTypes.STRING,
      allowNull:false,
    },
    activation_code: {
      type: DataTypes.UUID,
      allowNull: true,
      unique: 'active_code',
    },
    status: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: 'pending',
    },
    mobile:{
      type: DataTypes.STRING,
    },
    address:{
      type: DataTypes.STRING,
    },
    story:{
      type: DataTypes.STRING,
    },
    birthDay:{
      type:DataTypes.DATE,
    },
    website:{
      type: DataTypes.STRING,
    }
  }, {
    sequelize,
    modelName: 'User',
    tableName:'users'
  });
  return User;
};
