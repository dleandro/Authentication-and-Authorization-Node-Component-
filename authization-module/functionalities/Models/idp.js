const Sequelize = require('sequelize'),
    sequelize = require('../../common/util/db')

const Idp = sequelize.define('Idp', {
    // attributes
    user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey:true,
    },
    idp_id: {
        type: Sequelize.STRING
        // allowNull defaults to true
    },
    idpname: {
        type: Sequelize.STRING
    }
}, {
    timestamps: false
});


module.exports = Idp