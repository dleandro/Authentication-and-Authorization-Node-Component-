'use strict'

const
    config = require('../common/config/config'),
    errors = require('../common/errors/app-errors'),
    apiUtils = require('../common/util/api-utils'),
    userRoleLayer = require('./user-role-dal'),
    permissionLayer = require('./permission-dal'),
    rolesPermissionLayer = require('./role-permission-dal'),
    rolesLayer = require('./role-dal')

module.exports = {

    check: async (req, resp, next) => {

        if (config.env === config.test) {
            return next()
        }

        if (!req.isAuthenticated()) {
            const err = JSON.parse(errors.userNotAuthenticated.message)
            apiUtils.setResponse(resp, err, err.status)
            return;
        }


        let userRoles = await userRoleLayer.getUsersActive(req.user.id)
        if (!userRoles) {
            const err = JSON.parse(errors.userRoleNotFound.message)
            apiUtils.setResponse(resp, err, err.status)
            return;
        }
        userRoles = userRoles.map(role => role.role_id)

        let permission = await permissionLayer.getSpecific(req.method, req.baseUrl)
        if (!permission) {
            const err = JSON.parse(errors.permissionNotFound.message)
            apiUtils.setResponse(resp, err, err.status)
        }

        let permissionRoles = await rolesPermissionLayer.getRolesByPermission(permission.id)

        if (!permissionRoles) {
            const err = JSON.parse(errors.permissionRolesNotFound.message)
            apiUtils.setResponse(resp, err, err.status)
        }
        permissionRoles = permissionRoles.map(permissionRole => permissionRole.role)

        while (!permissionRoles.every(element => element === null)) {

            if (permissionRoles.some(role => userRoles.includes(role))) return next();

            permissionRoles = await getParents(permissionRoles)
        }


    }
}

async function getParents(roles) {
    let parentRoles = []
    await Promise.all(
        roles.map(async (role) => {
            let res = await rolesLayer.getSpecificById(role)
            parentRoles.push(res.parent_role)
        })
    )
    return parentRoles
}