'use strict'

const 
    fetch = require('node-fetch'),
    links = require('../../../links'),
    BASE_URL = require('../../common/config/config').BASE_URL

// This file returns methods for permissions management 

module.exports = {

    // requests the api to add a new permission 
    addPermission: async (method, path, description) => {
        return await fetch(`${BASE_URL}${links.permissions.PERMISSION_PATH}`, {

            method: 'POST',
            body: {
               method,
               path,
               description
            },
            headers: { 'Content-Type': 'application/json' },

        })
    },

    // requests the api for all permissions 
    getPermissions: async () => {
        return await fetch(`${BASE_URL}${links.permissions.PERMISSION_PATH}`)
    },

    // requests the api for specific permission with specified id
    getPermissionById: async (permId) => {
        return await fetch(`${BASE_URL}${links.permissions.SPECIFIC_PERMISSION_PATH(permId)}`)
    },

    // requests the api to delete a specific permission 
    deletePermission: async (permId) => {
        return await fetch(`${BASE_URL}${links.permissions.SPECIFIC_PERMISSION_PATH(permId)}`, {

            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },

        })
    }
    
}