'use strict'

const mariadb = require('mariadb');
const pool = mariadb.createPool({
  host: '127.0.0.1', 
  user:'root', 
  password: 'admin',
  connectionLimit: 5
});

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