const Sequelize = require('sequelize'),
    sequelize = require('../../common/util/db')

const User = sequelize.define('User', {
    // attributes
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey:true
    },
    username: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING
    }
}, {
    timestamps: false
});


module.exports = User
