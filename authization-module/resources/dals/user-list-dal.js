const UserList = require('../sequelize-model').UserList,
    List = require('../sequelize-model').List,
    User = require('../sequelize-model').User,
    w = require('../../common/util/with')

module.exports = {
    getByUserId: w((id) => UserList.findByPk(id)),
    isUserBlackListed: w((user_id) => User.findAll({ where: { id: user_id }, include: [List], raw: true })),
    create: w((listId, userId, updater, active) => UserList.create({ ListId: listId, UserId: userId, active: active, updater: updater }))
}
