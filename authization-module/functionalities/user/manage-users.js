'use strict'

const
    fetch = require('node-fetch'),
    links = require('../../../links'),
    BASE_URL = require('../../common/config/config').BASE_URL

// This file returns methods for users management 

module.exports = {

    // requests the api to add a new user 
    createUser: async (username, password) => {
        return await fetch(`${BASE_URL}${links.users.USER_PATH}`, {

            method: 'POST',
            body: {
                username,
                password
            },
            headers: { 'Content-Type': 'application/json' },

        })
    },

    // requests the api for all users 
    getAllUsers: async () => {
        return await fetch(`${BASE_URL}${links.users.USER_PATH}`)
    },

    // requests the api for specific user with specified id
    getSpecificUser: async (userId) => {
        return await fetch(`${BASE_URL}${links.users.SPECIFIC_USER_PATH(userId)}`)
    },

    // requests the api to delete a user
    deleteUser: async (userId) => {
        return await fetch(`${BASE_URL}${links.users.SPECIFIC_USER_PATH(userId)}`, {

            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },

        })
    },

    // requests the api to update a specific user's password 
    updatePassword: async (password, id) => {
        return await fetch(`${BASE_URL}${links.users.PASSWORD_UPDATE_PATH(id)}`, {

            method: 'PUT',
            body: {
                password,
                id
            },
            headers: { 'Content-Type': 'application/json' },

        })
    },

    // requests the api to update a specific user's username
    updateUsername: async (username, id) => {
        return await fetch(`${BASE_URL}${links.users.USERNAME_UPDATE_PATH(id)}`, {

            method: 'PUT',
            body: {
                username,
                id
            },
            headers: { 'Content-Type': 'application/json' },

        })
    },

}