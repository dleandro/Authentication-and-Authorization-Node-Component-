'use strict'

// this module contains all role related endpoints
module.exports = function (apiUtils, authization) {

    const promiseDataToResponse = (res,dataPromise) => dataPromise
        .then(answer => apiUtils.setResponse(res, answer, 200))
        .catch(err => apiUtils.setResponse(res, JSON.parse(err.message), JSON.parse(err.message).status));
    const roles = authization.role
    const roleRouter = require('express').Router()

    roleRouter.route('/')
        .post(addRole)
        .get(getRoles)

    roleRouter.route('/:id')
        .get(getRoleById)
        .delete(deleteRole)

    function addRole(req, res) {
        roles.create(req.body.role)
            .then(answer => {
                req.body.id = answer.insertId
                apiUtils.setResponse(res, req.body, 201)
            })
            .catch(err => apiUtils.setResponse(res, JSON.parse(err.message), JSON.parse(err.message).status))
    }

    function deleteRole(req, res) {
        promiseDataToResponse(res,roles.delete(req.params.id))
    }


    function getRoles(req, res) {
        promiseDataToResponse(res,roles.getAll())
    }

    function getRoleById(req, res) {
        promiseDataToResponse(res,roles.getSpecificById(req.params.id))
    }

    return roleRouter

}
