'use strict'

const ConnectionError = require('./db-connection-error'),
QueryError = require('./query-error')

module.exports = {
    
    errorExecutingQuery: new ConnectionError(JSON.stringify({
        type: "/db/problems/query-not-executed",
        title: "Problem executing Query",
        detail: "There was a problem executing the query, this is probably a server problem",
        status: 500 
    })),
    
    duplicateUser: new QueryError(JSON.stringify({
        type: "/db/problems/duplicate-user",
        title: "Duplicate User",
        detail: "Your username is taken, choose another one",
        status: 403 
    })),

    noUsersFound: new QueryError(JSON.stringify({ 
        type: "/db/problems/no-users-found",
        title: "No users found",
        detail: "No users with these parameters are currently on the database",
        status: 404 
    })),

    dbConnection: new ConnectionError(JSON.stringify({
        type: '/db/problems/no-connection',
        title: 'Database Connection Error',
        detail: 'An error occurred while establishing the connection to the database',
        status: 500
    }))
}