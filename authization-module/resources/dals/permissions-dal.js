
const
    tryCatch = require('../../common/util/functions-utils'),
    Permission = require('../sequelize-model').Permission,
    {rbac} = require('../../common/config/config');

module.exports = {

    /**
     *
     * @returns {Promise<void>}
     * @param action
     * @param resource
     */
    create: (action, resource) => tryCatch(() => rbac.createPermission(action, resource, true)
        .then(()=>Permission.findOrCreate({where: {action,resource}}))
        .then(perm=>perm[0])),

    /**
     *
     * @returns {Promise<void>}
     * @param id
     */
    delete: id =>
        tryCatch(async () => {
            const {action, resource} = await require('./permissions-dal').getSpecificById(id);
            rbac.removeByName(`${action}_${resource}`);
            return Promise.resolve({deletedRows: await Permission.destroy({ where: { id } })});
        }),
    /**
     *
     * @returns {Promise<void>}
     */
    get: () => tryCatch(() => Permission.findAll({ raw: true })),
    /**
     *
     * @param id
     * @returns {Promise<void>}
     */
    getSpecificById: id => tryCatch(() => Permission.findByPk(id)),
    /**
     *
     * @returns {Promise<*>}
     * @param action
     * @param resource
     */
    getSpecific: (action, resource) => tryCatch(() => Permission.findOne({where: {action, resource}})),

    update: async (id, action, resource) => Promise.resolve({insertedRows: await tryCatch(() => Permission.update({ action, resource }, { where: { id } })), action, resource, id}),

}