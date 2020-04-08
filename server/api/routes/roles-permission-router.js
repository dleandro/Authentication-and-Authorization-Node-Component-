'use strict'

// this module contains all role's permissions related endpoints
module.exports = function(apiUtils, service) {
    
    const rolesPermissionRouter = require('express').Router()
    
    rolesPermissionRouter.post('/',addRolesPermission)

    function addRolesPermission(req,res){
        service.addPermission(req.body.role,req.body.permission)
        .then(answer => apiUtils.setResponse(res, answer, 200))
            .catch(err => apiUtils.setResponse(res, JSON.parse(err).detail, JSON.parse(err).status))
    }
    
    return rolesPermissionRouter
    
}
