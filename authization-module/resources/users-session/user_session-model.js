const SequelizeDataTypes = require('sequelize'),
    sequelize = require('../../common/util/db'),
    User = require('../users/user-model')

const UsersSession = sequelize.define('UsersSession', {
    // attributes
    user_id: {
        type: SequelizeDataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
        references: {
            // This is a reference to another model
            model: User,

            // This is the column name of the referenced model
            key: 'id',

        }
    },
    session_id: {
        type: SequelizeDataTypes.STRING,
        allowNull: false,
        primaryKey: true
    }
}, {
    timestamps: false
});


module.exports = UsersSession