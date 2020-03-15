const mariadb = require('mariadb');
const pool = mariadb.createPool({
     host: 'localhost:3306', 
     user:'root', 
     password: 'mariadb',
     connectionLimit: 5
});

module.exports ={
connect:async function connect() {
    let conn;
    try {
      return conn = await pool.getConnection();
    } catch (err) {
      throw err;
    }
  }
}