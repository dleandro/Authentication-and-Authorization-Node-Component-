'use strict'

const dalUtils = require('../common/util/dal-utils')
module.exports = {
    /**
     *
     * @param role
     * @returns {Promise<void>}
     */
    create: async (role) =>dalUtils
        .executeQuery(
            {
                statement: `INSERT INTO Roles(role) VALUES (?);`,
                description: "adding role",
                params: [role]}),
    /**
     *
     * @param roleId
     * @returns {Promise<*>}
     */
    getSpecificById: async (roleId)=> dalUtils
        .executeQuery(
            {
                statement: `Select * from Roles where id= ?`,
                description: "getting role by id",
                params: [roleId]})
        .then(result=>result.length===0?null:{
            id:result[0].id,
            role:result[0].role,
            parent_role:result[0].parent_role
        }),
    /**
     *
     * @param roleId
     * @returns {Promise<void>}
     */
    delete: async (roleId)=> dalUtils
        .executeQuery(
            {
                statement: `DELETE FROM Roles WHERE id = ?`,
                description: "deleting role",
                params: [roleId]}),
    /**
     *
     * @returns {Promise<void>}
     */
    getAll: async () => dalUtils
        .executeQuery(
            {
                statement: `Select * from Roles`,
                description: "getting all roles",
                params: []})
}
