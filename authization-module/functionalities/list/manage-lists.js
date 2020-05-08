'use strict'

const 
    fetch = require('node-fetch'),
    links = require('../../../links'),
    BASE_URL = require('../../common/config/config').BASE_URL

// This file returns methods for list management 

module.exports = {

    // requests the api to add a new list 
    addList: async (user, list, start_date, end_date, updater, active) => {
        return await fetch(`${BASE_URL}${links.lists.LIST_PATH}`, {

            method: 'POST',
            body: {
                user,
                list,
                start_date,
                end_date,
                updater,
                active
            },
            headers: { 'Content-Type': 'application/json' },

        })
    },

    // requests the api for all lists 
    getLists: async () => {
        return await fetch(`${BASE_URL}${links.lists.LIST_PATH}`)
    },

    // requests the api for all active lists 
    getActiveLists: async () => {
        return await fetch(`${BASE_URL}${links.lists.ACTIVE_LISTS_PATH}`)
    },

    // requests the api for user's active list
    getUserActiveList: async (userId) => {
        return await fetch(`${BASE_URL}${links.lists.USERS_ACTIVE_LISTS_PATH(userId)}`)
    },

    // requests the api to deactivate a specific list 
    deactivateList: async (listId) => {
        return await fetch(`${BASE_URL}${links.lists.LIST_DEACTIVATION_PATH(listId)}`, {

            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },

        })
    }
    
}