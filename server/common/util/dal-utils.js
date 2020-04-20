'use strict'

const db = require('../data/db'),
errors = require('../errors/app-errors'),
userHistoryDal = require('../../user-history/user-history-dal')

module.exports = {
    
    /*
    Establishes connection to the database using the db module, after it has been established it runs the query 
    passed via parameter.
    If a connection or query error occurs it catches them printing the given error and throwing the error 
    */
    executeQuery: async (query) => {
        var connection
        
        try {
            try {
                connection = await db.connect()
            } catch (error) {
                throw errors.dbConnection
            }
            const rows = await connection.query(query.statement, query.params);
            return rows
        } catch (error) {
            throw errors.errorExecutingQuery(`${error.message} on query ${query.description}`)
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
        
    },
    
    // request userHistoryDal to insert the in the user s history the latest action executed
    registerUserHistory: async (userId, date, description) => {
        try {
            
            userHistoryDal.addUserHistory(userId, date, description)
            
        } catch (error) {
            throw error                
        }
    }
    
}