'use strict'

/**
 * this module contains all permissions related endpoints
 * @param apiUtils
 * @param authization
 * @returns {*|Router}
 */
module.exports = function (apiUtils, authization) {

    const promiseDataToResponse = (res,dataPromise) => dataPromise
        .then(answer => apiUtils.setResponse(res, answer, 200))
        .catch(err => apiUtils.setResponse(res, JSON.parse(err.message), JSON.parse(err.message).status));
    const permissionRouter = require('express').Router()
    const permissions = authization.permission

    permissionRouter.route('/')
        .get(getPermissions)
        .post(addPermission)

    permissionRouter.route('/:id')
        .get(getPermissionById)
        .delete(deletePermission)

    function getPermissions(req, res) {
        promiseDataToResponse(res,permissions.getAll())
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
        promiseDataToResponse(permissions.delete(req.body.id))
    }

    function getPermissionById(req, res) {
        promiseDataToResponse(permissions.getSpecificById(req.params.id))
    }

    return permissionRouter

}
