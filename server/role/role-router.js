'use strict'

// this module contains all role related endpoints
module.exports = function(apiUtils, data) {
    
    const roleRouter = require('express').Router()
    
    roleRouter.route('/')
    .post(addRole)
    .get(getRoles)

    roleRouter.route('/:id')
    .delete(deleteRole)
    .get(getRoleById)
    
    function addRole(req, res){
        data.addRole([req.body.role])
        .then(answer => apiUtils.setResponse(res, answer, 201))
        .catch(err => apiUtils.setResponse(res, JSON.parse(err).detail, JSON.parse(err).status))
    }
    
    function deleteRole(req, res){
        data.deleteRole([req.params.id])
        .then(answer => apiUtils.setResponse(res, answer, 200))
        .catch(err => apiUtils.setResponse(res, JSON.parse(err).detail, JSON.parse(err).status))
    }

    function getRoles(req, res){
        data.getRoles()
        .then(answer => apiUtils.setResponse(res, answer, 200))
        .catch(err => apiUtils.setResponse(res, JSON.parse(err).detail, JSON.parse(err).status))
    }

    function getRoleById(req, res){
        data.getRoleById([req.params.id])
        .then(answer => apiUtils.setResponse(res, answer, 200))
        .catch(err => apiUtils.setResponse(res, JSON.parse(err).detail, JSON.parse(err).status))
    }
    
    return roleRouter
    
}