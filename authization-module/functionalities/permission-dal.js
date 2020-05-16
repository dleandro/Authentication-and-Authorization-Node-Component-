'use strict'


const Permission = require('../functionalities/Models/permission')

module.exports = {
    /**
     *
     * @param method
     * @param path
     * @param description
     * @returns {Promise<void>}
     */
    create: async (method, path, description) =>
        await Permission.create({
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
        await Permission.delete({
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
        await Permission.findAll({ raw: true }),
    /**
     *
     * @param id
     * @returns {Promise<void>}
     */
    getSpecificById: async (id) =>
        await Permission.findByPk(id),
    /**
     *
     * @param method
     * @param path
     * @returns {Promise<*>}
     */
    getSpecific: async (method, path) =>
        await Permission.findAll({
            where: {
                method: method,
                path: path
            }
        }),

}
