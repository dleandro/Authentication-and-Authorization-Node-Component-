'use strict'

const dal=require('./role-dal')

// This file returns methods for roles management 

module.exports = {

    // requests the api to add a new role 
    addRole: async (role) => {
        return dal.addRole(role)
    },

    // requests the api for all roles 
    getRoles: async () => {
        return dal.getRoles()
    },

    // requests the api for specific role with specified id
    getRoleById: async (roleId) => {
        return dal.getRoleById(roleId)
    },

    // requests the api to delete a specific role 
    deleteRole: async (roleId) => {
        return dal.deleteRole(roleId)
    }
    
}