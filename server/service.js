'use strict'

module.exports = function(data) {
    
    return {
        
        // Checks if the user is in the database, if so it requests a login to be executed
        loginUser: async (username, password) => executeRequest( () => data.getUser([username, password]) ),
        
        // Creates a new entry on the database with given user parameters
        register: async (username, password) => executeRequest( () => data.insertUser([username, password]) ),
        
        // Get user with specific id
        getUserById: async (id) => executeRequest( () => data.getUserById([id]) ),
        
        getUserByEmail: async (email) => ( () => data.getUserByEmail([email]) ),
        
        changeUserRole: async (updater, id, newRole) => {
        }
    }
    
    
    async function executeRequest(functionToExecute) {
        try {

            return functionToExecute()

        } catch (err) {
            throw err
        }
    }
}