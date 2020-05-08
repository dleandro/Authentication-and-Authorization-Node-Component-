'use strict'

const dal=require('./permission-dal')

// This file returns methods for permissions management 

module.exports = {

    // requests the api to add a new permission 
    addPermission: async (method, path, description) => {
        return dal.addPermission(method,path,description)
    },

    // requests the api for all permissions 
    getPermissions: async () => {
        return dal.getPermissions()
    },

    // requests the api for specific permission with specified id
    getPermissionById: async (permId) => {
        return dal.getPermissionById(permId)
    },

    // requests the api to delete a specific permission 
    deletePermission: async (permId) => {
        return dal.deletePermission(permId)
    }
    
}