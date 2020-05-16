const Sequelize = require('sequelize'),
    sequelize = require('../../common/util/db')

const RolePermission = sequelize.define('RolePermission', {
    // attributes
    role: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey:true
    },
    permission: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey:true
    }
}, {
    timestamps: false
});


module.exports = RolePermission