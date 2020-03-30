'use strict'

const fetch = require('node-fetch')

module.exports = function(data) {
    
    return {
        
        // Checks if the user is in the database, if so it requests a login to be executed
        loginUser: async (username, password)=> data.getUser([username, password]),
        
        // Creates a new entry on the database with given user parameters
        register: async (username, password) => data.insertUser([username, password]),
        
        // Get user with specific id
        getUserById: async (id)=> data.getUserById([id]),

        getUserByEmail: async (email)=> data.getUserByEmail([email]),
        
        changeUserRole: async (updater, id, newRole)=>{
        }
    }
}