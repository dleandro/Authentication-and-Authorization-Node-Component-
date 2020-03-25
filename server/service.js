'use strict'

const fetch = require('node-fetch')

module.exports = function(data) {
    
    return {
        
        // Checks if the user is in the database, if so it requests a login to be executed
        loginUser: async (username, password)=> {
            var user =data.getUser([username, password]);
            
            
            return await fetch("http://localhost:8082/login-user", {
                method: "POST", 
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: 'same-origin',
                body: JSON.stringify(await user)
            }).then(result=>result.text())
			.catch(err=>console.log('error POSTING to /login-user'))

        },
        
            // Creates a new entry on the database with given user parameters
        register: async (username, password) => await data.insertUser([username, password]),
        
        // Get user with specific id
        getUser: async (id)=> await data.getUserById([id]),
        getUserByEmail: async (email)=> await data.getUserByEmail([email]),
        
        changeUserRole: async (updater, id, newRole)=>{
        }
    }
}