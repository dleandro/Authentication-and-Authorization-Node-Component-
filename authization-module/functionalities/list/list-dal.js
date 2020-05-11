'use strict'

const moment = require('moment')
const dalUtils = require('../../common/util/dal-utils')
let parseList = (list)=> { return {
    user: list.user_id,
    list: list.LIST,
    start_date: list.start_date,
    end_date: list.end_date,
    updater: list.updater,
    active: list.active[0],
    id: list.id
}}

async function getUserActiveList(userId) {
    return dalUtils.executeQuery({
        statement: `Select * from Lists where user_id=? AND active=1 AND end_date>'${moment().format("YYYY-MM-DD HH:mm:ss")}'`,
        description: "getting user's active lists",
        params: [userId]
    }).then(result=>{ return {
        user: userId,
        list: result[0].LIST,
        start_date: result[0].start_date,
        end_date: result[0].end_date,
        updater: result[0].updater,
        active: result[0].active[0],
        id: result[0].id
    }})
}

module.exports = {



    // Creates a list entry with a user_id associated and a type of list
    addList: (user_id, list, start_date, end_date, updater, active) => getUserActiveList(user_id).then(val=> dalUtils.executeQuery(
        {
            statement: `INSERT INTO Lists(user_id,list,start_date,end_date,updater,active) VALUES (?,?,?,?,?,?);`,
            description: "adding list",
            params: [user_id, list, start_date, end_date, updater, active]

        })
    ),

    // deactivates active list, it only deactivates because we don't wanna change inactive list's status for history purposes
    deactivateList: (listId) => dalUtils.executeQuery(
        {
            statement: 'UPDATE Lists SET active = 0 WHERE id = ?',
            description: "deactivate list's status",
            params: [listId]
        }),

    // deletes the user association to a list
    deleteList: (listId) => dalUtils.executeQuery(
        {
            statement: `DELETE FROM Lists WHERE id=?`,
            description: "deleting list",
            params: [listId]
        }),

    // asks the database for all list entries
    getLists: () => dalUtils.executeQuery(
        {
            statement: `Select * from Lists`,
            description: "getting all lists",
            params: []
        })
        .then(result=> result.map(list => parseList(list)))
    ,

    // asks the database for all list entries that are active at the moment
    getActiveLists:  () => dalUtils.executeQuery(
        {
            statement: `Select * from Lists where active=1 AND end_date>'${moment().format("YYYY-MM-DD HH:mm:ss")}'`,
            description: "getting active lists",
            params: []
        })
        .then(result=>result.map(list => parseList(list))),

    // asks the database for all list entries that are active and associated with a specific user
    getUserActiveList:(userId)=>dalUtils.executeQuery(
        {
            statement: `Select * from Lists where user_id=? AND active=1 AND end_date>'${moment().format("YYYY-MM-DD HH:mm:ss")}'`,
            description: "getting user's active lists",
            params: [userId]
        })
        .then(result=>{ return {
            user: userId,
            list: result[0].LIST,
            start_date: result[0].start_date,
            end_date: result[0].end_date,
            updater: result[0].updater,
            active: result[0].active[0],
            id: result[0].id
        }}),

    isBlackListed: (userId) => dalUtils.executeQuery(
        {
            statement: `Select * from Lists where user_id=? AND active=1 AND LIST='BLACK'`,
            description: "checking if user is blacklisted",
            params: [userId]
        })
}
