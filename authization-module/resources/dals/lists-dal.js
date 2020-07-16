'use strict'

const
    { List, User, UserList } = require('../sequelize-model'),
    w = require('../../common/util/with')

// TODO: should a user be in more than one list?? if not we need to controll that
// the same with user roles

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
    create: w((list) =>
        List.create({
            list: list
        })),


    /**
     * deactivates active list, it only deactivates because we don't wanna change inactive list's status for history purposes
     * @param listId
     * @returns {*}
     */
    deactivate: w((listId) =>
        List.update({ active: 0 }, { where: { id: listId } })),

    /**
     * deletes the user association to a list
     * @param listId
     * @returns {*}
     */
    delete: w((listId) =>
        List.destroy({ where: { id: listId } })),

    /**
     * asks the database for all list entries
     * @returns {
     * PromiseLike<Uint8Array | BigInt64Array | *[] | Float64Array | Int8Array | Float32Array | Int32Array | Uint32Array
     * | Uint8ClampedArray | BigUint64Array | Int16Array | Uint16Array> | Promise<Uint8Array | BigInt64Array | *[]
     * | Float64Array | Int8Array | Float32Array | Int32Array | Uint32Array | Uint8ClampedArray | BigUint64Array | Int16Array | Uint16Array>}
     */
    get: w(() => List.findAll({ raw: true })),

    getById: w((id) => List.findByPk(id)),

    /**
     * asks the database for all list entries that are active at the moment
     * @returns {PromiseLike<function(*=): *> | Promise<function(*=): *>}
     */
    getActive: w(() => List.findAll({ where: { active: 1 } })),

    /**
    * asks the database for all list entries that are active and associated with a specific user
    * @param userId
    * @returns {Promise<{end_date: *, active, id, list: *, user: *, start_date: *, updater}>}
    */
    getUsersActive: w(function getUsersActive(userId) {
        return UserList.findAll({
            where: {
                active: 1,
                UserId: userId
            }
        })
    }),

    update: w((id, list) => List.update({ list: list }, { where: { id: id } })),

    getUsersInThisList: w((id) => List.findAll({ where: { id: id }, include: [User], raw: true })),

    isUserBlackListed: w((userId) =>
        List.findAll({
            where: {
                list: 'BLACK',
                active: 1,
                user_id: userId
            }
        }))
}
