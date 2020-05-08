'use strict'

// this module contains all role related endpoints
module.exports = function(apiUtils) {
    const data=require('../../authization-module/authization').role
    
    const roleRouter = require('express').Router()
    
    roleRouter.route('/')
    .post(addRole)
    .get(getRoles)
    
    roleRouter.route('/:id')
    .get(getRoleById)
    .delete(deleteRole)
    
    function addRole(req, res){
        data.addRole(req.body.role)
        .then(answer => {
            req.body.id = answer.insertId
            apiUtils.setResponse(res, req.body, 201)
        })
        .catch(err => apiUtils.setResponse(res, JSON.parse(err.message), JSON.parse(err.message).status))
    }
    
    function deleteRole(req, res){
        data.deleteRole(req.params.id)
        .then(answer => apiUtils.setResponse(res, answer, 200))
        .catch(err => apiUtils.setResponse(res, JSON.parse(err.message), JSON.parse(err.message).status))
    }
    
    function getRoles(req, res){
        data.getRoles()
        .then(answer => apiUtils.setResponse(res, answer, 200))
        .catch(err => apiUtils.setResponse(res, JSON.parse(err.message), JSON.parse(err.message).status))
    }
    
    function getRoleById(req, res){
        data.getRoleById(req.params.id)
        .then(answer => apiUtils.setResponse(res, answer, 200))
        .catch(err => apiUtils.setResponse(res, JSON.parse(err.message), JSON.parse(err.message).status))
    }
    
    return roleRouter
    
}