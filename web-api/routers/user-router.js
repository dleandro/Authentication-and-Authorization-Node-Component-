'use strict'

const { getUserAuthorizationInfo } = require('../../authization-module/resources/authorizations')



/**
 * this module contains all user related endpoints
 * @param apiUtils
 * @param authization
 * @returns {*|Router}
 */
module.exports = function (apiUtils, authization) {

    const users = authization.user,
        idps = authization.idp,
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


    userRouter.get('/:id/roles', (req, res) => apiUtils.promiseDataToResponse(res, users.getUserRoles.with(req.params.id)))

    // create an entry on the idp users table
    userRouter.post('/idp', createIdpUser)

    userRouter.put('/:id/username', updateUsername)

    userRouter.put('/:id/password', updatePassword)

    userRouter.get('/authorizations', getUsersAuthorizations)

    function getUsersAuthorizations(req, res) {
        apiUtils.promiseDataToResponse(res, authization.authorization.authorizationInfo(req))
    }

    function getAllUsers(req, res) {
        apiUtils.promiseDataToResponse(res, users.get.all(), apiUtils)
    }

    function createUser(req, res) {
        users.create.with(req.body.username, req.body.password)
            .then(answer => {
                apiUtils.setResponse(res, answer, 201)
            })
            .catch(err => apiUtils.setResponse(res, err.message, err.status))
        }

    function getSpecificUser(req, res) {
        apiUtils.promiseDataToResponse(res, users.getById.with(req.params.id))
    }

    function deleteUser(req, res) {
        apiUtils.promiseDataToResponse(res, users.delete.with(req.params.id))
    }

    function getUserFromIdp(req, res) {
        apiUtils.promiseDataToResponse(res, users.getByIdp.with(req.params.id))
    }

    function getUserByUsername(req, res) {
        apiUtils.promiseDataToResponse(res, users.getByUsername.with(req.params.username))
    }

    function createIdpUser(req, res) {
        apiUtils.promiseDataToResponse(res, idps.create.with(req.body.idpId, req.body.idpName, req.body.userId))
    }

    function updatePassword(req, res) {
        users.updatePassword.with(req.body.password, req.params.id)
            .then(answer => apiUtils.setResponse(res, req.body, 201))
            .catch(err => apiUtils.setResponse(res, err.message, err.status))
        }

    function updateUsername(req, res) {
        users.updateUsername.with(req.body.username, req.params.id)
            .then(answer => apiUtils.setResponse(res, req.body, 201))
            .catch(err => apiUtils.setResponse(res, err.message, err.status))
        }

    return userRouter
}
