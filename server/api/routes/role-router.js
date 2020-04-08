'use strict'

const api = require('../../util/api-utils')

// this module contains all role related endpoints
module.exports = function(apiUtils, service) {
    
    const roleRouter = require('express').Router()
    
    roleRouter.route('/')
    .delete(deleteRole)
    .post(addRole)
    
    function addRole(req,res){
        service.addRole(req.body.role)
        .then(answer => apiUtils.setResponse(res, answer, 200))
        .catch(err => apiUtils.setResponse(res, JSON.parse(err).detail, JSON.parse(err).status))
    }
    
    function deleteRole(req,res){
        service.deleteRole(req.body.role)
        .then(answer => apiUtils.setResponse(res, answer, 200))
        .catch(err => apiUtils.setResponse(res, JSON.parse(err).detail, JSON.parse(err).status))
    }
    
    return roleRouter
    
}