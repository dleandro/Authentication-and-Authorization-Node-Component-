'use strict'

module.exports = function(dalUtils, errors) {
    
    return {
        
        addUserRole: async (queryParams) => {
            
            
            // not gonna work the duplicate function
            
            try {
                // if there already exists users with these given parameters than we have to throw an error
                // our app doesn't support duplicate users
                dalUtils.throwErrorIfNecessary(
                    () => dalUtils.duplicateValues(role),
                    errors.duplicateValues)
                    
                } catch(error) {
                    throw error
                }
                
                try {
                    return await dalUtils.executeQuery(`INSERT INTO Users_Roles(user,role) VALUES (?,?);`,
                    queryParams)             
                    
                } catch (error) {
                    throw errors.errorExecutingQuery
                }
                
                
            },
            getActiveRoles: async () => {
                
                
                try {
                    return await dalUtils.executeQuery(`Select * from User_Roles where active=1 AND end_date<${moment().format()}`)             
                    
                } catch (error) {
                    throw errors.errorExecutingQuery
                }
                
                
            },
            getUserActiveList: async (queryParams) => {
                
                
                try {
                    return await dalUtils.executeQuery(`Select * from User_Roles where user_id=? AND active=1 AND end_date<${moment().format()}`, queryParams)             
                    
                } catch (error) {
                    throw errors.errorExecutingQuery
                }
                
                
            },
            getUserRoles: async () => {
                
                
                try {
                    return await dalUtils.executeQuery(`Select * from User_Roles`)             
                    
                } catch (error) {
                    throw errors.errorExecutingQuery
                }
                
                
            },
            getUserRolesById: async (queryParams) => {
                
                
                try {
                    return await dalUtils.executeQuery(`Select * from User_Roles where user_id=?`, queryParams)             
                    
                } catch (error) {
                    throw errors.errorExecutingQuery
                }
                
                
            }
            
            
        }
    }