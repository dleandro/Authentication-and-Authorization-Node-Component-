'use strict'

const
    config = require("../config/config"),
    { Sequelize } = require('sequelize')

// setup database connection with sequelize
const sequelize = new Sequelize(config.database_opts.database, config.database_opts.user, config.database_opts.password, {
    host: config.database_opts.host,
    dialect: config.database_opts.sgbd,
    query: { raw: true }
})

config.sequelize = sequelize


async function databasesetup(rbac_opts) {

    // defining the EA model
    const { User, List, Protocols, Role } = require('../../resources/sequelize-model')

    // sync present state of the database with our models
    await sequelize.sync()

    // TODO: Should this use our own dals?? 
    // TODO: Falta adicionar este superuser a todas as permissions existentes
    await User.findOrCreate({ where: { "username": "superuser" }, defaults: { "password": "superuser" } })
    await List.findOrCreate({ where: { "list": "BLACK" } })
    await List.findOrCreate({ where: { "list": "GREY" } })
    await List.findOrCreate({ where: { "list": "RED" } })
    // TODO: No PG isto nao funciona, precisa de booleans.. como fazer isso 
    await Protocols.findOrCreate({ where: { "protocol": "Google" }, defaults: { "active": 1 } })
    await Protocols.findOrCreate({ where: { "protocol": "AzureAD" }, defaults: { "active": 1 } })
    await Protocols.findOrCreate({ where: { "protocol": "Saml" }, defaults: { "active": 1 } } )
    
    console.log('database setup correctly')
    
    return require('../middleware/rbac')(rbac_opts)
}

module.exports = databasesetup
