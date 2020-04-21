'use strict'

module.exports =  function(dalUtils, errors) {
    
    return {
        
        addRole: async (role) => {
            
            const query = {
                statement: `INSERT INTO Roles(role) VALUES (?);`,
                description: "adding role",
                params: [role]
            }

            try {
                return await dalUtils.executeQuery(query)          
        
            } catch (error) {
                throw error
            }
            
            
        },

        getRoleById: async function getRoleById(roleId) {
            var result 

            const query = {
                statement: `Select * from Roles where id= ?`,
                description: "getting role by id",
                params: [roleId]
            }
        
            try {
        
                result = await dalUtils.executeQuery(query)
        
            } catch (error) {
                throw error
            }
        
            try {
        
                // if there weren't any users found return with an exception
                dalUtils.throwErrorIfNecessary(
                    () => result.length == 0,
                    errors.noUsersFound)
        
            } catch (error) {
                throw error
            }
        
            return {
                id: result[0].id,
                username: result[0].username,
                password: result[0].password,
                role: result[0].role
            }
        },
        
        deleteRole: async (roleId)=> {
            
            const query = {
                statement: `DELETE FROM Roles WHERE id = ?`,
                description: "deleting role",
                params: [roleId]
            }

            try {
        
                return await dalUtils.executeQuery(query)
        
            } catch (err) {
           
                throw err
           
            }
        },
        getRoles: async () => {

            const query = {
                statement: `Select * from Roles`,
                description: "getting all roles",
                params: []
            }
            
            try {
        
                return await dalUtils.executeQuery(query)
        
            } catch (err) {
           
                throw err
           
            }
        }
    }
}
