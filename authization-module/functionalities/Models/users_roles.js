const Sequelize = require('sequelize'),
    sequelize = require('../../common/util/db')

const UserRoles = sequelize.define('UserRoles', {
    // attributes
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey:true
    },
    user_id: {
        type: Sequelize.INTEGER
    },
    role_id: {
        type: Sequelize.INTEGER
    },
    start_date: {
        type: Sequelize.DATE
    },
    end_date: {
        type: Sequelize.DATE
    },
    updater: {
        type: Sequelize.INTEGER
    },
    active: {
        type: Sequelize.BOOLEAN
    }
}, {
    timestamps: false
});


module.exports = UserRoles