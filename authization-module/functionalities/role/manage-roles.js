'use strict'

const 
    fetch = require('node-fetch'),
    links = require('../../../links'),
    BASE_URL = require('../../common/config/config').BASE_URL

// This file returns methods for roles management 

module.exports = {

    // requests the api to add a new role 
    addRole: async (role) => {
        return await fetch(`${BASE_URL}${links.roles.ROLE_PATH}`, {

            method: 'POST',
            body: {
                role
            },
            headers: { 'Content-Type': 'application/json' },

        })
    },

    // requests the api for all roles 
    getRoles: async () => {
        return await fetch(`${BASE_URL}${links.roles.ROLE_PATH}`)
    },

    // requests the api for specific role with specified id
    getRoleById: async (roleId) => {
        return await fetch(`${BASE_URL}${links.roles.SPECIFIC_ROLE_PATH(roleId)}`)
    },

    // requests the api to delete a specific role 
    deleteRole: async (roleId) => {
        return await fetch(`${BASE_URL}${links.roles.SPECIFIC_ROLE_PATH(roleId)}`, {

            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },

        })
    }
    
}