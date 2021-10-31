module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.addColumn('Comments', 'postId', {
            type: Sequelize.INTEGER,
            onDelete: 'Cascade',
        })
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.removeColumn('Comments',
            'postId'
        )
    }
};
