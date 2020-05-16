const Sequelize = require('sequelize'),
    sequelize = require('../../common/util/db')

const List = sequelize.define('List', {
    // attributes
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey:true
    },
    user_id: {
        type: Sequelize.STRING
    },
    list: {
        type: Sequelize.STRING
    },
    start_date: {
        type: Sequelize.DATE
    },
    end_date: {
        type: Sequelize.DATE
    },
    updater: {
        type: Sequelize.INTEGER
    },
    active: {
        type: Sequelize.BOOLEAN
    }
}, {
    timestamps: false
});


module.exports = List
