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

        apiUtils.promiseDataToResponse(res, rolePermission.create(req.body.roleId,  req.body.permissionId), 201)
    }

    function deleteRolesPermission(req, res) {
        apiUtils.promiseDataToResponse(res, rolePermission.delete(req.body.roleId, req.body.permissionId))
    }

    return rolesPermissionRouter

}
