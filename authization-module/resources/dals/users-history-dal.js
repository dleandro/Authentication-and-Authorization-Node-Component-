const UserHistory = require('../sequelize-model').UserHistory,
    tryCatch = require('../../common/util/functions-utils');

module.exports = {

    /**
     *
     * @param date
     * @param updater
     * @param description
     * @param user_id
     * @returns {Promise<void>}
     */
    create: (date, updater, description, user_id) => tryCatch(() => UserHistory.create({date, updater, description, user_id})),

    /**
     *
     * @returns {Promise<void>}
     */
    get: () => tryCatch(() => UserHistory.findAll({ raw: true })),

    getAllFromUser: userId => tryCatch(() => UserHistory.findAll({ where: { user_id: userId } })),

    OLDsaveHistory: (req, res, next) => {
        if (req.user) {
            const [, , resource] = req.path.split('/');
            UserHistory.create({resource, user_id: req.user.id, date: new Date(), success: 1, action: req.method, from: req.connection.remoteAddress});
        }
        next();
    },

};
