'use strict'

const dal=require('./role-permission-dal')

// This file returns methods for roles-permissions management 

module.exports = {

    // requests the api to add a new role-permission association 
    addRolesPermission: async (role, permission) => {
        dal.addRolePermission(role,permission)
    },

    // requests the api to delete a role-permission association 
    deleteRolesPermission: async (role, permission) => {
        dal.deleteRolePermission(role,permission)
    }

}