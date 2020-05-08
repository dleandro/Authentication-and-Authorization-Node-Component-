'use strict'

const
    fetch = require('node-fetch'),
    links = require('../../../links'),
    userLayer = require('../../functionalities/user/manage-users'),
    listLayer = require('../../functionalities/list/manage-lists'),
    BASE_URL = require('../config/config').BASE_URL

module.exports = {

    // All find user functions should search for a list entry, 
    // if it finds one than it should return an error because that user shouldn't login 
    findUser: async (userId) => userLayer.getSpecificUser(userId),

    findUserByIdp: async (idp) => {
        // needs endpoint
        let user = await fetch(`${BASE_URL}${links.users.SPECIFIC_IDP_USER_PATH(idp)}`)
        if (!user) return null
        return {
            id: user.id,
            idp: idp,
            username: user.username
        }
    },

    findCorrespondingUser: async (username) => {
        try {
            return await fetch(`${BASE_URL}${links.users.SPECIFIC_USERNAME_PATH(username)}`)
        } catch (error) {
            return null
        }
    },

    /*
    When Using identity providers you need this method to create an entry on the database for the user using the identity provider 
    If there is an entry for the user who is trying to authenticate we simply search its id on our database and return the specific user
    */
    createUser: async (idpId, idpName, username, password) => {

        let result = userLayer.createUser(username, password)

        let user_id = result.id

        result = await fetch(`${BASE_URL}${links.users.IDP_USER_PATH}`, {

            method: 'POST',
            body: {
                idpId, 
                idpName,
                idpId: result.insertId
            },
            headers: { 'Content-Type': 'application/json' },

        })

        return {
            id: user_id,
            idp: idpId,
            username: username
        }

    },

    isBlackListed: async (userId) => {
        let result = listLayer.getUserActiveList(userId)

        if (result
            .filter(list => list.LIST == 'BLACK')
            .length >= 1) {
            return true
        }
        return false
    }



}