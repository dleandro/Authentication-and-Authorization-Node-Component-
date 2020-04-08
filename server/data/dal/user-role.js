'use strict'

module.exports = function(dalUtils, errors) {
    
    return {

        addUserRole: async (user, role) => {
    

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
                [user,role])             
    
            } catch (error) {
                throw errors.errorExecutingQuery
            }
            
            
        }

    }
}