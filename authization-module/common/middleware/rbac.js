const
    { RBAC } = require('rbac'),
    config = require('../config/config'),
    moment=require('moment');

let
    roleDal,
    rolesPermissionsDal,
    permissionsDal,
    rbac;


module.exports = async function (jsonObj,UserRoles) {


    if (config.isModuleSetUp) {
        return config.rbac;
    }

    rbac = new RBAC();
    config.rbac = rbac;
    roleDal = require('../../resources/dals/roles-dal');
    permissionsDal = require('../../resources/dals/permissions-dal');
    rolesPermissionsDal = require('../../resources/dals/roles-permissions-dal');

    await createRoles(jsonObj.roles);
    await createPermissions(jsonObj.permissions);
    await createGrants(jsonObj.grants);
    await UserRoles.findOrCreate({where:{UserId:1},defaults: { "start_date": moment().format(),"updater":1,"RoleId": 1 ,"active":1}});
    await rbac.init();

    return rbac
}

function createRoles(roles) {
    return Promise.all(roles.map(async role => {
        await roleDal.create(role);
    })
    );
}

function createPermissions(permissions) {
    return Promise.all(permissions.map(async permission => {
        await permissionsDal.create(permission.action, permission.resource);
    }));
}

function createGrants(grants) {
    Object.keys(grants).map(async function (key, index) {
        const permissions = grants[key];
        const role = await roleDal.getByName(key);
        permissions.map(async permission => {
            if ('role' in permission) {
                roleDal.getByName(permission.role).then(childRole=>roleDal.addParentRole(childRole, role));
            } else {
                permissionsDal.getSpecific(permission.action, permission.resource).then(p=>rolesPermissionsDal.create(role.id, p));
            }
        });
    });
}