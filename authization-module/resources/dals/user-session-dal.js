const { Session } = require('../sequelize-model'),
    w = require('../../common/util/with')


module.exports = {
    get: w(() => Session.findAll()),
    getUserSessions: w((id) => Session.findAll({
        where: { UserId: id }
    }))
}
