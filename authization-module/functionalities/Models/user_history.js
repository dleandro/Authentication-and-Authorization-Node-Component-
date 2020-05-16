const Sequelize = require('sequelize'),
    sequelize = require('../../common/util/db')

const User_History = sequelize.define('User_History', {
    // attributes
    user_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey:true
    },
    date: {
        type: Sequelize.DATE,
        allowNull: false
    },
    description: {
        type: Sequelize.STRING
    }
}, {
    timestamps: false
});


module.exports = User_History