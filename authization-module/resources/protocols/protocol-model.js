const SequelizeDataTypes = require('sequelize'),
    sequelize = require('../../common/util/db')

const Protocols = sequelize.define('Protocols', {
    // attributes
    protocol: {
        type: SequelizeDataTypes.STRING,
        allowNull: false,
        primaryKey: true
    },
    active: {
        type: SequelizeDataTypes.BOOLEAN
    }
}, {
    timestamps: false
});


module.exports = Protocols
