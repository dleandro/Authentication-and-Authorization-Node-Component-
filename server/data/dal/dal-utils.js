'use strict'

const db = require('../db'),
errors = require('../../errors/app-errors')

module.exports = {
    
    /*
    Establishes connection to the database using the db module, after it has been established it runs the query 
    passed via parameter.
    If a connection or query error occurs it catches them printing the given error and throwing the error 
    */
    executeQuery: async (query, queryParams) => {
        var connection
        
        try {
            try {
                connection = await db.connect()
            } catch (error) {
                console.log(error)
                throw errors.dbConnection
            }
            const rows = await connection.query(query, queryParams);
            console.log(rows);
            return rows
        } catch (error) {
            console.log(error)
            throw error.errorExecutingQuery
        } finally {
            connection.end();
        }
    },
    
    // Util function that tests given predicate and throws given error if the predicate returns true
    throwErrorIfNecessary: (predicate, error) => {
        
        try {
            
            if (predicate.call()) {
                throw error
            }
            
        } catch (err) {
            throw err
        }
        
    }

}