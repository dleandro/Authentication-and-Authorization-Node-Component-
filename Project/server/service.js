'use strict'

module.exports = function(data) {

    return {

        // Checks if the user is in the database, if so it requests a login to occur
        login: async function login(username, password, req) {
            var res = await data.executeQuery(`SELECT * FROM Users WHERE username='${username}' AND password='${password}'`,
             'ps_db')

             if (res.length == 1) {

                res = await fetch('/exec-login', {
                    method: 'POST', 
                    headers = {
                        'Content-type': 'application/json'
                    },
                    username: username,
                    password: password
                })
                 
                return res
             }

             return "User doesn't exist in the database"
        },

        // Creates a new entry on the database with given user parameters
        register: async function register(username, password) {
            const query = `INSERT INTO Users VALUES ('${username}', '${password}');`
            return await data.executeQuery(query, "ps_db")
        }
    }
}