'use strict'


const Permission = require('../sequelize-model').Permission,
rbac=require('../../common/middleware/rbac')

module.exports = {
    /**
     *
     * @param method
     * @param path
     * @param description
     * @returns {Promise<void>}
     */
    create: async (action,resource) =>{
        rbac.createPermission(action,resource)
         Permission.create({
            action: action,
            resource: resource
        })},

    /**
     *
     * @param method
     * @param path
     * @returns {Promise<void>}
     */
    delete: async (id) =>
         Permission.destroy({
            where: {
               id:id
            }
        }),
    /**
     *
     * @returns {Promise<void>}
     */
    getAll: async () =>
         Permission.findAll({raw: true}),
    /**
     *
     * @param id
     * @returns {Promise<void>}
     */
    getSpecificById: async (id) =>
        Permission.findByPk(id),
    /**
     *
     * @param method
     * @param path
     * @returns {Promise<*>}
     */
    getSpecific: async (action, resource) =>
        Permission.findAll({
            where: {
                action: action,
                resource: resource
            }
        }),

}
