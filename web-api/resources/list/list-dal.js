'use strict'

const moment = require('moment')


// This module is the data access layer for the list entity, it provides every operation involving Lists
module.exports = function (dalUtils, errors) {

    async function getUserActiveList(userId) {

        const query = {
            statement: `Select * from Lists where user_id=? AND active=1 AND end_date>'${moment().format("YYYY-MM-DD HH:mm:ss")}'`,
            description: "getting user's active lists",
            params: [userId]
        }

        try {
            return await dalUtils.executeQuery(query)

        } catch (error) {
            throw error
        }


    }

    return {

        // Creates a list entry with a user_id associated and a type of list
        addList: async (user_id, list, start_date, end_date, updater, active) => {

            const query = {
                statement: `INSERT INTO Lists(user_id,list,start_date,end_date,updater,active) VALUES (?,?,?,?,?,?);`,
                description: "adding list",
                params: [user_id, list, start_date, end_date, updater, active]
            }

            try {

                var userActiveList = await getUserActiveList(user_id)

                // if there already are any active lists from this user throw error
                dalUtils.throwErrorIfNecessary(
                    () => userActiveList.length != 0,
                    errors.userDuplicateActiveList)

                return await dalUtils.executeQuery(query)

            } catch (error) {
                throw error
            }

        },

        // deactivates active list, it only deactivates because we don't wanna change inactive list's status for history purposes
        deactivateList: async (listId) => {

            const query = {
                statement: 'UPDATE Lists SET active = 0 WHERE id = ?',
                description: "deactivate list's status",
                params: [listId]
            }

            try {

                return await dalUtils.executeQuery(query)

            } catch (error) {
                throw error
            }
        },

        // deletes the user association to a list
        deleteList: async (listId) => {

            const query = {
                statement: `DELETE FROM Lists WHERE id=?`,
                description: "deleting list",
                params: [listId]
            }

            var result

            try {

                result = await dalUtils.executeQuery(query)

                // if there were no affected rows then the deletion didn't occur
                // so we need to throw an error and alert the user
                dalUtils.throwErrorIfNecessary(
                    () => result.affectedRows == 0,
                    errors.noListFound)

            } catch (error) {
                throw error
            }

            return result

        },

        // asks the database for all list entries
        getLists: async () => {

            const query = {
                statement: `Select * from Lists`,
                description: "getting all lists",
                params: []
            }

            try {

                var result = await dalUtils
                    .executeQuery(query)

                // if there weren't any lists found return with an exception
                dalUtils.throwErrorIfNecessary(
                    () => result.length < 1,
                    errors.noListFound)

                return result
                    .map(list => {

                        return {
                            user: list.user_id,
                            list: list.LIST,
                            start_date: list.start_date,
                            end_date: list.end_date,
                            updater: list.updater,
                            active: list.active[0],
                            id: list.id
                        }
                    })

            } catch (error) {
                throw error
            }


        },

        // asks the database for all list entries that are active at the moment
        getActiveLists: async () => {

            const query = {
                statement: `Select * from Lists where active=1 AND end_date<'${moment().format("YYYY-MM-DD HH:mm:ss")}'`,
                description: "getting active lists",
                params: []
            }

            try {
                var result = await dalUtils
                    .executeQuery(query)

                // if there weren't any lists found return with an exception
                dalUtils.throwErrorIfNecessary(
                    () => result.length < 1,
                    errors.noListFound)

                return result
                    .map(list => {
                        return {
                            user: list.user_id,
                            list: list.LIST,
                            start_date: list.start_date,
                            end_date: list.end_date,
                            updater: list.updater,
                            active: list.active[0],
                            id: list.id
                        }
                    })

            } catch (error) {
                throw error
            }


        },

        // asks the database for all list entries that are active and associated with a specific user
        getUserActiveList: async (userId) => {

            const query = {
                statement: `Select * from Lists where user_id=? AND active=1 AND end_date<'${moment().format("YYYY-MM-DD HH:mm:ss")}'`,
                description: "getting user's active lists",
                params: [userId]
            }

            console.log(query)

            try {
                var result = await dalUtils.executeQuery(query)

                console.log(result)

                // if there weren't any lists found return with an exception
                dalUtils.throwErrorIfNecessary(
                    () => result.length < 1,
                    errors.noListFound)

                return {
                    user: userId,
                    list: result[0].LIST,
                    start_date: result[0].start_date,
                    end_date: result[0].end_date,
                    updater: result[0].updater,
                    active: result[0].active[0],
                    id: result[0].id
                }

            } catch (error) {
                console.log(error)
                throw error
            }


        },

        isBlackListed: async (userId) => {
            const query = {
                statement: `Select * from Lists where user_id=? AND active=1 AND LIST='BLACK'`,
                description: "checking if user is blacklisted",
                params: [userId]
            }
            try {
                return await dalUtils.executeQuery(query)

            } catch (error) {
                throw error
            }

        }
    }

}
