'use strict'

/**
 * this module contains all role's permissions related endpoints
 * @param apiUtils
 * @param authization
 * @returns {*|Router}
 */
module.exports = function (apiUtils, authization) {
    const rolePermission = authization.rolePermission
    const rolesPermissionRouter = require('express').Router()

    rolesPermissionRouter.route('/')
        .post(addRolesPermission)
        .delete(deleteRolesPermission)

    function addRolesPermission(req, res) {
        rolePermission.create(req.body.role, req.body.permission)
            .then(answer => {
                req.body.id = answer.insertId
                apiUtils.setResponse(res, req.body, 201)
            })
            .catch(err => apiUtils.setResponse(res, JSON.parse(err.message), JSON.parse(err.message).status))
    }

    function deleteRolesPermission(req, res) {
        rolePermission.delete(req.body.role, req.body.permission)
            .then(answer => apiUtils.setResponse(res, answer, 200))
            .catch(err => apiUtils.setResponse(res, JSON.parse(err.message), JSON.parse(err.message).status))
    }

    return rolesPermissionRouter

}
