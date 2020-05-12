'use strict'

const
    config = require('../common/config/config'),
    errors = require('../common/errors/app-errors'),
    apiUtils = require('../common/util/api-utils'),
    userRoleLayer = require('../functionalities//user-role-dal'),
    permissionLayer = require('../functionalities/permission-dal'),
    rolesPermissionLayer=require('../functionalities/role-permission-dal'),
    rolesLayer=require('../functionalities/role-dal')
/**
 *
 * @type {{hasPermissions: hasPermissions}}
 */
module.exports = {
    /**
     *
     * @param req
     * @param resp
     * @param next
     * @returns {Promise<*>}
     */
    hasPermissions: async (req, resp, next) => {

        if (config.env === config.test) {
            return next()
        }

        if (!req.isAuthenticated()) {
            const err = JSON.parse( errors.userNotAuthenticated.message)
            apiUtils.setResponse(resp, err, err.status)
        }


        let userRoles = await userRoleLayer.getUserActiveRoles(req.user.id)
        if (!userRoles) {
            const err = JSON.parse(errors.userRoleNotFound.message)
            apiUtils.setResponse(resp, err, err.status)
            return;
        }
        userRoles=userRoles.map(role=>role.role_id)

        let permission=await permissionLayer.getPermission(req.method, req.baseUrl)
        if(!permission){
            const err = JSON.parse(errors.permissionNotFound.message)
            apiUtils.setResponse(resp, err, err.status)
        }

        let permissionRoles = await rolesPermissionLayer.getRolesByPermission(permission.id)

        if(!permissionRoles){
            const err = JSON.parse(errors.permissionRolesNotFound.message)
            apiUtils.setResponse(resp, err, err.status)
        }
        return await searchUserRolesForPermissionRole(permissionRoles.map(permissionRole=>permissionRole.role),userRoles,next)
    }
}

/**
 *
 * @param permissionRoles
 * @param userRoles
 * @param next
 * @returns {Promise<*>}
 */
async function searchUserRolesForPermissionRole(permissionRoles,userRoles,next){
    if(!permissionRoles.every(element => element === null)){
        return permissionRoles.some(role => userRoles.includes(role)) ? next() : idk(await getParents(permissionRoles));
    }
}

/**
 *
 * @param roles
 * @returns {Promise<[]>}
 */
async function getParents(roles) {
    let parentRoles = []
    await Promise.all(
        roles.map(async (role) =>{
                let res=await rolesLayer.getRoleById(role)
                parentRoles.push(res.parent_role)
            }
        )
    )
    return parentRoles
}