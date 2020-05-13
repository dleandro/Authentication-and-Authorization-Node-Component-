'use strict'

const dalUtils = require('../common/util/dal-utils')
module.exports = {
    /**
     *
     * @param role
     * @param permission
     * @returns {Promise<void>}
     */
    create: async (role, permission) => dalUtils
        .executeQuery(
            {
                statement: `INSERT INTO Roles_Permission(role,permission) VALUES (?,?);`,
                description: "adding role_permission",
                params: [role, permission]}),
    /**
     *
     * @param role
     * @param permission
     * @returns {Promise<void>}
     */
    delete: async (role, permission) => dalUtils.executeQuery(
        {
            statement: `DELETE FROM Roles_Permission Where role=? AND permission=?`,
            description: "deleting role_permission",
            params: [role, permission]}),
    /**
     *
     * @param permission
     * @returns {Promise<void>}
     */
    getRolesByPermission: async (permission) =>dalUtils.executeQuery(
        {
            statement: `Select * from Roles_Permission where permission=?`,
            description: "get roles by permission",
            params: [permission]})

}
