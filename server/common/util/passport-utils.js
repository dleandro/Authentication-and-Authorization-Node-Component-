'use strict'

const
data = require('./dal-paths')

module.exports = {
    
    findUser: async (userId) => {
        console.log(userId)
        return data.user.getUserById(userId)
    },
    findUserByIdp: async (userId) => {
       return null
    },

    findCorrespondingUser: async (username, password) => {
        return data.user.getUser(username, password)
    },
    
    /*
    When Using identity providers you need this method to create an entry on the database for the user using the identity provider 
    If there is an entry for the user who is trying to authenticate we simply search its id on our database and return the specific user
    */
   CreateUser: async (idp_id,idpname,username,password) => {
        
        let result=await data.user.insertUser(username,password) 
        console.log(result.insertId) 
        result=await data.user.insertIDP(idp_id,idpname,result.insertId)
    }
    
    
    
}