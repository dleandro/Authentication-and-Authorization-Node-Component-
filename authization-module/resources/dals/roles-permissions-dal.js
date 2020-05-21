'use strict'

const RolePermission = require('../sequelize-model').RolePermission,
sequelize=require('../../common/util/db')


module.exports = {
    /**
     *
     * @param role
     * @param permission
     * @returns {Promise<void>}
     */
    create: (role, permission) =>
        RolePermission.create({
            role: role,
            permission: permission
        }),
    /**
     *
     * @param role
     * @param permission
     * @returns {Promise<void>}
     */
    delete:  (role, permission) =>
        RolePermission.destroy({
            where: {
                role: role, permission: permission
            }
        }),
    /**
     *
     * @param permission
     * @returns {Promise<void>}
     */
    getRolesByPermission:  (permission) =>
        RolePermission.findAll({
            where: {
                permission: permission
            }
        }),

    joinRolesAndPermissions:()=>
       sequelize.query(
           "SELECT role,resource,action FROM RolePermission JOIN Role ON Role.id=RolePermission.RoleId JOIN Permission ON Permission.id=RolePermission.PermissionId",
       { type: sequelize.QueryTypes.SELECT }
       )
        
  

}
