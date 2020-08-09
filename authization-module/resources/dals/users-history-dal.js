'use strict'

const UserHistory = require('../sequelize-model').UserHistory,
    tryCatch = require('../../common/util/functions-utils')

module.exports = {

    /**
     *
     * @param userId
     * @param date
     * @param description
     * @returns {Promise<void>}
     */
    create: (date, updater, description, user_id) => tryCatch(() => UserHistory.create({
        date, updater, description, user_id
    })),

    /**
     *
     * @returns {Promise<void>}
     */
    get: () => tryCatch(() => UserHistory.findAll({ raw: true })),

    getAllFromUser: (userId) => tryCatch(() => UserHistory.findAll({ where: { user_id: userId } })),

    OLDsaveHistory: (req, res, next) => {
        const resource = req.path.split("/")[2]
        const action = req.method

        const user = req.user
        const from = req.connection.remoteAddress
        if (req.user) {
            UserHistory.create({
                user_id: user.id,
                date: new Date(),
                success: 1,
                action: action,
                resource: resource,
                from: from
            })
        }
        next()
    }

}

