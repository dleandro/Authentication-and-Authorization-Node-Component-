'use strict'

module.exports = function(data) {

    const fetch=require('node-fetch')
    return {

        // Checks if the user is in the database, if so it requests a login to occur
        loginUser: async function LoginUser(req,res) {
            var rows = await data.executeQuery(`SELECT * FROM Users WHERE username='${req.body.username}' AND password='${req.body.password}'`,
             'ps_db')

             if (rows.length == 1) {
                req.login({
                    username: req.body.username,
                    password: req.body.password
                  }, (err, result) => {
                    // TO DO : handle unexpected error
                    res.redirect('/homepage');
                  });
                 
             }
        },

        // Creates a new entry on the database with given user parameters
        register: async function register(id,username, password) {
            const query = `INSERT INTO Users VALUES ( '${id}','${username}', '${password}');`
            return await data.executeQuery(query, "ps_db")
        }
    }
}