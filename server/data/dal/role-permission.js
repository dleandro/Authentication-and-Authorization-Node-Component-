'use strict'

module.exports =  function(dalUtils, errors) {
    
    return {

        addRolePermission: async (role,permission) => {
            
            try {
                return await dalUtils.executeQuery(`INSERT INTO Roles_Permission(role,permission) VALUES (?,?);`,
                [role,permission])             
    
            } catch (error) {
                throw errors.errorExecutingQuery
            }
            
            
        },

        deleteRolePermission: async (role,permission) => {
            
            try {
                return await dalUtils.executeQuery(`DELETE FROM Roles_Permission Where role=? AND permission=?`,
                [role,permission])             
    
            } catch (error) {
                throw errors.errorExecutingQuery
            }
            
            
        }
        
    }
}