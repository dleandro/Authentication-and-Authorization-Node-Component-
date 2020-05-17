'use strict'

const List = require('../sequelize-model').List


/**
 *
 * @param userId
 * @returns {Promise<{end_date: *, active, id, list: *, user: *, start_date: *, updater}>}
 */
async function getUsersActive(userId) {
    await List.findAll({
        where: {
            active: 1,
            user_id: userId
        }
    })
}

module.exports = {



    /**
     * Creates a list entry with a user_id associated and a type of list
     * @param userId
     * @param list
     * @param startDate
     * @param endDate
     * @param updater
     * @param active
     * @returns {Promise<CustomError>}
     */
    create: async (userId, list, startDate, endDate, updater, active) =>
        await List.create({
            user_id: userId,
            list: list,
            start_date: startDate,
            end_date: endDate,
            updater: updater,
            active: active
        }),


    /**
     * deactivates active list, it only deactivates because we don't wanna change inactive list's status for history purposes
     * @param listId
     * @returns {*}
     */
    deactivate: async (listId) =>
        await List.update({ active: 0 }, { where: { id: listId } }),

    /**
     * deletes the user association to a list
     * @param listId
     * @returns {*}
     */
    delete: async (listId) =>
        await List.destroy({ where: { id: listId } }),

    /**
     * asks the database for all list entries
     * @returns {
     * PromiseLike<Uint8Array | BigInt64Array | *[] | Float64Array | Int8Array | Float32Array | Int32Array | Uint32Array
     * | Uint8ClampedArray | BigUint64Array | Int16Array | Uint16Array> | Promise<Uint8Array | BigInt64Array | *[]
     * | Float64Array | Int8Array | Float32Array | Int32Array | Uint32Array | Uint8ClampedArray | BigUint64Array | Int16Array | Uint16Array>}
     */
    getAll: async () =>
        await List.findAll({ raw: true })
    ,

    /**
     * asks the database for all list entries that are active at the moment
     * @returns {PromiseLike<function(*=): *> | Promise<function(*=): *>}
     */
    getAllActive: async () =>
        await List.findAll({ where: { active: 1 } }),

    // asks the database for all list entries that are active and associated with a specific user
    getUsersActive,

    isUserBlackListed: async (userId) =>
        await List.findAll({
            where: {
                list: 'BLACK',
                active: 1,
                user_id: userId
            }
        })
}
