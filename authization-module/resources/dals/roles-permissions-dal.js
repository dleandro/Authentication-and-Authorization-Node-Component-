'use strict'

const RolePermission = require('../sequelize-model').RolePermission,
Permission = require('../sequelize-model').Permission,
    Role=require('../sequelize-model').Role,
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
        rbac.grant(await rbac.getRole((await Role.findOne({where:{id:RoleId}}).role)), await rbac.getPermission(permission.action, permission.resource))
        RolePermission.findOrCreate({
            where:{
            RoleId: RoleId,
            PermissionId: await Permission.findOne({where:{action:permission.action,resource:permission.resource}})
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
