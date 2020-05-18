'use strict'


const Permission = require('../sequelize-model').Permission

module.exports = {
    /**
     *
     * @param method
     * @param path
     * @param description
     * @returns {Promise<void>}
     */
    create: async (method, path, description) =>
         Permission.create({
            method: method,
            path: path,
            description: description
        }),

    /**
     *
     * @param method
     * @param path
     * @returns {Promise<void>}
     */
    delete: async (method, path) =>
         Permission.delete({
            where: {
                method: method,
                path: path
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
    getSpecific: async (method, path) =>
        Permission.findAll({
            where: {
                method: method,
                path: path
            }
        }),

}
