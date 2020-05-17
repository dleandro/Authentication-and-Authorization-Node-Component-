const SequelizeDatatypes = require('sequelize'),
    sequelize = require('../../common/util/db')

const User = sequelize.define('User', {
    // attributes
    id: {
        type: SequelizeDatatypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    username: {
        type: SequelizeDatatypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: SequelizeDatatypes.STRING
    }
}, {
    timestamps: false
});


module.exports = User