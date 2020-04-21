'use strict'

const
mariadb = require('mariadb'),
config = require("../config/config")

const pool = mariadb.createPool(config.database_opts)

module.exports = {
  
  connect: async function connect() {
    
    try {
      return await pool.getConnection();
      
    } catch (err) {
      
      console.log('unable to connect')
      
      throw err;
    }
    
  }
  
}