'use strict'

const
    userLayer = require('../../functionalities/user/manage-users'),
    listLayer = require('../../functionalities/list/manage-lists'),
    BASE_URL = require('../config/config').BASE_URL

module.exports = {

    // All find user functions should search for a list entry, 
    // if it finds one than it should return an error because that user shouldn't login 
    findUser: async (userId) => userLayer.getSpecificUser(userId),

    findUserByIdp: async (idp) => {
        // needs endpoint
<<<<<<< HEAD
        let user = userLayer.getUserByIDP(idp)
        if (!user) return null
        return {
            id: user.id,
            idp: idp,
            username: user.username
        }
=======
        let user = userLayer.getUserByIdp(idp)
        return user? {id: user.id,idp: idp,username: user.username}:null
>>>>>>> 1ba1a3abcfb18f71b2139d0783c16b46e6cea740
    },

    findCorrespondingUser: async (username) => {
        try {
            return userLayer.getUserByUsername(username)
        } catch (error) {
            return null
        }
    },

    /*
    When Using identity providers you need this method to create an entry on the database for the user using the identity provider 
    If there is an entry for the user who is trying to authenticate we simply search its id on our database and return the specific user
    */
    createUser: async (idpId, idpName, username, password) => {

        let user_id = userLayer.createUser(username, password).id
        userLayer.insertIDP(idp_id, idpName, user_id)
        return {
            id: user_id,
            idp: idpId,
            username: username
        }
    },

    isBlackListed: async (userId) => listLayer.getUserActiveList(userId).filter(({LIST}) => LIST === 'BLACK').length >= 1
}