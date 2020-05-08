'use strict'

const 
    dal=require('./user-role-dal')

// This file returns methods for users roles management 

module.exports = {

    // requests the api to add a new role to a specific user 
    addUsersRoles: async (user, role, start_date, end_date, updater, active) => {
        return dal.addUserRole(user,role,start_date,end_date,updater,active)
    },

    // requests the api for user's active role
    getUserActiveRole: async (userId) => {
        return dal.getUserActiveRoles(userId)
    },

    // requests the api to deactivate a specific user_role 
    deactivateUserRole: async (userRoleId) => {
        return dal.deactivateUserRole(userRoleId)
    }
    
}