'use strict'



/**
 * this module contains all user related endpoints
 * @param apiUtils
 * @param authization
 * @returns {*|Router}
 */
module.exports = function (apiUtils, authization) {

    const routerUtils=require('./router-utils')

    const users = authization.user,
        idps = authization.idp,
        userRouter = require('express').Router(),
        rbac = require('../../authization-module/common/middleware/rbac'),
        errors = require('../common/errors/app-errors')


    userRouter.route('/')
        .get(getAllUsers)
        .post(createUser)

    userRouter.route('/:id')
        .get(getSpecificUser)
        .delete(deleteUser);

    // get user from idp by its idp id
    userRouter.get('idp/:id', getUserFromIdp)
    // get user by username
    userRouter.get('/byUsername/:username', getUserByUsername)


    userRouter.get('/:id/roles', (req,res)=>routerUtils.promiseDataToResponse(res, users.getUserRoles(req.params.id),apiUtils))

    // create an entry on the idp users table
    userRouter.post('/idp', createIdpUser)

    userRouter.put('/:id/username', updateUsername)

    userRouter.put('/:id/password', updatePassword)

    async function getAllUsers(req, res) {
        routerUtils.promiseDataToResponse(res, users.getAll(),apiUtils)
    }

    function createUser(req, res) {
        users.create(req.body.username, req.body.password)
            .then(answer => {
                apiUtils.setResponse(res, answer, 201)
            })
            .catch(err => apiUtils.setResponse(res, err, 400));
    }

    function getSpecificUser(req, res) {
        routerUtils.promiseDataToResponse(res, users.getById(req.params.id),apiUtils)
    }

    function deleteUser(req, res) {
        routerUtils.promiseDataToResponse(res, users.delete(req.params.id),apiUtils)
    }

    function getUserFromIdp(req, res) {
        routerUtils.promiseDataToResponse(res, users.getByIdp(req.params.id),apiUtils)
    }

    function getUserByUsername(req, res) {
        routerUtils.promiseDataToResponse(res, users.getByUsername(req.params.username),apiUtils)
    }

    function createIdpUser(req, res) {
        routerUtils.promiseDataToResponse(res, idps.create(req.body.idpId, req.body.idpName, req.body.userId),apiUtils)
    }

    function updatePassword(req, res) {
        users.updatePassword(req.body.password, req.params.id)
            .then(answer => apiUtils.setResponse(res, req.body, 201))
            .catch(err => apiUtils.setResponse(res, JSON.parse(err.message), JSON.parse(err.message).status))
    }

    function updateUsername(req, res) {
        users.updateUsername(req.body.username, req.params.id)
            .then(answer => apiUtils.setResponse(res, req.body, 201))
            .catch(err => apiUtils.setResponse(res, JSON.parse(err.message), JSON.parse(err.message).status))
    }

    return userRouter
}
