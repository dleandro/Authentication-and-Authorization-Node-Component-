const Sequelize = require('sequelize'),
    sequelize = require('../../common/util/db')

const UserSession = sequelize.define('User_Session', {
    // attributes
    user_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey:true
    },
    session_id: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey:true
    }
}, {
    timestamps: false
});


module.exports = UserSession