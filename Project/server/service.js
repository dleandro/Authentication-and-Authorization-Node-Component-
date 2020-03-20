'use strict'

module.exports = function(data) {

    return {
        login: async function login(username, password, req) {
            var res = data.executeQuery(`SELECT * FROM Users WHERE username=${username} AND password=${password}`,
             'ps_db')

             if (res == 1) {

                // probably shouldn't be like thsis
                 req.login({
                     username: username,
                     password: password
                 }, (err, result) => {

                    // handle this error better
                    res.redirect('/')
                 })
             }

             return await res
        },

        register: async function register(username, password) {
            const query = `INSERT INTO Users VALUES ('${username}', '${password}');`
            return await data.executeQuery(query, "ps_db")
        }
    }
}