'use strict'

const moment = require('moment')


// This module is the data access layer for the list entity, it provides every operation involving Lists
module.exports = function(dalUtils, errors) {

    async function getUserActiveList(userId){
            
        const query = {
            statement: `Select * from Lists where user_id=? AND active=1 AND end_date>'${moment().format()}'`,
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
        addList: async (user, list, start_date, end_date, updater) => {
            
            var result 
            
            const query = {
                statement: `INSERT INTO Lists(user_id,list,start_date,end_date,updater) VALUES (?,?,?,?,?);`,
                description: "adding list",
                params: [user, list, start_date, end_date, updater]
            }
            
            try {

                var userActiveList = await getUserActiveList(user)

                if (userActiveList.length != 0) {
                    throw errors.userDuplicateActiveList
                }
                
                result = await dalUtils.executeQuery(query)             
                
            } catch (error) {
                throw error
            }
            
            return result
            
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
                
            } catch (error) {
                throw error
            }

            return result
            
        },
        
        // asks the database for all list entries
        getLists: async () => {
            
            const query = {
                statement: `Select * from List`,
                description: "getting all lists",
                params: [user,list,start_date,end_date,updater]
            }
            
            try {
                return await dalUtils.executeQuery(query)             
                
            } catch (error) {
                throw error
            }
            
            
        },

        // asks the database for all list entries that are active at the moment
        getActiveLists: async () => {
            
            const query = {
                statement: `Select * from List where active=1 AND end_date<${moment().format()}`,
                description: "getting active lists",
                params: []
            }
            
            try {
                return await dalUtils.executeQuery(query)             
                
            } catch (error) {
                throw error
            }
            
            
        },

        // asks the database for all list entries that are active and associated with a specific user
        getUserActiveList: async (userId) => {
            
            const query = {
                statement: `Select * from List where user_id=? AND active=1 AND end_date<${moment().format()}`,
                description: "getting user's active lists",
                params: [userId]
            }
            
            try {
                return await dalUtils.executeQuery(query)             
                
            } catch (error) {
                throw error
            }
            
            
        },
        isBlackListed:async(userId)=>{
            const query={
                statement:`Select * from Lists where user_id=? AND active=1 AND LIST='BLACK'`,
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
