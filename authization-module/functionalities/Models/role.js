const Sequelize = require('sequelize'),
    sequelize = require('../../common/util/db')

const Role = sequelize.define('Role', {
    // attributes
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey:true
    },
    role: {
        type: Sequelize.STRING,
        allowNull: false
    },
    parent_role: {
        type: Sequelize.INTEGER
    }
}, {
    timestamps: false
});


module.exports = Role