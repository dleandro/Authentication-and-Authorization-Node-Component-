'use strict'

const mariadb = require('mariadb');
const pool = mariadb.createPool({
  host: 'eporqep6b4b8ql12.chr7pe7iynqr.eu-west-1.rds.amazonaws.com', 
  user:'jvp56pl2nbv1v9pw', 
  password: 'pv9t6oy23bsv65ri',
  connectionLimit: 5,
  database: "r15dtqer5c72jvex"
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