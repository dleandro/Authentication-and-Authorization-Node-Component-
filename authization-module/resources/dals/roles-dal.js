'use strict'

const Role = require('../sequelize-model').Role,
    { Permission, User } = require('../sequelize-model'),
    config = require('../../common/config/config'),
    w = require('../../common/util/with')

module.exports = {

    /**
         *
         * @param role
         * @returns {Promise<void>}
         */
    create: w((role) => {
        config.rbac.createRole(role, true)
        return Role.findOrCreate({
            where: {
                role: role
            }
        })
    }),
    update: w((id, role, parent_role) => Role.update({ role: role, parent_role: parent_role }, { where: { id: id } })),

    /**
     *
     * @param roleId
     * @returns {Promise<*>}
     */
    getSpecificById: w((roleId) =>
        Role.findByPk(roleId)),

    getByName: w((roleName) => Role.findOne({ where: { role: roleName } })),
    /**
     *
     * @param roleId
     * @returns {Promise<void>}
     */
    delete: w((roleId) =>
        Role.destroy({
            where: {
                id: roleId
            }
        })),
    /**
     *
     * @returns {Promise<void>}
     */
    get: w(() => Role.findAll({ raw: true })),

    getRolePermissions: w((roleId) => Role.findAll({ where: { id: roleId }, include: [Permission], raw: true })),

    getUsersWithThisRole: w((roleId) => Role.findAll({ where: { id: roleId }, include: [User], raw: true })),

    getPermissionsWithThisRole: w((roleId) => Role.findAll({ where: { id: roleId }, include: [Permission], raw: true })),

    addParentRole: w(async (role, parentRole) => {
        config.rbac.grant(await config.rbac.getRole(parentRole.role), await config.rbac.getRole(role.role))
        Role.update({ parent_role: parentRole.id }, { where: { id: role.id } })
    })

}
