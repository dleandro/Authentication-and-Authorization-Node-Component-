const
    { RBAC } = require('rbac'),
    config = require('../config/config')

var
    roleDal,
    rolesPermissionsDal,
    permissionsDal,
    rbac


module.exports = async function (jsonObj) {


    if (!config.isModuleSetUp) {
        return config.rbac
    }

    rbac = new RBAC()

    roleDal = require('../../resources/dals/roles-dal')(rbac)
    permissionsDal = require('../../resources/dals/permissions-dal')(rbac)
    rolesPermissionsDal = require('../../resources/dals/roles-permissions-dal')(rbac, roleDal, permissionsDal)

    createRoles(jsonObj.roles)
    createPermissions(jsonObj.permissions)
    createGrants(jsonObj.grants)
    await rbac.init()

    config.rbac = rbac

    return rbac
}

function createRoles(roles) {
    roles.map(role => {
        roleDal.create(role)
    })
}

function createPermissions(permissions) {
    permissions.map(permission => {
        permissionsDal.create(permission.action, permission.resource)
    })
}

function createGrants(grants) {
    Object.keys(grants).map(async function (key, index) {
        const permissions = grants[key]
        const role = await roleDal.getByName(key)
        if ("role" in permissions) {
            const childRole = await roleDal.getByName(permissions.role)
            roleDal.addParentRole(childRole.id, role.id)
        } else {
            permissions.map(async permission => {
                const p = await permissionsDal.getSpecific(permission.action, permission.resource)
                rolesPermissionsDal.create(role.id, p.id)
            })
        }
    });
}