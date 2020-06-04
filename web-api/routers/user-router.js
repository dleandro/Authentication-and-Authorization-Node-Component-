'use strict'

/**
 * this module contains all user related endpoints
 * @param apiUtils
 * @param authization
 * @returns {*|Router}
 */
module.exports = function (apiUtils, authization) {

    const users = authization.user,
        idps = authization.idp,
        userRouter = require('express').Router(),
        rbac=require('../../authization-module/common/middleware/rbac')

    const promiseDataToResponse = (res, dataPromise) => dataPromise
        .catch(err => {
            throw errors.errorExecutingQuery
        })
        .then(data => {
            if (Array.isArray(data)){
                if (data.length) {
                    return apiUtils.setResponse(res, data, 200)
                }
            } else {
               if (data){
                   return apiUtils.setResponse(res, data, 200)
               }
            }
            throw errors.noResponseFound
        })
        .catch(err => {
            apiUtils.setResponse(res, JSON.parse(err.message), JSON.parse(err.message).status)
        });

    userRouter.route('/')
        .get(getAllUsers)
        .post(createUser)

    userRouter.route('/:id')
        .get(getSpecificUser)
        .delete(deleteUser)

    // get user from idp by its idp id
    userRouter.get('idp/:id', getUserFromIdp)
    // get user by username
    userRouter.get('/byUsername/:username', getUserByUsername)
    // create an entry on the idp users table
    userRouter.post('/idp', createIdpUser)

    userRouter.put('/:id/username', updateUsername)

    userRouter.put('/:id/password', updatePassword)

    async function getAllUsers(req, res) {
        if(await rbac.can('admin','get','user')){
            console.log("you can get a user")
            promiseDataToResponse(res, users.getAll())
        }
    }

    function createUser(req, res) {
        users.create(req.body.username, req.body.password)
            .then(answer => {
                apiUtils.setResponse(res, answer.dataValues, 201)
            })
            .catch(err => apiUtils.setResponse(res, err, 400));
    }

    function getSpecificUser(req, res) {
        promiseDataToResponse(res, users.getById(req.params.id))
    }

    function deleteUser(req, res) {
        promiseDataToResponse(res, users.delete(req.params.id))
    }

    function getUserFromIdp(req, res) {
        promiseDataToResponse(res, users.getByIdp(req.params.id))
    }

    function getUserByUsername(req, res) {
        promiseDataToResponse(res, users.getByUsername(req.params.username))
    }

    function createIdpUser(req, res) {
        promiseDataToResponse(res, idps.create(req.body.idpId, req.body.idpName, req.body.userId))
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
