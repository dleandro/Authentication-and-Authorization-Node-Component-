'use strict'

// this module contains all permissions related endpoints
module.exports = function(apiUtils, service) {
    
    const permissionRouter = require('express').Router()
    
    permissionRouter.route('/')
    .get(getPermissions)
    .delete(deletePermission)
    .post(addPermission)
    

    function getPermissions(req, res){
        service.getPermissions()
        .then(answer => apiUtils.setResponse(res, answer, 200))
        .catch(err => apiUtils.setResponse(res, JSON.parse(err).detail, JSON.parse(err).status))
    }

    function addPermission(req,res){
        service.addPermission([req.body.method, req.body.path, req.body.description])
        .then(answer => apiUtils.setResponse(res, answer, 201))
        .catch(err => apiUtils.setResponse(res, JSON.parse(err).detail, JSON.parse(err).status))
    }
    
    function deletePermission(req, res){
        service.deletePermission([req.body.method,req.body.path,req.body.description])
        .then(answer => apiUtils.setResponse(res, answer, 200))
        .catch(err => apiUtils.setResponse(res, JSON.parse(err).detail, JSON.parse(err).status))
    }
    
    return permissionRouter
    
}
