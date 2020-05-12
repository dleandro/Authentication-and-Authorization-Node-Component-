'use strict'

const
    userLayer = require('../../functionalities/user-dal'),
    listLayer = require('../../functionalities/list-dal'),
    idpLayer=require('../../functionalities/idp-dal'),
    userHistoryLayer=require('../../functionalities/user-history-dal'),
    BASE_URL = require('../config/config').BASE_URL,
    moment=require('moment')

/**
 *
 * @type {
 * {findUser: (function(*=): Promise<{password: *, id: *, username: *}>),
 * findUserByIdp: (function(*=): *),
 * isBlackListed: (function(*=): boolean),
 * addNotification: addNotification,
 * findCorrespondingUser: findCorrespondingUser,
 * createUser: (function(*=, *=, *=, *=): {idp_id: *, id: number, username: *})}
 * }
 */
module.exports = {

    /**
     * All find user functions should search for a list entry,
     * if it finds one than it should return an error because that user shouldn't login
     * @param userId
     * @returns {Promise<{password: *, id: *, username: *}>}
     */
    findUser: (userId) => userLayer.getUserById(userId),
    /**
     *
     * @param idp
     * @returns {Promise<*>}
     */
    findUserByIdp: async (idp) => {
        // needs endpoint
        const user = await userLayer.getUserbyIDP(idp)
        return user ? { id: user.id, idp: idp, username: user.username } : null
    },
    /**
     *
     * @param username
     * @returns {Promise<{password: *, id: *, username: *}|null>}
     */
    findCorrespondingUser: async (username) => {
        try {
            return await userLayer.getUserByUsername(username)
        } catch (error) {
            return null
        }
    },

    /**
     * When Using identity providers you need this method to create an entry on the database for the user using the identity provider
     * If there is an entry for the user who is trying to authenticate we simply search its id on our database and return the specific user
     * @param idp_id
     * @param idpName
     * @param username
     * @param password
     * @returns {Promise<{idp_id: *, id: number, username: *}>}
     */
    createUser: async (idp_id, idpName, username, password) => {

        const user_id = await userLayer.insertUser(username, password)
        
        await idpLayer.insertIDP(idp_id, idpName, user_id.insertId)

        return {
            id: user_id.insertId,
            idp_id,
            username: username
        }
    },
    /**
     *
     * @param userId
     * @returns {Promise<boolean>}
     */
    isBlackListed: async (userId) => {
         let result=await listLayer.isBlackListed(userId)
         return result.length>0
    },
    /**
     *
     * @param userId
     * @returns {Promise<void>}
     */
    addNotification : async(userId)=>{
        await userHistoryLayer.addUserHistory(userId, moment().format("YYYY-MM-DD HH:mm:ss"), "BlackListed User tried to Login")
    }    
}