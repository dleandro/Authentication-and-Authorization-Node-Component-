const SequelizeDataTypes = require('sequelize'),
    sequelize = require('../../common/util/db'),
    User = require('../users/user-model')

const Idp = sequelize.define('Idp', {
    // attributes
    user_id: {
        type: SequelizeDataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
            // This is a reference to another model
            model: User,

            // This is the column name of the referenced model
            key: 'id',

        }
    },
    idp_id: {
        type: SequelizeDataTypes.STRING(1234)
        // allowNull defaults to true
    },
    idpname: {
        type: SequelizeDataTypes.STRING
    }
}, {
    timestamps: false
});


module.exports = Idp