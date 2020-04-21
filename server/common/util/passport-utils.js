'use strict'

const
data = require('./dal-paths')

module.exports = {
    
    findUser: async (userId) => {
        return data.user.getUserById(userId)
    },

    findCorrespondingUser: async (username, password) => {
        return data.user.getUser(username, password)
    },
    
    /*
    When Using identity providers you need this method to create an entry on the database for the user using the identity provider 
    If there is an entry for the user who is trying to authenticate we simply search its id on our database and return the specific user
    */
    findOrCreateUser: async (userToFindOrCreate) => {
        var user = await findUser(userToFindOrCreate)
        
        return user ? user : data.user.insertUser(userToFindOrCreate.username, userToFindOrCreate.password)     
    }
    
    
    
}