'use strict'

// this module contains all user related endpoints
module.exports = function(apiUtils, service) {
    
    const userRouter = require('express').Router()
    
    userRouter.route('/')
    .get((req, res) => {
        service.getUserById(req.query.userId)
        .then(answer => apiUtils.setResponse(res, answer, 200))
        .catch(err => apiUtils.setResponse(res, JSON.parse(err.message).detail, JSON.parse(err.message).status))
    })
    .post((req, res) => {
        service.register(req.body.username, req.body.password)
        .then(_ => apiUtils.setResponse(res, req.body, 201))
        .catch(err => apiUtils.setResponse(res, JSON.parse(err.message).detail, JSON.parse(err.message).status))
    })

    userRouter.delete('/:id', apiUtils.ensureAuthenticated, (req, res) => {
        service.deleteUser(req.params.id)
        .then(answer => apiUtils.setResponse(res, answer, 200))
        .catch(err => apiUtils.setResponse(res, JSON.parse(err.message).detail, JSON.parse(err.message).status))
    })
    
    userRouter.put('/:id/username', apiUtils.ensureAuthenticated, (req, res) => {
        service.updateUsername(req.params.id, req.body.username)
        .then(answer => apiUtils.setResponse(res, answer, 201))
        .catch(err => apiUtils.setResponse(res, JSON.parse(err.message).detail, JSON.parse(err.message).status))
    })
    
    userRouter.put('/:id/password', apiUtils.ensureAuthenticated, (req, res) => {
        service.updateUsername(req.params.id, req.body.username)
        .then(answer => apiUtils.setResponse(res, answer, 201))
        .catch(err => apiUtils.setResponse(res, JSON.parse(err.message).detail, JSON.parse(err.message).status))
    })
    
    return userRouter
}