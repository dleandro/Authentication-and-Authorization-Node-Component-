'use strict'

const RolePermission = require('../sequelize-model').RolePermission

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
        })

}
