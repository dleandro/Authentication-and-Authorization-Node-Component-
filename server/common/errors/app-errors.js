'use strict'

const CustomError = require('./custom-error')

module.exports = {
    
    errorExecutingQuery: (failedQuery) => new CustomError(JSON.stringify({
        title: "Problem executing Query",
        detail: `There was a problem executing the query, check if all the data was inserted correctly. The failed Query was the following ${failedQuery}`,
        status: 400 
    })),
    
    duplicateValues: new CustomError(JSON.stringify({
        title: "Duplicate Values",
        detail: "Value already inserted,Please choose another one",
        status: 403 
    })),

    noUsersFound: new CustomError(JSON.stringify({ 
        title: "No users found",
        detail: "No users with these parameters are currently on the database",
        status: 404 
    })),

    dbConnection: new CustomError(JSON.stringify({
        title: 'Database Connection Error',
        detail: 'An error occurred while establishing the connection to the database',
        status: 500
    })),

    userDuplicateActiveList: new CustomError(JSON.stringify({
        title: "User duplicate active list",
        detail: "User already has an active list, change active list status first before adding the user to a new list",
        status: 403
    }))
}