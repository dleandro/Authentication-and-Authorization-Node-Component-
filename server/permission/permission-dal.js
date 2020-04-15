'use strict'

module.exports = function(dalUtils, errors) {
    
    return {
        
        addPermission: async (queryParams) => {
            
            
            // not gonna work the duplicate function
            
            try {
                // if there already exists users with these given parameters than we have to throw an error
                // our app doesn't support duplicate users
                dalUtils.throwErrorIfNecessary(
                    () => dalUtils.duplicateValues(method,path),
                    errors.duplicateValues)
                    
                } catch(error) {
                    throw error
                }
                
                try {
                    return await dalUtils.executeQuery(`INSERT INTO Permission(method,path,description) VALUES (?,?,?);`,
                    queryParams)             
                    
                } catch (error) {
                    throw errors.errorExecutingQuery
                }
            },
            getPermissions :async () => {
                
                
                try {
                    return await dalUtils.executeQuery(`Select * from Permission`)             
                    
                } catch (error) {
                    throw errors.errorExecutingQuery
                }
            },
        }
    }