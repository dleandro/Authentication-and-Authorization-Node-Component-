'use strict'

// this module contains all permissions related endpoints
module.exports = function (apiUtils, authization) {

    const permissionRouter = require('express').Router()
    const permissions = authization.permission

    permissionRouter.route('/')
        .get(getPermissions)
        .post(addPermission)

    permissionRouter.route('/:id')
        .get(getPermissionById)
        .delete(deletePermission)

    function getPermissions(req, res) {
        permissions.getAll()
            .then(answer => apiUtils.setResponse(res, answer, 200))
            .catch(err => apiUtils.setResponse(res, JSON.parse(err.message), JSON.parse(err.message).status))
    }

    function addPermission(req, res) {
        permissions.create(req.body.method, req.body.path, req.body.description)
            .then(answer => {
                req.body.id = answer.insertId
                apiUtils.setResponse(res, req.body, 201)
            })
            .catch(err => apiUtils.setResponse(res, JSON.parse(err.message), JSON.parse(err.message).status))
    }

    function deletePermission(req, res) {
        permissions.delete(req.body.id)
            .then(answer => apiUtils.setResponse(res, answer, 200))
            .catch(err => apiUtils.setResponse(res, JSON.parse(err.message), JSON.parse(err.message).status))
    }

    function getPermissionById(req, res) {
        permissions.getSpecificById(req.params.id)
            .then(answer => apiUtils.setResponse(res, answer, 200))
            .catch(err => apiUtils.setResponse(res, JSON.parse(err.message), JSON.parse(err.message).status))
    }

    return permissionRouter

}
