'use strict'

const CustomError = require('./custom-error')

module.exports = {

    Unauthorized: new CustomError(JSON.stringify({
        title: "Unauthorized",
        detail: `The current user cannot access this resource`,
        status: 401
    })),
    errorExecutingQuery: new CustomError(JSON.stringify({
        title: "Problem executing Query",
        detail: `There was a problem executing the query, check if all the data was inserted correctly. Contact the authization-module devs for more information`,
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
    })),
    noResponseFound: new CustomError(JSON.stringify({
        title: "No Value found",
        detail: "The response given from the database was empty, either the table were empty or the query didn't output a value",
        status: 404
    })),
    noListFound: new CustomError(JSON.stringify({
        title: "No List found",
        detail: "query didn't go through because there were no lists found with this id",
        status: 404
    })),

    userNotAuthenticated: new CustomError(JSON.stringify({
        title: "User is not authenticated",
        detail: "User tried to access a resource that requires authentication and he doesn't meet those requirements",
        status: 401
    }))
}
