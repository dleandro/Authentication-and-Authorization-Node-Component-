'use strict'

const db = require('./db'),
moment = require('moment'),
errors = require('../errors/app-errors'),
SELECT_ALL = "SELECT * FROM Users"

// TODO: Do we need to have some error cathing is result returns empty??
module.exports = {
    
    /*
    Requests the database to return all users
    returns an array containing the user's info
    */
    getUsers: async (queryParams) => {
        
        var users
        
        try {

            users = await executeQuery(SELECT_ALL, queryParams)
            .map(row => JSON.parse({user : {id: row.id, username: row.username,password: row.password,role: row.role}}))
            

        } catch (error) {
            throw errors.errorExecutingQuery
        }
        
        try {

            // if there weren't any users found return with an exception
            throwErrorIfNecessary(
                () => users.length < 1,
                errors.noUsersFound)

        } catch (error) {
            throw error
        }
        
        return users
    },
    
    /* Requests the database for a user with given id */
    getUserById: async function getUserById(queryParams) {
        var result 

        try {

            result = await executeQuery('Select * from Users where id= ?', queryParams)
            

        } catch (error) {
            throw errors.errorExecutingQuery
        }

        try {

            // if there weren't any users found return with an exception
            throwErrorIfNecessary(
                () => result.length == 0,
                errors.noUsersFound)

        } catch(error) {
            throw error
        }

        return {
            id: result[0].id,
            username: result[0].username,
            password: result[0].password,
            role: result[0].role
        }
    },

    getUserByEmail: async (queryParams) =>  {

        var result

        try {
            
            result = await executeQuery(SELECT_ALL +' where username= ?', queryParams)

        } catch (error) {
            throw errors.errorExecutingQuery
        }


        try {
            
            // if there weren't any users found return with an exception
            throwErrorIfNecessary(
                () => users.length < 1,
                errors.noUsersFound)

        } catch(error) {
            throw error
        }

        return {
            id: result[0].id,
            username: result[0].username,
            password: result[0].password,
            role: result[0].role
        }
    },
    /* 
    Requests the database to return user's that match username and password parameters
    returns the first user found with such parameters
    */
    getUser: async (queryParams)=> {
        var result 

        try {
            result = await executeQuery(SELECT_ALL+' WHERE username=? AND password=? ', queryParams)
        } catch (error) {
            throw errors.errorExecutingQuery
        }

        try {
            // if there weren't any users found return with an exception
            throwErrorIfNecessary(
                () => result.length < 1,
                errors.noUsersFound)

        } catch (error) {
            throw error
        }

        // 0 is a magic number solve that later and it probably shouldn't the first,
        return {
            id: result[0].id,
            username: result[0].username,
            password: result[0].password,
            role: result[0].role
        }

    },
    
    /* 
    Requests the database for a new entry in the table users
    Should throw error if there already exists a user with the same parameters    <- TODO
    */
    insertUser: async (queryParams) => {

        try{
            // if there already exists users with these given parameters than we have to throw an error
            // our app doesn't support duplicate users
            throwErrorIfNecessary(
                () => areThereAnyUsersWithTheseParams(queryParams),
                errors.duplicateUser)

        } catch(error) {
            throw error
        }
        
        try {
            
            if(queryParams.id) {
                
                return await executeQuery(`INSERT INTO Users(id, username, password, creation_date) VALUES (?, ?, ?,'${moment().format('YYYY-MM-DD HH:MM:SS')}' );`,
                queryParams) 
                
            } 
            
            return await executeQuery(`INSERT INTO Users(username, password, creation_date) VALUES (?, ?,'${moment().format('YYYY-MM-DD HH:MM:SS')}' );`,
            queryParams)             

        } catch (error) {
            throw errors.errorExecutingQuery
        }
        
        
    },
    
    updateUser: async (queryParams)=> {
        
    },
    
    deleteUser: async (queryParams)=> {
        
    },
    
    getRecords: async (queryParams)=> {
        
    },
    
    getRecord: async (queryParams)=>{
        
    },
    
    insertRecord: async (queryParams)=> {
        
    },
    
    updateRecord: async (queryParams)=> {
        
    },
    
    deleteRecord: async (queryParams)=> {
        
    },
    
}

/*
Establishes connection to the database using the db module, after it has been established it runs the query 
passed via parameter.
If a connection or query error occurs it catches them printing the given error and throwing the error 
*/
async function executeQuery(query, queryParams) {
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
}

// Util function that tests given predicate and throws given error if the predicate returns true
function throwErrorIfNecessary(predicate, error) {
    
    try {
        
        if (predicate.call()) {
            throw error
        }
        
    } catch (err) {
        throw err
    }
    
}

// Util function that checks for duplicate users on the database
function areThereAnyUsersWithTheseParams(username) {

    try {

        getUserByEmail([username]) 
        return true

    // if it fails and throws an error it means that no user with given parameters was found so we should be good to go
    } catch (error) {
        return false
    }

}

function toSiren(resource) {
    return true
}