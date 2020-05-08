'use strict'

const
    fetch = require('node-fetch'),
    links = require('../../../links'),
    BASE_URL = require('../../common/config/config').BASE_URL

// This file returns methods for roles-permissions management 

module.exports = {

    // requests the api to add a new role-permission association 
    addRolesPermission: async (role, permission) => {
        return await fetch(`${BASE_URL}${links.roles_permissions.ROLES_PERMISSION_PATH}`, {

            method: 'POST',
            body: {
                role,
                permission
            },
            headers: { 'Content-Type': 'application/json' },

        })
    },

    // requests the api to delete a role-permission association 
    deleteRolesPermission: async (role, permission) => {
        return await fetch(`${BASE_URL}${links.roles_permissions.ROLES_PERMISSION_PATH}`, {

            method: 'DELETE',
            body: {
                role,
                permission
            },
            headers: { 'Content-Type': 'application/json' },

        })
    }

}