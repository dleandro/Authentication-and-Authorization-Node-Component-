const SequelizeDataTypes = require('sequelize'),
    sequelize = require('../../common/util/db')

const Role = sequelize.define('Role', {
    // attributes
    id: {
        type: SequelizeDataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
        unique: true
    },
    role: {
        type: SequelizeDataTypes.STRING,
        allowNull: false
    },
    parent_role: {
        type: SequelizeDataTypes.INTEGER
    }
}, {
    timestamps: false
});


module.exports = Role
