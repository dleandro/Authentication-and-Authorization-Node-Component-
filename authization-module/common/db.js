'use strict'

const
    config = require("./config/config"),
    { Sequelize } = require('sequelize'),
    chalk = require('chalk')


// setup database connection with sequelize
let sequelize
process.env.INSTANCE_CONNECTION_NAME?
    sequelize = new Sequelize(config.database_opts.database, config.database_opts.user, config.database_opts.password, {
    host:process.env.INSTANCE_CONNECTION_NAME,
    dialect: config.database_opts.dbms,
    query: { raw: true },
    dialectOptions:{
            socketPath: process.env.INSTANCE_CONNECTION_NAME
    }
})
:
 sequelize = new Sequelize(config.database_opts.database, config.database_opts.user, config.database_opts.password, {
    host:config.database_opts.host,
    dialect: config.database_opts.dbms,
    query: { raw: true }
})

config.sequelize = sequelize


async function databasesetup(rbac_opts) {

    console.log(chalk.blue('DATABASE SETUP'))

    // defining the EA model
    const { List, AuthenticationTypes } = require('../resources/sequelize-model')

    // sync present state of the database with our models
    await sequelize.sync()
    
    // Set up default values for Lists and Available authentication identity providers
    const promiseArr = [
        List.findOrCreate({ where: { "list": "BLACK" } }),
        List.findOrCreate({ where: { "list": "GREY" } }),
        List.findOrCreate({ where: { "list": "RED" } }),
        AuthenticationTypes.findOrCreate({ where: { "protocol": "oauth2", "idp": "google" }, defaults: { "active": 1 } }),
        AuthenticationTypes.findOrCreate({ where: { "protocol": "oauth2", "idp": "office365" }, defaults: { "active": 1 } }),
        AuthenticationTypes.findOrCreate({ where: { "protocol": "saml", "idp": "office365" }, defaults: { "active": 1 } }),
        require('./rbac')(rbac_opts)
    ]

    

    // using promise.all to maximize performance
    return Promise.all(promiseArr).then(_ => console.log(chalk.green('MODULE SET UP CORRECTLY')))

}

module.exports = databasesetup