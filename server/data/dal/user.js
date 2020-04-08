'use strict' 

const
moment = require('moment'),
SELECT_ALL = "SELECT * FROM Users"

/*
This module handles database user objects
*/

module.exports = function(dalUtils, errors) {
    
    return {

        /*
        Requests the database to return all users
        returns an array containing the user's info
        */
        getUsers: async (queryParams) => {
            
            var users
            
            try {
    
                users = await dalUtils.executeQuery(SELECT_ALL, queryParams)
                .map(row => JSON.parse({user : {id: row.id, username: row.username,password: row.password,role: row.role}}))
                
    
            } catch (error) {
                throw errors.errorExecutingQuery
            }
            
            try {
    
                // if there weren't any users found return with an exception
                dalUtils.throwErrorIfNecessary(
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
    
                result = await dalUtils.executeQuery(`${SELECT_ALL} where id= ?`, queryParams)
                
    
            } catch (error) {
                throw errors.errorExecutingQuery
            }
    
            try {
    
                // if there weren't any users found return with an exception
                dalUtils.throwErrorIfNecessary(
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
                
                result = await dalUtils.executeQuery(`${SELECT_ALL} + where username= ?`, queryParams)
    
            } catch (error) {
                throw errors.errorExecutingQuery
            }
    
    
            try {
                
                // if there weren't any users found return with an exception
                dalUtils.throwErrorIfNecessary(
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
                result = await dalUtils.executeQuery(`${SELECT_ALL} WHERE username=? AND password=?`, queryParams)
            } catch (error) {
                throw errors.errorExecutingQuery
            }
    
            try {
                // if there weren't any users found return with an exception
                dalUtils.throwErrorIfNecessary(
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
    
            try {
                // if there already exists users with these given parameters then we have to throw an error
                // our app doesn't support duplicate users
                // if getUserByEmail returns without an error it means that there is already a user with these parameters
                getUserByEmail([queryParams])
                
            } catch(error) {
                // getUserByEmail didn't find any duplicate user so it threw an error, this means we can proceed with the insertion
                
                try {
                    
                    return await dalUtils.executeQuery(`INSERT INTO Users(username, password) VALUES (?, ?);`,
                    queryParams)             
                    
                } catch (error) {
                    throw errors.errorExecutingQuery
                }
                
            }

            // if we got here it means that getUserByEmail found a duplicate user and we should throw an error to let the user know what went wrong
            throw errors.duplicateValues
            
        },
        
        // TODO: insert in history the changes made
        // update specific user's username 
        updateUsername: async (queryParams)=> {
    
            try {
           
                return await dalUtils.executeQuery('UPDATE Users SET username = ? WHERE id = ?', queryParams)
           
            } catch (err) {
           
                throw err
           
            }
            
        },
    
        // TODO: insert in history the changes made
        // update specific user's password 
        updatePassword: async (queryParams)=> {
    
            try {
       
                return await dalUtils.executeQuery('UPDATE Users SET password = ? WHERE id = ?', queryParams)
       
            } catch (err) {
       
                throw err
            
            }
        
        },
        
        // TODO: RGPD user deleted must insert some reference to it on the user's history
        // delete user in the database with given id
        deleteUser: async (queryParams)=> {
            
            try {
    
                return await dalUtils.executeQuery('DELETE FROM Users WHERE id = ?', queryParams)
    
            } catch (err) {
           
                throw err
           
            }
        }

    }
}