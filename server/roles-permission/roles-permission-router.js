'use strict'

// this module contains all role's permissions related endpoints
module.exports = function(apiUtils, data) {
    
    const rolesPermissionRouter = require('express').Router()
    
    rolesPermissionRouter.route('/')
    .post(addRolesPermission)
    .delete(deleteRolesPermission)

    function addRolesPermission(req, res){
        data.addRolePermission([req.body.role, req.body.permission])
        .then(answer => apiUtils.setResponse(res, answer, 200))
            .catch(err => apiUtils.setResponse(res, JSON.parse(err).detail, JSON.parse(err).status))
    }
    
    function deleteRolesPermission(req, res){
        data.deleteRolePermission([req.body.role, req.body.permission])
        .then(answer => apiUtils.setResponse(res, answer, 200))
            .catch(err => apiUtils.setResponse(res, JSON.parse(err).detail, JSON.parse(err).status))
    }

    return rolesPermissionRouter
    
}