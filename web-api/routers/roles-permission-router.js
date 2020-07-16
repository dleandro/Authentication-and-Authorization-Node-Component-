'use strict'


/**
 * this module contains all role's permissions related endpoints
 * @param apiUtils
 * @param authization
 * @returns {*|Router}
 */
module.exports = function (apiUtils, authization) {

    const routerUtils = require('../common/util/router-utils')
    const rolePermission = authization.rolePermission
    const rolesPermissionRouter = require('express').Router()

    rolesPermissionRouter.route('/')
        .post(addRolesPermission)
        .delete(deleteRolesPermission)

    function addRolesPermission(req, res) {
        rolePermission.create.with(req.body.roleId, { id: req.body.permissionId, action: req.body.action, resource: req.body.resource })
            .then(answer => {
                apiUtils.setResponse(res, answer[0].dataValues, 201)
            })
            .catch(err => apiUtils.setResponse(res, err.message, err.status))
    }

    function deleteRolesPermission(req, res) {
        routerUtils.promiseDataToResponse(res, rolePermission.delete.with(req.body.role, req.body.permission))
    }

    return rolesPermissionRouter

}
