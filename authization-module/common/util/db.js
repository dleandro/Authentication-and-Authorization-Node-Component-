'use strict'

const
    config = require("../config/config"),
    { Sequelize } = require('sequelize')

// setup database connection with sequelize
const sequelize = new Sequelize(config.database_opts.database, config.database_opts.user, config.database_opts.password, {
    host: config.database_opts.host,
    dialect: config.sgbd,
    query: { raw: true }
})

config.sequelize = sequelize


async function databasesetup(rbac_opts) {

    // defining the EA model
    const { User, List, Protocols } = require('../../resources/sequelize-model')

    // sync present state of the database with our models
    await sequelize.sync()

    console.log('database setup correctly')

    User.create({ username: "superuser", password: "superuser" })
    List.bulkCreate([{ "list": "BLACK" }, { "list": "GREY" }, { "list": "RED" }])
    Protocols.bulkCreate([{ "protocol": "Google", "active": 1 }, { "protocol": "AzureAD", "active": 1 }, { "protocol": "Saml", "active": 1 }])

    return require('../middleware/rbac')(rbac_opts)
}

module.exports = databasesetup
