'use strict'

const Role = require('./role-model')
module.exports = {
    /**
     *
     * @param role
     * @returns {Promise<void>}
     */
    create: async (role, parent_role) =>
        await Role.create({
            role: role,
            parent_role: parent_role
        }),

    /**
     *
     * @param roleId
     * @returns {Promise<*>}
     */
    getSpecificById: async (roleId) =>
        await Role.findByPk(roleId),
    /**
     *
     * @param roleId
     * @returns {Promise<void>}
     */
    delete: async (roleId) =>
        await Role.destroy({
            where: {
                id: roleId
            }
        }),
    /**
     *
     * @returns {Promise<void>}
     */
    getAll: async () =>
        await Role.findAll({ raw: true })
}
