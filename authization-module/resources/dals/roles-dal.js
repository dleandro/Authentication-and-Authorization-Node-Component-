const {Role, Permission, Op} = require('../sequelize-model'),
    {rbac} = require('../../common/config/config'),
    tryCatch = require('../../common/util/functions-utils');

const getSpecificById = roleId => tryCatch(() => Role.findByPk(roleId));

module.exports = {

    /**
     *
     * @param role
     * @returns {Promise<void>}
     */
    create: async (role, parent_role) => tryCatch(async () => {
        await rbac.createRole(role, true);
        if (parent_role) {
            await rbac.grantByName((await getSpecificById(parent_role)).role, role);
        }
        return (await Role.findOrCreate({defaults: {parent_role}, where: {role}}))[0];
    }),

    update: async (id, parent_role) => {
        const rbacRole = getSpecificById(id).then(({role})=>rbac.getRole(role));
        rbac.grant(await rbac.getRole(parent_role.label), await rbacRole);
        return Promise.resolve({insertedRows: await tryCatch(() => Role.update({parent_role: parent_role.value}, {where: {id}})), parent_role});
    },


    /**
     *
     * @param roleId
     * @returns {Promise<*>}
     */
    getSpecificById,

    getWithParents: () => tryCatch(() => Role.findAll({where: {parent_role: {[Op.ne]: null}}})),

    getByName: roleName => tryCatch(() => Role.findOne({where: {role: roleName}})),
    /**
     *
     * @param roleId
     * @returns {Promise<void>}
     */
    delete: async roleId =>
        tryCatch(async () => {
            await getSpecificById(roleId).then(({role})=>rbac.removeByName(role));
            return Promise.resolve({deletedRows: await Role.destroy({where: {id: roleId}})});
        }),
    /**
     *
     * @returns {Promise<void>}
     */
    get: () => tryCatch(() => Role.findAll({raw: true})),

    addParentRole: (role, parentRole) => tryCatch(async () => {
        rbac.grant(await rbac.getRole(parentRole.role), await rbac.getRole(role.role));
        return Role.update({parent_role: parentRole.id}, {where: {id: role.id,}});
    }),

};
