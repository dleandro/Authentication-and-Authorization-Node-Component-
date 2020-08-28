'use strict'

/**
 * this module contains all permissions related endpoints
 * @param apiUtils
 * @param authization
 * @returns {*|Router}
 */
module.exports = function (apiUtils, authization) {

    const permissionRouter = require('express').Router()
    const permissions = authization.permission

    permissionRouter.route('/')
        .get(getPermissions)
        .post(addPermission)

    permissionRouter.route('/:id')
        .get(getPermissionById)
        .put(updatePermission)
        .delete(deletePermission)

    function getPermissions(req, res) {
        apiUtils.promiseDataToResponse(res, permissions.get())
    }

    function addPermission(req, res) {
        console.log('req on addperm:',req)
        apiUtils.promiseDataToResponse(res, permissions.create(req.body.action, req.body.resource), 201)
    }

    function updatePermission(req, res) {
        apiUtils.promiseDataToResponse(res, permissions.update(req.params.id, req.body.action, req.body.resource), 201)
    }

    function deletePermission(req, res) {
        apiUtils.promiseDataToResponse(res, permissions.delete(req.params.id))
    }

    function getPermissionById(req, res) {
        apiUtils.promiseDataToResponse(res, permissions.getSpecificById(req.params.id))
    }

    return permissionRouter

}