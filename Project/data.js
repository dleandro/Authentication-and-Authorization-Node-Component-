const db=require('./db')



module.exports={
    getBooks:async function getBooks(){
        try{
    const conn=await db.connect()
    const rows = await conn.query("SELECT * from books");
      console.log(rows); //[ {val: 1}, meta: ... ]
      return rows
        }finally{
        conn.end();
    }
}
}