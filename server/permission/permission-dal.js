'use strict'

module.exports = function(dalUtils, errors) {
    
    return {
        
        addPermission: async (method, path, description) => {
            
            const query = {
                statement: `INSERT INTO Permission(method,path,description) VALUES (?,?,?);`,
                description: "adding permission",
                params: [method, path, description]
            }
            
            try {
                return await dalUtils.executeQuery(query)             
                
            } catch (error) {
                throw error
            }
        },
        
        deletePermission: async (permissionId) => {
            
            const query = {
                statement: `DELETE FROM Permission WHERE id = ?`,
                description: "deleting permission",
                params: [permissionId]
            }

            try {
                
                return await dalUtils.executeQuery(query)          
                
            } catch (error) {
                throw error
            }
            
        },
        
        getPermissions :async () => {
            
            const query = {
                statement: `Select * from Permission`,
                description: "getting all permissions",
                params: []
            }
            
            try {
                return await dalUtils.executeQuery(query)             
                
            } catch (error) {
                throw error
            }
        },
        
        
    }
}