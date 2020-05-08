'use strict'

const dal=require('./user-history-dal')

// This file returns methods that return user's histories 

module.exports = {

    // requests the api for all user_histories 
    getAllHistories: async () => {
        return dal.getAllHistories()
    },

    // requests the api for specific permission with specified id
    getAllHistoriesFromSpecificUser: async (userId) => {
        return dal.getAllHistoriesFromSpecificUser(userId)
    },

}
