'use strict'

const RolePermission = require('../sequelize-model').RolePermission,
    rolesDal = require('./roles-dal'),
    config = require('../../common/config/config'),
    rbac = config.rbac,
    w = require('../../common/util/with')

module.exports = {

    /**
     *
     * @param role
     * @param permission
     * @returns {Promise<void>}
     */
    create: w(async (RoleId, permission) => {
        rbac.grant(await rbac.getRole((await rolesDal.getSpecificById.with(RoleId)).role), await rbac.getPermission(permission.action, permission.resource))
        return RolePermission.findOrCreate({
            where: {
                RoleId: RoleId,
                PermissionId: permission.id
            }
        })
    }),

    /**
     *
     * @param role
     * @param permission
     * @returns {Promise<void>}
     */
    delete: w((role, permission) =>
        RolePermission.destroy({
            where: {
                RoleId: role, PermissionId: permission
            }
        })),

    /**
     *
     * @param permission
     * @returns {Promise<void>}
     */
    getRolesByPermission: w((permission) =>
        RolePermission.findAll({
            where: {
                PermissionId: permission
            }
        }))

}
