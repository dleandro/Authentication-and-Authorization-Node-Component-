'use strict'

module.exports = function(dalUtils, errors) {

    return {

        addList: async (user,list,start_date,end_date,updater) => {


                        // not gonna work the duplicate function

            try {
                // if there already exists users with these given parameters than we have to throw an error
                // our app doesn't support duplicate users
                dalUtils.throwErrorIfNecessary(
                    () => dalUtils.duplicateValues(user),
                    errors.duplicateValues)

            } catch(error) {
                throw error
            }
            
            try {
                return await dalUtils.executeQuery(`INSERT INTO Lists(user_id,list,start_date,end_date,updater) VALUES (?,?,?,?,?);`,
                [user,list,start_date,end_date,updater])             

            } catch (error) {
                throw errors.errorExecutingQuery
            }
            
        
        }
    }

}