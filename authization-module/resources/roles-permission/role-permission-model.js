const SequelizeDataTypes = require('sequelize'),
    sequelize = require('../../common/util/db'),
    Role = require('../roles/role-model'),
    Permission = require('../permissions/permission-model')

const RolesPermission = sequelize.define('RolePermission', {
    // attributes
    role: {
        type: SequelizeDataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
            // This is a reference to another model
            model: Role,

            // This is the column name of the referenced model
            key: 'id',

        }
    },
    permission: {
        type: SequelizeDataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
            // This is a reference to another model
            model: Permission,

            // This is the column name of the referenced model
            key: 'id',

        }
    }
}, {
    timestamps: false
});


module.exports = RolesPermission
