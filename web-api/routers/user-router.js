'use strict'

/**
 * this module contains all user related endpoints
 * @param apiUtils
 * @param authization
 * @returns {*|Router}
 */
module.exports = function (apiUtils, authization) {

    const users = authization.user,
        userRouter = require('express').Router()

    userRouter.route('/')
        .get(getAllUsers)
        .post(createUser)

    userRouter.route('/:id')
        .get(getSpecificUser)
        .delete(deleteUser);

    // get user by username
    userRouter.get('/byUsername/:username', getUserByUsername)

    userRouter.put('/:id/username', updateUsername)


    function getAllUsers(req, res) {
        apiUtils.promiseDataToResponse(res, users.get())
    }

    function createUser(req, res) {
        apiUtils.promiseDataToResponse(res, users.create(req.body.username, req.body.password, req.body.updater), 201)
    }

    function getSpecificUser(req, res) {
        apiUtils.promiseDataToResponse(res, users.getById(req.params.id))
    }

    function deleteUser(req, res) {
        apiUtils.promiseDataToResponse(res, users.delete(req.params.id))
    }

    function getUserByUsername(req, res) {
        apiUtils.promiseDataToResponse(res, users.getByUsername(req.params.username))
    }

    function updateUsername(req, res) {
        apiUtils.promiseDataToResponse(res,  users.updateUsername(req.body.username, req.params.id,req.body.updater), 201)
    }

    return userRouter
}
