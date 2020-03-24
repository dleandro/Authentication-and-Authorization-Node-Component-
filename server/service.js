'use strict'

module.exports = function(data) {
    
    var moment = require('moment');
    return {
        
        // Checks if the user is in the database, if so it requests a login to occur
        loginUser: async function LoginUser(req, res) {
            var rows = await data.executeQuery(
                "SELECT * FROM Users WHERE username=? AND password=?",
                [req.body.username, req.body.password],
                'r15dtqer5c72jvex')
                
                if (rows.length == 1) {
                    req.login({
                        id:rows[0].id,
                        username: rows[0].username,
                        password: rows[0].password,
                        role:rows[0].role
                    }, (err) => {
                        if(err)res.end(err)
                        res.redirect('/homepage');
                    });
                    
                }
            },
            
            // Creates a new entry on the database with given user parameters
            register: async function register(username, password) {
                const query = `INSERT INTO Users(username,password,creation_date) VALUES (?, ?,'${moment().format('YYYY-MM-DD HH:MM:SS')}' );`
                return await data.executeQuery(query, [username, password], "r15dtqer5c72jvex")
            },
            
            getUser: async function getUser(id){
                const query='Select * from Users where id= ?'
                return await data.executeQuery(query, [id], "r15dtqer5c72jvex")
            },

            changeUserRole:async function changeUserRole(updater,id,newRole){
            }
        }
    }