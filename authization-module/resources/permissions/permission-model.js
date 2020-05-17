const SequelizeDataTypes = require('sequelize'),
    sequelize = require('../../common/util/db')

const Permission = sequelize.define('Permission', {
    // attributes
    id: {
        type: SequelizeDataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    method: {
        type: SequelizeDataTypes.STRING,
        allowNull: false
    },
    path: {
        type: SequelizeDataTypes.STRING
    },
    description: {
        type: SequelizeDataTypes.STRING
    }
}, {
    timestamps: false
});


module.exports = Permission