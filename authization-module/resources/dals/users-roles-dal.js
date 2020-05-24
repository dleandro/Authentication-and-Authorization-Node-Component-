'use strict'

const UserRole = require('../sequelize-model').UserRoles

module.exports = {

    /**
     * database should return duplicate error to throw
     * @param user
     * @param role
     * @param startDate
     * @param endDate
     * @param updater
     * @param active
     * @returns {Promise<void>}
     */
    create: (user, role, startDate, endDate, updater, active) => UserRole.create({
            user_id: user,
            role_id: role,
            start_date: startDate,
            end_date: endDate,
            updater: updater,
            active: active
        }),
    /**
     *
     * @param id
     * @returns {Promise<void>}
     */
    deactivate: (id) => UserRole.update({active: 0}, {where: {id: id}}),
    /**
     * checks if all User roles are active
     * @returns {Promise<*>}
     */
    getAllActive: () => UserRole.findAll({where: {active: 1}}),
    /**
     *
     * @param id
     * @returns {Promise<*>}
     */
    getUserActiveRoles: (id) => UserRole.findAll({where: {id: id, active: 1}}),
    /**
     *
     * @returns {Promise<void>}
     */
    getAll: () => UserRole.findAll({raw: true}),
    /**
     *
     * @param id
     * @returns {Promise<void>}
     */
    getById: (id) => UserRole.findByPk(id)
}