'use strict'

const RolePermission = require('../sequelize-model').RolePermission

module.exports = {
    /**
     *
     * @param role
     * @param permission
     * @returns {Promise<void>}
     */
    create: async (role, permission) =>
        await RolePermission.create({
            role: role,
            permission: permission
        }),
    /**
     *
     * @param role
     * @param permission
     * @returns {Promise<void>}
     */
    delete: async (role, permission) =>
        await RolePermission.destroy({
            where: {
                role: role, permission: permission
            }
        }),
    /**
     *
     * @param permission
     * @returns {Promise<void>}
     */
    getRolesByPermission: async (permission) =>
        await RolePermission.findAll({
            where: {
                permission: permission
            }
        })

}
