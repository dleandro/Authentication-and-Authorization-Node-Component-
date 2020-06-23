'use strict'

const RolePermission = require('../sequelize-model').RolePermission,
    permissionsDal = require('./permissions-dal'),
    rolesDal = require('./roles-dal'),
    sequelize = require('../../common/util/db'),
    config = require('../../common/config/config'),
    rbac = config.rbac

module.exports = {

    /**
     *
     * @param role
     * @param permission
     * @returns {Promise<void>}
     */
    create: async (RoleId, permission) => {
        rbac.grant(await rbac.getRole((await rolesDal.getSpecificById(RoleId)).role), await rbac.getPermission(permission.action, permission.resource))
        return RolePermission.findOrCreate({
            where: {
                RoleId: RoleId,
                PermissionId: permission.id
            }
        })
    },
    /**
     *
     * @param role
     * @param permission
     * @returns {Promise<void>}
     */
    delete: (role, permission) =>
        RolePermission.destroy({
            where: {
                RoleId: role, PermissionId: permission
            }
        }),
    /**
     *
     * @param permission
     * @returns {Promise<void>}
     */
    getRolesByPermission: (permission) =>
        RolePermission.findAll({
            where: {
                PermissionId: permission
            }
        }),

    joinRolesAndPermissions: () =>
        sequelize.query(
            "SELECT role,resource,action FROM RolePermission JOIN Role ON Role.id=RolePermission.RoleId JOIN Permission ON Permission.id=RolePermission.PermissionId",
            { type: sequelize.QueryTypes.SELECT }
        )

}
