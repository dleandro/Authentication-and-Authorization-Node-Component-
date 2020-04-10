'use strict'
const moment=require('moment')
module.exports =  function(dalUtils, errors) {
    
    return {
        
        addRole: async (role) => {
            
            try {
                return await dalUtils.executeQuery(`INSERT INTO Roles(role) VALUES (?);`,
                role)             
        
            } catch (error) {
                throw errors.errorExecutingQuery
            }
            
            
        },

        getRoleById: async function getRoleById(id) {
            var result 
        
            try {
        
                result = await dalUtils.executeQuery('Select * from Roles where id= ?', queryParams)
                
        
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
        
        deleteRole: async (queryParams)=> {
            
            try {
        
                return await dalUtils.executeQuery('DELETE FROM Roles WHERE id = ?', queryParams)
        
            } catch (err) {
           
                throw err
           
            }
        },
        getRoles:async (queryParams)=> {
            
            try {
        
                return await dalUtils.executeQuery('Select * from Roles')
        
            } catch (err) {
           
                throw err
           
            }
        }
    }
}
