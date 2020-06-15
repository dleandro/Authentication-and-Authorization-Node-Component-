'use strict'

const RolePermission = require('../sequelize-model').RolePermission,
    sequelize = require('../../common/util/db')


module.exports = (rbac, roleDal, permissionDal) => {

    return {

        /**
         *
         * @param role
         * @param permission
         * @returns {Promise<void>}
         */
        create: async (role, permission) => {
            const roleName = (await roleDal.getSpecificById(role)).role
            const permissionObj = await permissionDal.getSpecificById(permission)
            rbac.grant(rbac.getRole(roleName), rbac.getPermission(permissionObj.action, permissionObj.resource))
            RolePermission.create({
                RoleId: role,
                PermissionId: permission
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


}
