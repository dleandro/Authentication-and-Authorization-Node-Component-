module.exports = {
    creates: (queryInterface, Sequelize) => {
        return queryInterface.createTable('users', {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },
            username: {
                type: Sequelize.String,
                allowNull: false
            },
            password: {
                type: Sequelize.String,
                allowNull: false
            }
        })
    }
}