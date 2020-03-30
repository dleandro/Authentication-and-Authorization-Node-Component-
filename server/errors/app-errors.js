'use strict'

const ConnectionError = require('./db-connection-error'),
QueryError = require('./query-error')

module.exports = {
    
    errorExecutingQuery = new ConnectionError({
        type : "/db/problems/query-not-executed",
        title = "Problem executing Query",
        detail = "There was a problem executing the query, this is probably a server problem",
        status = 500 
    }),
    
    duplicateUser = new QueryError({
        type : "/db/problems/duplicate-user",
        title = "Duplicate User",
        detail = "Your username is taken, choose another one",
        status = 403 
    }),

    noUsersFound = new QueryError({ 
        type : "/db/problems/no-users-found",
        title = "No users found",
        detail = "No users with these parameters are currently on the database",
        status = 404 
    })
    
    
}