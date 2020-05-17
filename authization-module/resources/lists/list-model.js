const SequelizeDataTypes = require('sequelize'),
    sequelize = require('../../common/util/db'),
    User = require('../users/user-model')

const List = sequelize.define('List', {
    // attributes
    id: {
        type: SequelizeDataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    user_id: {
        type: SequelizeDataTypes.INTEGER,
        references: {
            // This is a reference to another model
            model: User,

            // This is the column name of the referenced model
            key: 'id',

        }
    },
    LIST: {
        type: SequelizeDataTypes.STRING
    },
    start_date: {
        type: SequelizeDataTypes.DATE
    },
    end_date: {
        type: SequelizeDataTypes.DATE
    },
    updater: {
        type: SequelizeDataTypes.INTEGER
    },
    active: {
        type: SequelizeDataTypes.BOOLEAN
    }
}, {
    timestamps: false
});


module.exports = List
