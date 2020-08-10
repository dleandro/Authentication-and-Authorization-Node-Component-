const { Session } = require('../sequelize-model'),
    tryCatch = require('../../common/util/functions-utils')


module.exports = {
    get: () => tryCatch(() => Session.findAll()),

    getUserSessions: (id) => tryCatch(() => Session.findAll({
        where: { UserId: id }
    })),

    update: async (sid) => tryCatch(() => Session.update({
        expires: endDate,
    },
        { where: { sid: sid } })
    ),

    delete: async (sid) => Promise.resolve(
        {
            deletedRows: await tryCatch(() => Session.destroy({ where: { sid: sid } }))
        })
}
