'use strict'

const
  config = require("../config/config")

/**
 *
 * @type {{connect: connect}}
 */
module.exports = {

  /**
   *
   * @returns {Promise<PoolConnection>}
   */
  connect: config.sgbd == "mariadb" ? async () => {
    const mariadb = require('mariadb')

    const pool = mariadb.createPool(config.database_opts)

    let connection
    try {
      connection = await pool.getConnection();
      return connection

    } catch (err) {

      console.log('unable to connect')

      throw err;
    }
  } : async () => {

    const { Pool } = require('pg')

    var pool

    try {

      pool = new Pool(config.database_opts)
      return pool
      
    } catch (err) {

      console.log('unable to connect')

      throw err;
    }

  }


}