const SequelizeDatatypes = require('sequelize'),
    sequelize = require('../../common/util/db'),
    User = require('../users/user-model'),
    Role = require('../roles/role-model')

const UsersRole = sequelize.define('UsersRole', {
    // attributes
    id: {
        type: SequelizeDatatypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    user_id: {
        type: SequelizeDatatypes.INTEGER,
        references: {
            // This is a reference to another model
            model: User,

            // This is the column name of the referenced model
            key: 'id',

        }
    },
    role_id: {
        type: SequelizeDatatypes.INTEGER,
        references: {
            // This is a reference to another model
            model: Role,

            // This is the column name of the referenced model
            key: 'id',

        }
    },
    start_date: {
        type: SequelizeDatatypes.DATE
    },
    end_date: {
        type: SequelizeDatatypes.DATE
    },
    updater: {
        type: SequelizeDatatypes.INTEGER
    },
    active: {
        type: SequelizeDatatypes.BOOLEAN
    }
}, {
    timestamps: false
});


module.exports = UsersRole