'use strict'

const
    { Role, User, UserRoles } = require('../sequelize-model'),
    tryCatch = require('../../common/util/functions-utils')


module.exports = {

    /**
     * database should return duplicate error to throw
     * @param user
     * @param role
     * @param startDate
     * @param endDate
     * @param updater
     * @param active
     * @returns {Promise<void>}
     */
    create: async (user, role, startDate, endDate, updater, active) => tryCatch(() => UserRoles.create({
        UserId: user,
        RoleId: role,
        start_date: startDate,
        end_date: endDate,
        updater: updater,
        active: active
    })),
    /**
     *
     * @param id
     * @returns {Promise<void>}
     */
    deactivate: (id) => tryCatch(() => UserRoles.update({ active: 0 }, { where: { UserId: id } })),
    /**
     * checks if all User roles are active
     * @returns {Promise<*>}
     */
    getActive: () => tryCatch(UserRoles.findAll({ where: { active: 1 } })),
    /**
     *
     * @param id
     * @returns {Promise<*>}
     */
    getByUser: (id) => tryCatch(() => UserRoles.findAll({ where: { UserId: id, active: 1 } })),

    getByRole: (roleId) => tryCatch(() => UserRoles.findAll({ where: { RoleId: roleId }, include: [User], raw: true })),

    /**
     *
     * @returns {Promise<void>}
     */
    get: () => tryCatch(() => UserRoles.findAll({ raw: true })),
    /**
     *
     * @param id
     * @returns {Promise<void>}
     */
    getById: (id) => tryCatch(() => UserRoles.findByPk(id)),

    getUserRoles: (userId) => tryCatch(async () => {

        const users = await UserRoles.findAll({ where: { UserId: userId }, include: [Role], raw: true })

        return users.map(user => {
            user.role = user['Role.role']
            delete user['Role.role']
            delete user['Role.id']
            user.parentRole = user['Role.parent_role']
            delete user['Role.parent_role']
            return user
        })
    }),

    delete: (UserId, RoleId) => Promise.resolve(
        {
            deletedRows: tryCatch(async () => await UserRoles.destroy({ where: { UserId: UserId, RoleId: RoleId } }))
        }),

    update: async (user, role, endDate, active) => Promise.resolve(
        {
            updatedRows: await tryCatch(() => UserRoles.update({
                end_date: endDate,
                active: active
            },
                { where: { UserId: user, RoleId: role } })),
            endDate,
            active
        }
    )


}
