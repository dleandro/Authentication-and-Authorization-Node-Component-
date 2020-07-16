'use strict'

const { Role } = require('../sequelize-model'),
w = require('../../common/util/with')



const Permission = require('../sequelize-model').Permission,
    config = require('../../common/config/config')

module.exports = {

    /**
  *
  * @param method
  * @param path
  * @param description
  * @returns {Promise<void>}
  */
    create: w((action, resource) => {
        config.rbac.createPermission(action, resource, true)
        return Permission.findOrCreate({
            where: {
                action: action,
                resource: resource
            }
        })
    }),

    /**
     *
     * @param method
     * @param path
     * @returns {Promise<void>}
     */
    delete: w((id) =>
        Permission.destroy({
            where: {
                id: id
            }
        })),
    /**
     *
     * @returns {Promise<void>}
     */
    get: w(() =>
        Permission.findAll({ raw: true })),
    /**
     *
     * @param id
     * @returns {Promise<void>}
     */
    getSpecificById: w((id) => Permission.findByPk(id)),
    /**
     *
     * @param method
     * @param path
     * @returns {Promise<*>}
     */
    getSpecific: w((action, resource) =>
        Permission.findOne({
            where: {
                action: action,
                resource: resource
            }
        })),

    update: w((id, action, resource) => Permission.update({ action: action, resource: resource }, { where: { id: id } })),
    getRolesByPermission: w((id) => Permission.findAll({ where: { id: id }, include: [Role], raw: true }))

}

