'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Post extends Model {
        static associate({User, Post, Like}) {
            Post.belongsTo(User, {
                foreignKey: 'userId',
                as: "user"
            })
            Post.belongsToMany(User, {
                through: Like,
                foreignKey: "postId",
                as: "liked"
            })
        }
    };
    Post.init({
        content: {
            type: DataTypes.STRING
        },
        image: {
            type: DataTypes.STRING,
            allowNull: true,
            get() {
                const image = this.getDataValue('image');
                if (image !== undefined) {
                    return image;
                }
                return undefined;
            }
        },
        like: {
            type: DataTypes.INTEGER,
        },
        userId: {
            type: DataTypes.INTEGER,
            onDelete: 'Cascade',
            references: {
                model: 'users',
                key: 'userId'
            }
        }
    }, {
        sequelize,
        modelName: 'Post',
        tableName: 'posts'
    });
    return Post;
};
