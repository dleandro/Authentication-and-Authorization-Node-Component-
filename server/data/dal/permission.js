const
dalUtils = require('./dal-utils'),
moment = require('moment'),
errors = require('../../errors/app-errors')


module.exports={
    addPermission: async (method,path,description) => {

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
            [method,path,description])             

        } catch (error) {
            throw errors.errorExecutingQuery
        }
        
        
    }

}