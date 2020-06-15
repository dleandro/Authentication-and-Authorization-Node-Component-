const { RBAC } = require('rbac')
const {Role,Permission, RolePermission} = require('../../resources/sequelize-model'),
RoleDal=require('../../resources/dals/roles-dal'),
config=require('../config/config')
const rolesPermissionsDal = require('../../resources/dals/roles-permissions-dal')
const permissionsDal = require('../../resources/dals/permissions-dal')

let rbac=null


module.exports = async function (jsonObj) {


if (!config.isModuleSetUp) {

    return rbac
}
rbac=new RBAC()
createRoles(jsonObj.roles)
createPermissions(jsonObj.permissions)
 createGrants(jsonObj.grants)
await rbac.init()
return rbac


}



function createRoles(roles){
    roles.map(role=>{
        Role.create({
            role: role})
    })
}

function createPermissions(permissions){
    permissions.map(permission=>{
        Permission.create({action:permission.action,resource:permission.resource})
    })
}

  function createGrants(grants){
    Object.keys(grants).map(async function(key, index) {
        const permissions=grants[key]
        const role=await RoleDal.getByName(key)
        if("role" in permissions){
            const childRole=await RoleDal.getByName(permissions.role)
            RoleDal.addParentRole(childRole.id,role.id)
        }else{
        permissions.map(async permission=>{
            const p=await permissionsDal.getSpecific(permission.action,permission.resource)
            RolePermission.create(role.id,p.id)
        })}
      });
}



