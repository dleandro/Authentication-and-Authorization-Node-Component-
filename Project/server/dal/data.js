'use strict'

const db = require('./db')

module.exports = {
    
    executeQuery: async function executeQuery(query, databaseToQuery) {
        var connection

        try {
            connection = await db.connect()
            await connection.query(`USE ${databaseToQuery};`);
            const rows = await connection.query(query);
            console.log(rows); 
            return rows
        } catch (error) {
            console.log('error executing the query or establishing connection')
            throw error
        } finally {
            connection.end();
        }
    },
}