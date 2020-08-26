const {UserList, List, User} = require('../sequelize-model'),
    tryCatch = require('../../common/util/functions-utils');

module.exports = {
    getByUserId: id => tryCatch(() => UserList.findByPk(id)),

    /**
     * asks the database for all list entries that are active and associated with a specific user
     * @returns {Promise<{end_date: *, active, id, list: *, user: *, start_date: *, updater}>}
     * @param UserId
     */
    getByUser: UserId => tryCatch(() => UserList.findAll({where: {UserId}, include: [List], raw: true})),


    //TODO: change fields from jointed query
    getByList: id => tryCatch(() => UserList.findAll({ where: { ListId: id }, include: [User], raw: true })),

    //TODO: change fields from jointed query
    isUserBlackListed: UserId => tryCatch(() => UserList
        .findAll({ where: {UserId}, include: [List], raw: true })
        .then(userLists=>userLists.some(userList => userList['List.list'] === 'BLACK' && userList.active === 1))),

    create: (ListId, UserId, updater, start_date, end_date, active) => tryCatch(() => UserList.create({ListId,UserId,start_date,end_date, active, updater }, { include: [List] })),

    delete: async (ListId, UserId) => Promise.resolve({deletedRows: await tryCatch(() => UserList.destroy({ where: { ListId, UserId },individualHooks: true }))}),

    update: async (user, list, start_date, end_date, active, updater) => Promise.resolve({
        updatedRows:
            await tryCatch(() => UserList.update({ start_date, end_date, active, updater}, { where: { UserId: user, ListId: list } })),
        end_date, active, updater}),

    changeActiveFlag: (UserId, ListId, newState) => tryCatch(() => UserList.update({ active: newState }, { where: { UserId, ListId } })),

}
