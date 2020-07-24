'use strict'

/**
 * this module contains all user related endpoints
 * @param apiUtils
 * @param authization
 * @returns {*|Router}
 */
module.exports = function (apiUtils, authization) {

    const users = authization.user,
        userRoles = authization.userRole,
        idps = authization.idp,
        authorization = authization.authorization,
        userRouter = require('express').Router()

    userRouter.route('/')
        .get(getAllUsers)
        .post(createUser)

    userRouter.route('/:id')
        .get(getSpecificUser)
        .delete(deleteUser);

    // get user from idp by its idp id
    userRouter.get('/idp/:id', getUserFromIdp)
    // get user by username
    userRouter.get('/byUsername/:username', getUserByUsername)

    userRouter.get('/:id/roles', (req, res) => apiUtils.promiseDataToResponse(res, userRoles.getUserRoles(req.params.id)))
    userRouter.get('/:id/lists', (req, res) => apiUtils.promiseDataToResponse(res, users.getUserLists(req.params.id)))
    userRouter.get('/:id/history', (req, res) => apiUtils.promiseDataToResponse(res, users.getUserHistory(req.params.id)))
    userRouter.get('/:id/sessions', (req, res) => apiUtils.promiseDataToResponse(res, users.getUserSessions(req.params.id)))
    userRouter.get('/currentUser/permissions', (req, res, next) => apiUtils.promiseDataToResponse(res, authorization.getUserPermissions(req, res, next)))

    // create an entry on the idp users table
    userRouter.post('/idp', createIdpUser)

    userRouter.put('/:id/username', updateUsername)

    userRouter.put('/:id/password', updatePassword)

    userRouter.get('/authorizations', getUsersAuthorizations)

    function getUsersAuthorizations(req, res) {
        apiUtils.promiseDataToResponse(res, authization.authorization.authorizationInfo(req))
    }

    function getAllUsers(req, res) {
        apiUtils.promiseDataToResponse(res, users.get())
    }

    function createUser(req, res) {
        apiUtils.promiseDataToResponse(res, users.create(req.body.username, req.body.password), 201)
    }

    function getSpecificUser(req, res) {
        apiUtils.promiseDataToResponse(res, users.getById(req.params.id))
    }

    function deleteUser(req, res) {
        apiUtils.promiseDataToResponse(res, users.delete(req.params.id))
    }

    function getUserFromIdp(req, res) {
        apiUtils.promiseDataToResponse(res, users.getByIdp(req.params.id))
    }

    function getUserByUsername(req, res) {
        apiUtils.promiseDataToResponse(res, users.getByUsername(req.params.username))
    }

    function createIdpUser(req, res) {
        apiUtils.promiseDataToResponse(res, idps.create(req.body.idpId, req.body.idpName, req.body.userId))
    }

    function updatePassword(req, res) {
        apiUtils.promiseDataToResponse(res, users.updatePassword(req.body.password, req.params.id), 201)
    }

    function updateUsername(req, res) {
        apiUtils.promiseDataToResponse(res,  users.updateUsername(req.body.username, req.params.id), 201)
    }

    return userRouter
}
