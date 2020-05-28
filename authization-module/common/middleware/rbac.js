const { RBAC } = require('rbac')

const rolesDal = require('../../resources/dals/roles-dal'),
    permissionDal = require('../../resources/dals/permissions-dal'),
    rolePermissionDal = require('../../resources/dals/roles-permissions-dal')

const rbac = new RBAC()
//init();



async function createPermissions() {
    const permissions = await permissionDal.getAll()
    permissions.map(async (permission) => {
        await rbac.createPermission(permission.action, permission.resource, true)

    })
}

async function createGrants() {
    const rolePermissions = await rolePermissionDal.joinRolesAndPermissions()
    rolePermissions.map(async (rolePermission) => {
        await rbac.grant(await rbac.getRole(rolePermission.role), await rbac.getPermission(rolePermission.action, rolePermission.resource)
        )
    })
    await createHierarchyGrants()
}

async function createRoles() {
    const roles = await rolesDal.getAll()
    await rbac.createRoles(roles.map((role) => role.role), true)
}


async function createHierarchyGrants() {
    const roles = await rolesDal.getRolesWithParents()
    roles.map(async (role) => await rbac.grant(await rbac.getRole(rolePermission.parent_role), await rbac.getRole(role.role)))
    console.log('perai')
}



async function init() {
    await createRoles()
    await createPermissions()
    await createGrants()
    await rbac.init()
}

module.exports = rbac