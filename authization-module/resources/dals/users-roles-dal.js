const
    { Role, User, UserRoles } = require('../sequelize-model'),
    tryCatch = require('../../common/util/functions-utils');


module.exports = {

    /**
     * database should return duplicate error to throw
     * @param user
     * @param role
     * @param startDate
     * @param end_date
     * @param updater
     * @param active
     * @returns {Promise<void>}
     */
    create: async (user, role, startDate, end_date, updater, active) => tryCatch(() =>
        UserRoles.create({UserId: user, RoleId: role, start_date: startDate, end_date, updater, active})),
    /**
     *
     * @returns {Promise<void>}
     * @param UserId
     * @param RoleId
     * @param newState
     */
    changeActiveFlag: (UserId, RoleId, newState) => tryCatch(() => UserRoles.update({ active: newState }, { where: { UserId, RoleId } })),
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
    getUserActiveRoles: id => tryCatch(() => UserRoles.findAll({ where: { UserId: id, active: 1 }, include: [Role], raw: true  })),

    getByRole: RoleId => tryCatch(() => UserRoles.findAll({ where: { RoleId}, include: [User], raw: true })),

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
    getById: id => tryCatch(() => UserRoles.findByPk(id)),

    getByUser: userId => tryCatch(async () => {
        const users = await UserRoles.findAll({ where: { UserId: userId }, include: [Role], raw: true });
        return users.map(user => {
            const {'Role.role': role, 'Role.parent_role': parentRole,'Role.id': unused, ...rest}=user;
            return {role,parentRole,...rest};
        });
    }),

    delete: (UserId, RoleId) => Promise.resolve({deletedRows: tryCatch(() => UserRoles.destroy({ where: {UserId, RoleId},individualHooks: true }))}),

    update: async (user, role, start_date, end_date, active,updater) => Promise.resolve({
        updatedRows:
            await tryCatch(() => UserRoles.update({start_date, end_date, active, updater}, { where: { UserId: user, RoleId: role } })),
        end_date, active, updater,
    }),
};
