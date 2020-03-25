'use strict'

const db = require('./db'),
ConnectionError = require('../errors/db-connection-error'),
QueryError = require('../errors/query-error'),
moment = require('moment')
const SELECT_ALL= "'SELECT * FROM Users'";

// TODO: Do we need to have some error cathing is result returns empty??
module.exports = {
    
    /*
    Requests the database to return all users
    returns an array containing the user's info
    */
    getUsers: async (queryParams) => (await executeQuery(SELECT_ALL, queryParams))
        .map(row => JSON.parse({user : {id: row.id, username: row.username,password: row.password,role: row.role}})),
    
    
    /* Requests the database for a user with given id */
    getUserById: async function getUserById(queryParams) {
        const result = await executeQuery('Select * from Users where id= ?', queryParams)
        
        return {
            id: result[0].id,
            username: result[0].username,
            password: result[0].password,
            role: result[0].role
        }
    },
    getUserByEmail: async (queryParams) =>  {
        const {id,username,password,role} = (await executeQuery(SELECT_ALL +' where username= ?', queryParams))[0]
        return {
            id: id,
            username: username,
            password: password,
            role: role
        }
    },
    /* 
    Requests the database to return user's that match username and password parameters
    returns the first user found with such parameters
    */
	getUser: async (queryParams)=> {
        const result = await executeQuery(SELECT_ALL+' WHERE username=? AND password=? ', queryParams)

        if (result.length == 1) {
            
            return {
                // 0 is a magic number solve that later and it probably shouldn't the first,
                // TODO: there should only be one user with these parameters
                // if there are more than one something is wrong
                // shouldn't be able to register users in duplicate
                id: result[0].id,
                username: result[0].username,
                password: result[0].password,
                role: result[0].role
            }
        }
        
        throw new Error('There are more than one user with this username and password, could not login')
    },
    
   /* 
    Requests the database for a new entry in the table users
    Should throw error if there already exists a user with the same parameters    <- TODO
    */
    insertUser: async (queryParams) => await executeQuery(`INSERT INTO Users(username, password, creation_date) VALUES (?, ?,'${moment().format('YYYY-MM-DD HH:MM:SS')}' );`,
        queryParams),
    
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
            throw new ConnectionError('An error occurred while establishing the connection to the database')
        }
        const rows = await connection.query(query, queryParams);
        console.log(rows);
        return rows
    } catch (error) {
        console.log(error)
        throw new QueryError('An error occurred while trying to execute the query')
    } finally {
        connection.end();
    }
}