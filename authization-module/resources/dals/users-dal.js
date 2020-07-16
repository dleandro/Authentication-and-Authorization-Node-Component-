'use strict'

const Users = require('../sequelize-model').User,
    Idp = require('../sequelize-model').Idp,
    Role = require('../sequelize-model').Role,
    w = require('../../common/util/with')

const getById = w((id) => Users.findByPk(id))

module.exports = {
    /**
     *
     * @param idp
     * @returns {Promise<void>}
     */
    getByIdp: w(async (idp) => {
        const result = await Idp.findAll({ where: { idp_id: idp } })
        return result[0] == null ? null : getById(result[0].user_id)
    }),
    /**
     * Requests the database for a user with given id
     * @param id
     * @returns {Promise<*>}
     */
    getById: getById,

    /**
     *
     * @param username
     * @returns {Promise<{password: *, id: *, username: *}>}
     */
    getByUsername: w((username) => Users.findOne({ where: { username: username } })),


    /**
     * Requests the database to return user's that match username and password parameters
     returns the first user found with such parameters
     * @param username
     * @param password
     * @returns {Promise<{password: *, id: *, username: *}>}
     */
    getByUsernameAndPassword: w((username, password) => Users.findOne({ where: { username: username, password: password } })),

    /**
     * Requests the database for all existing users
     * @returns {Promise<*>}
     */
    get: w(() => Users.findAll({ raw: true })),

    /**
     * Requests the database for a new entry in the table users
     Should throw error if there already exists a user with the same parameters
     * @param username
     * @param password
     * @returns {Promise<void>}
     */
    create: w((username, password) => Users.create({ username: username, password: password })),


    /**
     * update specific user's username
     * @param username
     * @param id
     * @returns {Promise<void>}
     */
    updateUsername: w((username, id) => Users.update({ username: username }, { where: { id: id } })),

    /**
     * update specific user's password
     * @param password
     * @param id
     * @returns {Promise<void>}
     */
    updatePassword: w((password, id) => Users.update({ password: password }, { where: { id: id } })),

    /**
     *delete user in the database with given id
     * @param userId
     * @returns {Promise<void>}
     */
    delete: w((userId) => Users.destroy({ where: { id: userId } })),

    getUserRoles: w((userId) => Users.findAll({ where: { id: userId }, include: [Role], raw: true }))


}
