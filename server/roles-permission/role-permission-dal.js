'use strict'

module.exports =  function(dalUtils, errors) {
    
    return {

        addRolePermission: async (role, permission) => {
            
            const query = {
                statement: `INSERT INTO Roles_Permission(role,permission) VALUES (?,?);`,
                description: "adding role_permission",
                params: [role, permission]
            }

            try {
                return await dalUtils.executeQuery(query)             
    
            } catch (error) {
                throw error
            }
            
            
        },

        deleteRolePermission: async (role, permission) => {
            
            const query = {
                statement: `DELETE FROM Roles_Permission Where role=? AND permission=?`,
                description: "deleting role_permission",
                params: [role, permission]
            }

            try {
                return await dalUtils.executeQuery(query)          
    
            } catch (error) {
                throw error
            }
            
            
        }
        
    }
}