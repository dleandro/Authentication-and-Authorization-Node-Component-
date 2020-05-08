'use strict'

const 
    fetch = require('node-fetch'),
    links = require('../../../links'),
    BASE_URL = require('../../common/config/config').BASE_URL

// This file returns methods that return user's histories 

module.exports = {

    // requests the api for all user_histories 
    getAllHistories: async () => {
        return await fetch(`${BASE_URL}${links.users_history.USER_HITORY_PATH}`)
    },

    // requests the api for specific permission with specified id
    getAllHistoriesFromSpecificUser: async (userId) => {
        return await fetch(`${BASE_URL}${links.users_history.SPECIFIC_USER_HISTORY_PATH(userId)}`)
    },

}
