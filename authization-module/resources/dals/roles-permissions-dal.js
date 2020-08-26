
const { Role, Permission } = require('../sequelize-model');

const RolePermission = require('../sequelize-model').RolePermission,
    rolesDal = require('./roles-dal'),
    config = require('../../common/config/config'),
    rbac = config.rbac,
    tryCatch = require('../../common/util/functions-utils');

module.exports = {

    /**
     *
     * @returns {Promise<void>}
     * @param RoleId
     * @param permissionId
     */
    create: (RoleId, permissionId) =>
        tryCatch(async () => {
            const {action, id, resource} = await require('./permissions-dal').getSpecificById(permissionId);
            rbac.grant(await rbac.getRole((await rolesDal.getSpecificById(RoleId)).role), await rbac.getPermission(action, resource));
            return (await RolePermission.findOrCreate({where: {RoleId, PermissionId: id}}))[0];
        }),

    /**
     *
     * @returns {Promise<void>}
     * @param roleId
     * @param permissionId
     */
    delete: async (roleId, permissionId) =>Promise.resolve({
        deletedRows: await  tryCatch(async () => {
            const {action, resource} = await require('./permissions-dal').getSpecificById(permissionId);
            const role = await rolesDal.getSpecificById(roleId);
            await rbac.revokeByName(role.role, `${action}_${resource}`);
            return RolePermission.destroy({where: {RoleId: roleId, PermissionId: permissionId}});
        })}),

    get: () =>
        tryCatch(() => RolePermission.findAll({include: [Role, Permission], raw: true})
            .then(rolePermissions=>
                rolePermissions.map(rolePermission => {
                    const {'Permission.action': action, 'Permission.resource': resource, 'Role.role': role, 'Role.parent_role': parentRole,
                        'Permission.id': unused0, 'Role.id': unused1, ...rest} = rolePermission;
                return {action, resource, role,parentRole, ...rest};
            }))),

    getByRole: roleId => tryCatch(() => RolePermission.findAll({ where: { RoleId: roleId }, include: [Permission], raw: true })),

    //TODO: change fields from jointed query
    getByPermission: id => tryCatch(() => RolePermission.findAll({ where: { PermissionId: id }, include: [Role], raw: true })),


}