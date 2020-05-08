'use strict'

const dal=require('./list-dal')

// This file returns methods for list management 

module.exports = {

    // requests the api to add a new list 
    addList: async (user, list, start_date, end_date, updater, active) => {
        return dal.addList(user,list,start_date,end_date,updater,active)
    },

    // requests the api for all lists 
    getLists: async () => {
        return dal.getLists()
    },

    // requests the api for all active lists 
    getActiveLists: async () => {
        return dal.getActiveLists()
    },

    // requests the api for user's active list
    getUserActiveList: async (userId) => {
        return dal.getUserActiveList(userId)
    },

    // requests the api to deactivate a specific list 
    deactivateList: async (listId) => {
        
    
}
}