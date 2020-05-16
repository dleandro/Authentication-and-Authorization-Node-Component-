const Sequelize = require('sequelize'),
    sequelize = require('../../common/util/db')

const Protocols = sequelize.define('Protocols', {
    // attributes
    protocol: {
        type: Sequelize.STRING,
        autoIncrement: true,
        allowNull: false,
        primaryKey:true
    },
    active:{
        type:Sequelize.BOOLEAN
    }
}, {
    timestamps: false
});


module.exports = Protocols