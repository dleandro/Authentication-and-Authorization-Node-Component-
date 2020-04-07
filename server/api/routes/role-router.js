'use strict'

const api = require('../api-utils')

// this module contains all role related endpoints
module.exports = function(service) {
    
    const roleRouter = require('express').Router()
    
    roleRouter.delete('/role', deleteRole)
    roleRouter.post('/role', addRole)
    
    function addRole(req,res){
        service.addRole(req.body.role)
        .then(answer => setResponse(res, answer, 200))
        .catch(err => setResponse(res, JSON.parse(err).detail, JSON.parse(err).status))
    }
    
    function deleteRole(req,res){
        service.deleteRole(req.body.role)
        .then(answer => setResponse(res, answer, 200))
        .catch(err => setResponse(res, JSON.parse(err).detail, JSON.parse(err).status))
    }
    
    return roleRouter
    
}