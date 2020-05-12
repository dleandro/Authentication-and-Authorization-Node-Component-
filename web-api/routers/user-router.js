'use strict'

// this module contains all user related endpoints
module.exports = function (apiUtils) {

    const data = require('../../authization-module/authization').user
    const authization = require('../../authization-module/authization')

    const userRouter = require('express').Router()

    userRouter.use(authization.checkAuthorization.hasPermissions)

    const getAllUsers = (req, res) => {
        data.getAllUsers()
            .then(answer => apiUtils.setResponse(res, answer, 200))
            .catch(err => apiUtils.setResponse(res, JSON.parse(err).message, JSON.parse(err.message).status))
    }

    const createUser = (req, res) => {
        data.insertUser(req.body.username, req.body.password)
            .then(answer => {
                req.body.id = answer.insertId
                apiUtils.setResponse(res, req.body, 201)
            })
            .catch(err => apiUtils.setResponse(res, JSON.parse(err.message), JSON.parse(err.message).status))
    }

    const getSpecificUser = (req, res) => {
        data.getUserById(req.params.id)
            .then(answer => apiUtils.setResponse(res, answer, 200))
            .catch(err => apiUtils.setResponse(res, JSON.parse(err.message), JSON.parse(err.message).status))
    }

    const deleteUser = (req, res) => {
        data.deleteUser(req.params.id)
            .then(answer => apiUtils.setResponse(res, { success: "User deleted" }, 200))
            .catch(err => apiUtils.setResponse(res, JSON.parse(err.message), JSON.parse(err.message).status))
    }

    const getUserFromIdp = (req, res) => {
        data.getUserbyIDP(req.params.id)
            .then(answer => apiUtils.setResponse(res, answer, 200))
            .catch(err => apiUtils.setResponse(res, JSON.parse(err.message), JSON.parse(err.message).status))
    }

    const getUserByUsername = (req, res) => {
        data.getUserByUsername(req.params.username)
            .then(answer => apiUtils.setResponse(res, answer, 200))
            .catch(err => apiUtils.setResponse(res, JSON.parse(err.message), JSON.parse(err.message).status))
    }

    const createIdpUser = (req, res) => {
        data.insertIDP(req.body.idpId, req.body.idpName, req.body.userId)
            .then(answer => apiUtils.setResponse(res, answer, 200))
            .catch(err => apiUtils.setResponse(res, JSON.parse(err.message), JSON.parse(err.message).status))
    }

    const updatePassword = (req, res) => {
        data.updatePassword(req.body.password, req.params.id)
            .then(answer => apiUtils.setResponse(res, req.body, 201))
            .catch(err => apiUtils.setResponse(res, JSON.parse(err.message), JSON.parse(err.message).status))
    }

    const updateUsername = (req, res) => {
        data.updateUsername(req.body.username, req.params.id)
            .then(answer => apiUtils.setResponse(res, req.body, 201))
            .catch(err => apiUtils.setResponse(res, JSON.parse(err.message), JSON.parse(err.message).status))
    }

    userRouter.route('/')
        .get(getAllUsers)
        .post(createUser)

    userRouter.route('/:id')
        .get(getSpecificUser)
        .delete(deleteUser)

    // get user from idp by its idp id
    userRouter.get(
        'idp/:id',
        getUserFromIdp
    )

    // get user by username
    userRouter.get(
        '/:username',
        getUserByUsername
    )

    // create an entry on the idp users table
    userRouter.post(
        '/idp',
        createIdpUser
    )

    userRouter.put(
        '/:id/username',
        updateUsername
    )

    userRouter.put(
        '/:id/password',
        updatePassword
    )


    return userRouter
}