'use strict'

const UserHistory = require('../functionalities/Models/user_history')
module.exports = {

    /**
     *
     * @param userId
     * @param date
     * @param description
     * @returns {Promise<void>}
     */
    create: async (userId, date, description) =>
        await UserHistory.create({
            user_id: userId,
            date: date,
            description: description
        })
    ,
    /**
     *
     * @returns {Promise<void>}
     */
    getAll: async () =>
        await UserHistory.findAll({ raw: true }),
    /**
     *
     * @param userId
     * @returns {Promise<void>}
     */
    getAllFromUser: async (userId) =>
        await UserHistory.findByPk(userId)

}
