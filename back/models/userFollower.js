'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class UserFollower extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            const {UserFollower, User} = models;
                UserFollower.belongsTo(User, {
                foreignKey:'followerId',
                    as: 'followersUser',
            });
        }
    }

    UserFollower.init({
        userId: {
            type: DataTypes.INTEGER,
            onDelete: 'Cascade',
            references: {
                model: 'users',
                key: 'id'
            }
        },
        followerId: {
            type: DataTypes.INTEGER,
        },
        accepted: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    }, {
        sequelize,
        modelName: 'UserFollower',
        tableName: 'userFollowers'
    });
    return UserFollower;
};
