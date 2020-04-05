const
dalUtils = require('./dal-utils'),
moment = require('moment'),
errors = require('../../errors/app-errors')


module.exports={
    addRole: async (role) => {

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
            return await dalUtils.executeQuery(`INSERT INTO Roles(role) VALUES (?);`,
            role)             

        } catch (error) {
            throw errors.errorExecutingQuery
        }
        
        
    },
    getRoleById: async function getRoleById(id) {
        var result 

        try {

            result = await dalUtils.executeQuery('Select * from Users where id= ?', queryParams)
            

        } catch (error) {
            throw errors.errorExecutingQuery
        }

        try {

            // if there weren't any users found return with an exception
            dalUtils.throwErrorIfNecessary(
                () => result.length == 0,
                errors.noUsersFound)

        } catch(error) {
            throw error
        }

        return {
            id: result[0].id,
            username: result[0].username,
            password: result[0].password,
            role: result[0].role
        }
    },
    deleteRole: async (queryParams)=> {
        
        try {

            return await dalUtils.executeQuery('DELETE FROM Role WHERE id = ?', queryParams)

        } catch (err) {
       
            throw err
       
        }
    }
}
