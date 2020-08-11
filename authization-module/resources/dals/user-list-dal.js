const UserList = require('../sequelize-model').UserList,
    List = require('../sequelize-model').List,
    User = require('../sequelize-model').User,
    tryCatch = require('../../common/util/functions-utils')

module.exports = {
    getByUserId: (id) => tryCatch(() => UserList.findByPk(id)),

    /**
    * asks the database for all list entries that are active and associated with a specific user
    * @param userId
    * @returns {Promise<{end_date: *, active, id, list: *, user: *, start_date: *, updater}>}
    */
    getByUser: (userId) =>
        tryCatch(() =>
            UserList.findAll({
                where: {
                    UserId: userId
                }, include: [List], raw: true
            })
        ),


    //TODO: change fields from jointed query
    getByList: (id) => tryCatch(() => UserList.findAll({ where: { ListId: id }, include: [User], raw: true })),

    //TODO: change fields from jointed query
    isUserBlackListed: (user_id) => tryCatch(async () => {
        const userLists = await UserList.findAll({ where: { UserId: user_id }, include: [List], raw: true })

        return userLists.some(userList => userList['List.list'] === 'BLACK' && userList.active == 1)
    }),

    create: (listId, userId, updater, start_date, active) => tryCatch(() => UserList.create({ ListId: listId, UserId: userId, start_date: start_date, active: active, updater: updater }, { include: [List] })),

    delete: async (listId, userId) => Promise.resolve(
        {
            deletedRows: await tryCatch(() => UserList.destroy({ where: { ListId: listId, UserId: userId },individualHooks: true }))
        }
    ),

    update: async (user, start_date, list, end_date, active, updater) => Promise.resolve({
        updatedRows: await tryCatch(() => UserList.update({ start_date, end_date: end_date, active: active, updater: updater },
            { where: { UserId: user, ListId: list } })),
        end_date,
        active,
        updater

    })

}
