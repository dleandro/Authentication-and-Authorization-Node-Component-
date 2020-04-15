'use strict'

module.exports =  function(dalUtils, errors) {
    
    return {

        addRolePermission: async (queryParams) => {
            
            try {
                return await dalUtils.executeQuery(`INSERT INTO Roles_Permission(role,permission) VALUES (?,?);`,
                queryParams)             
    
            } catch (error) {
                throw errors.errorExecutingQuery
            }
            
            
        },

        deleteRolePermission: async (queryParams) => {
            
            try {
                return await dalUtils.executeQuery(`DELETE FROM Roles_Permission Where role=? AND permission=?`,
                queryParams)             
    
            } catch (error) {
                throw errors.errorExecutingQuery
            }
            
            
        }
        
    }
}