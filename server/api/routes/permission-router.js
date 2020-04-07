'use strict'

const api = require('../api-utils')

// this module contains all permissions related endpoints
module.exports = function(service) {
    
    const permissionRouter = require('express').Router()
    
    permissionRouter.delete('/permission', deletePermission)
    
    permissionRouter.post('/permission', addPermission)
    
    
    
    function addPermission(req,res){
        service.addPermission(req.body.method,req.body.path,req.body.description)
        .then(answer => setResponse(res, answer, 200))
        .catch(err => setResponse(res, JSON.parse(err).detail, JSON.parse(err).status))
    }
    
    
    
    function deletePermission(req,res){
        service.deletePermission(req.body.method,req.body.path,req.body.description)
        .then(answer => setResponse(res, answer, 200))
        .catch(err => setResponse(res, JSON.parse(err).detail, JSON.parse(err).status))
    }
    
    return permissionRouter
    
}
