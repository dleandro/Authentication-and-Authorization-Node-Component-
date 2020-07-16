'use strict'

const UserHistory = require('../sequelize-model').UserHistory,
w = require('../../common/util/with')

module.exports = {

    /**
     *
     * @param userId
     * @param date
     * @param description
     * @returns {Promise<void>}
     */
    create: w((userId, date, description) => UserHistory.create({
            user_id: userId,
            date: date,
            description: description
        }))
    ,
    /**
     *
     * @returns {Promise<void>}
     */
    get: w(() => UserHistory.findAll({raw: true})),

    /**
     *
     * @param userId
     * @returns {Promise<void>}
     */
    getAllFromUser: w((userId) =>UserHistory.findByPk(userId))

}
