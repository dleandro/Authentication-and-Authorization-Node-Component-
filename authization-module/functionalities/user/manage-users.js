'use strict'

const dal=require('./user-dal')

// This file returns methods for users management 

module.exports = {

    // requests the api to add a new user 
    createUser: async (username, password) => {
        return dal.insertUser(username,password)
    },

    // requests the api for all users 
    getAllUsers: async () => {
       return dal.getAllUsers()
    },

    // requests the api for specific user with specified id
    getSpecificUser: async (userId) => {
        return dal.getUserById(userId)
    },

    // requests the api to delete a user
    deleteUser: async (userId) => {
        return dal.deleteUser(userId)
    },

    // requests the api to update a specific user's password 
    updatePassword: async (password, id) => {
        return dal.updatePassword(password,id)
    },

    // requests the api to update a specific user's username
    updateUsername: async (username, id) => {
       return dal.updateUsername(username,id)
    },
    getUserByUsername: async(username)=>{
        return dal.getUserByUsername(username)
    },
    getUserByIDP: async(idp)=>{
        return dal.getUserbyIDP(idp)
    },
    insertIDP: async(idp)=>{
        return dal.insertIDP(idp)
    }

}