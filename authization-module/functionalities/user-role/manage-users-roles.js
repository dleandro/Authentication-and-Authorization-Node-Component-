'use strict'

const 
    fetch = require('node-fetch'),
    links = require('../../../links'),
    BASE_URL = require('../../common/config/config').BASE_URL

// This file returns methods for users roles management 

module.exports = {

    // requests the api to add a new role to a specific user 
    addUsersRoles: async (user, role, start_date, end_date, updater, active) => {
        return await fetch(`${BASE_URL}${links.users_roles.USERS_ROLES_PATH}`, {

            method: 'POST',
            body: {
               user,
               role,
               start_date,
               end_date,
               updater,
               active
            },
            headers: { 'Content-Type': 'application/json' },

        })
    },

    // requests the api for user's active role
    getUserActiveRole: async (userId) => {
        return await fetch(`${BASE_URL}${links.users_roles.USER_ACTIVE_ROLES_PATH(userId)}`)
    },

    // requests the api to deactivate a specific user_role 
    deactivateUserRole: async (userRoleId) => {
        return await fetch(`${BASE_URL}${links.users_roles.USER_ROLES_DEACTIVATION_PATH(userRoleId)}`, {

            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },

        })
    }
    
}