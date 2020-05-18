'use strict'

const Role = require('../sequelize-model').Role
module.exports = {
    /**
     *
     * @param role
     * @returns {Promise<void>}
     */
    create: async (role, parentRole) =>
        Role.create({
            role: role,
            parent_role: parentRole
        }),

    /**
     *
     * @param roleId
     * @returns {Promise<*>}
     */
    getSpecificById: async (roleId) =>
        Role.findByPk(roleId),
    /**
     *
     * @param roleId
     * @returns {Promise<void>}
     */
    delete: (roleId) =>
        Role.destroy({
            where: {
                id: roleId
            }
        }),
    /**
     *
     * @returns {Promise<void>}
     */
    getAll: () =>Role.findAll({raw: true})
}
