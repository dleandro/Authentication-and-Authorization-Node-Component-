'use strict'

const api = require('../api-utils')

// this module contains all user related endpoints
module.exports = function (service) {
    
    const userRouter = require('express').Router()
    
    userRouter.route('/user')
    .get((req, res) => {
        service.getUserById(req.query.userId)
        .then(answer => api.setResponse(res, answer, 200))
        .catch(err => api.setResponse(res, JSON.parse(err.message).detail, JSON.parse(err.message).status))
    })
    .post((req, res) => {
        service.register(req.body.username, req.body.password)
        .then(answer => api.setResponse(res, answer, 201))
        .catch(err => api.setResponse(res, JSON.parse(err.message).detail, JSON.parse(err.message).status))
    })
    .delete(api.ensureAuthenticated, (req, res) => {
        service.deleteUser(req.body.username, req.body.password)
        .then(answer => api.setResponse(res, answer, 200))
        .catch(err => api.setResponse(res, JSON.parse(err.message).detail, JSON.parse(err.message).status))
    })
    
    userRouter.put('user/{id}/username', api.ensureAuthenticated, (req, res) => {
        service.updateUsername(req.params.id, req.body.username)
        .then(answer => api.setResponse(res, answer, 201))
        .catch(err => api.setResponse(res, JSON.parse(err.message).detail, JSON.parse(err.message).status))
    })
    
    userRouter.put('user/{id}/password', api.ensureAuthenticated, (req, res) => {
        service.updateUsername(req.params.id, req.body.username)
        .then(answer => api.setResponse(res, answer, 201))
        .catch(err => api.setResponse(res, JSON.parse(err.message).detail, JSON.parse(err.message).status))
    })
    
    return userRouter
}