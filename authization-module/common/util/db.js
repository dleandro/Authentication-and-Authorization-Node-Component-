'use strict'

const
  config = require("../config/config"),
  { Sequelize } = require('sequelize'),



  sequelize = new Sequelize(config.database_opts.database, config.database_opts.user, config.database_opts.password, {
    host: config.database_opts.host,
    dialect: config.sgbd
  })

module.exports = sequelize
