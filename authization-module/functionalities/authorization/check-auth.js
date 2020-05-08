'use strict'

const
    config = require('../../common/config/config'),
    errors = require('../../common/errors/app-errors'),
    apiUtils = require('../../common/util/api-utils'),
    fetch = require('node-fetch'),
    links = require('../../../links'),
    BASE_URL = config.BASE_URL,
    listLayer = require('../../functionalities/list/manage-lists'),
    permissionLayer = require('../../functionalities/permission/manage-permissions')

module.exports = {

    hasPermissions: async (req, resp, next) => {

        if (config.env == config.test) {
            return next()
        }

        if (!req.isAuthenticated()) {
            const err = errors.userNotAuthenticated
            apiUtils.setResponse(resp, JSON.parse(err.message), JSON.parse(err.message).status)
        }

        let userRoles = listLayer.getUserActiveList(req.user.id)

        userRoles = userRoles.map(element => element.role_id)

        if (userRoles.length == 0) {
            const err = errors.userRoleNotFound

            apiUtils.setResponse(resp, JSON.parse(err.message), JSON.parse(err.message).status)
        } 

        let obj = permissionLayer.getPermissionById()
        await dal.permission.getPermissionID(req.method, req.baseUrl)
        if(obj.length == 0) resp.end("Permissions were not defined to this endpoint")
        let roles = await dal.rolesPermission.getRolesByPermission(JSON.parse(obj[0].id))
        roles = roles.map(element => element.role)
        if(roles.length == 0) resp.end("There isn't any role associated with the endpoint")
        while(true) {
        for (let i = 0; i < roles.length; i++) {

            if (userRoles.includes(roles[i])) return next();
        }
        if (roles.every(element => element === null)) {
            resp.end("Insufficient Permissions")
        }
        roles = await getParents(roles)
        roles = roles.flat()
    }
}
};

async function getParents(roles) {
    let parentRoles = []
    await Promise.all(roles.map(async (role) => {
        let parentRole = await dal.role.getRoleById(role)
        parentRole = parentRole.map(role => role.parent_role)
        parentRoles.push(parentRole)
    }))
    return parentRoles
}