'use strict'

const fetch = require('node-fetch')

module.exports = function(data) {
    
    return {
        
        // Checks if the user is in the database, if so it requests a login to be executed
        loginUser: async function LoginUser(username, password) {
            var user
            
            try {
                user = await data.getUser([username, password])
                
            } catch(error) {
                console.log(error)
                throw error
            }
            
            return await fetch("/login-user", {
                method: "POST", 
                headers: {
                    "Content-Type": "application/json"
                },
                user: user
            })
        },
        
        // Creates a new entry on the database with given user parameters
        register: async function register(username, password) {
            return await data.insertUser([username, password])
        },
        
        // Get user with specific id
        getUser: async function getUser(id){
            return await data.getUserById([id])
        },
        
        changeUserRole: async function changeUserRole(updater, id, newRole){
        }
    }
}