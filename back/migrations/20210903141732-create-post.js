'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Posts', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            content: {
                type: Sequelize.STRING
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
                type: Sequelize.DOUBLE,
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
        await queryInterface.dropTable('Posts');
    }
};
