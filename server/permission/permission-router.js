'use strict'

// this module contains all permissions related endpoints
module.exports = function(apiUtils, data) {
    
    const permissionRouter = require('express').Router()
    
    permissionRouter.route('/')
    .get(getPermissions)
    .post(addPermission)
    
    permissionRouter.delete('/:id', deletePermission)

    function getPermissions(req, res){
        data.getPermissions()
        .then(answer => apiUtils.setResponse(res, answer, 200))
        .catch(err => apiUtils.setResponse(res, JSON.parse(err).detail, JSON.parse(err).status))
    }

    function addPermission(req,res){
        data.addPermission(req.body.method, req.body.path, req.body.description)
        .then(answer => {
            req.body.id = answer.insertId
            apiUtils.setResponse(res, req.body, 201)
        })
        .catch(err => apiUtils.setResponse(res, JSON.parse(err).detail, JSON.parse(err).status))
    }
    
    function deletePermission(req, res){
        data.deletePermission(req.params.id)
        .then(answer => apiUtils.setResponse(res, answer, 200))
        .catch(err => apiUtils.setResponse(res, JSON.parse(err).detail, JSON.parse(err).status))
    }
    
    return permissionRouter
    
}
