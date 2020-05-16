const Sequelize = require('sequelize'),
    sequelize = require('../../common/util/db')

const Permission = sequelize.define('Permission', {
    // attributes
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey:true
    },
    method: {
        type: Sequelize.STRING,
        allowNull: false
    },
    path: {
        type: Sequelize.STRING
    },
    description: {
        type: Sequelize.STRING
    }
}, {
    timestamps: false
});


module.exports = Permission