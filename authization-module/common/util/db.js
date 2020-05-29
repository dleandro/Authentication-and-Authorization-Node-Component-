'use strict'

const
    config = require("../config/config"),
    {Sequelize} = require('sequelize')

// setup database connection with sequelize
const sequelize = new Sequelize(config.database_opts.database, config.database_opts.user, config.database_opts.password, {
    host: config.database_opts.host,
    dialect: config.sgbd,
    query:{raw:true}
})

// sync present state of the database with our models
sequelize.sync().then(_ => console.log("All models were synchronized successfully."))

module.exports = sequelize
