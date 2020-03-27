'use strict'

const fetch = require('node-fetch')

module.exports = function(data) {
    
    return {
        
        // Checks if the user is in the database, if so it requests a login to be executed
        loginUser: async (username, password)=> data.getUser([username, password]),
        
        // Creates a new entry on the database with given user parameters
        register: (username, password) => data.insertUser([username, password]),
        
        // Get user with specific id
        getUser: (id)=> data.getUserById([id]),
        getUserByEmail: (email)=> data.getUserByEmail([email]),
        
        changeUserRole: (updater, id, newRole)=>{
        }
    }
}