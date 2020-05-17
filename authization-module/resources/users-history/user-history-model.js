const SequelizeDataTypes = require('sequelize'),
    sequelize = require('../../common/util/db')

const Users_History = sequelize.define('Users_History', {
    // attributes
    user_id: {
        type: SequelizeDataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    date: {
        type: SequelizeDataTypes.DATE,
        allowNull: false
    },
    description: {
        type: SequelizeDataTypes.STRING
    }
}, {
    timestamps: false
});


module.exports = Users_History