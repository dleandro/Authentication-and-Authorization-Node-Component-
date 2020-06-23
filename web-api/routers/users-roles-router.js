'use strict'

/**
 * this module contains all user's roles related endpoints
 * @param apiUtils
 * @param authization
 * @returns {*|Router}
 */
module.exports = function (apiUtils, authization) {
    const userRoles = authization.userRole

    const usersRolesRouter = require('express').Router()

    usersRolesRouter.route('/')
        .post(addUsersRoles)
        .get(getUsersRoles)

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

    usersRolesRouter.get('/active', getActiveRoles)
    usersRolesRouter.get('/active/user/:id', getUserActiveRoles)
    usersRolesRouter.get('/active/user', getUserRolesById)
    usersRolesRouter.put('/deactivate/:userRoleId', deactivateUserRole)

    function addUsersRoles(req, res) {
        userRoles.create(req.body.user, req.body.role, req.body.start_date, req.body.end_date, req.body.updater, req.body.active)
            .then(answer => apiUtils.setResponse(res, answer, 201))
            .catch(err => apiUtils.setResponse(res, JSON.parse(err.message), JSON.parse(err.message).status))
    }

    function getUsersRoles(req, res) {
        promiseDataToResponse(res, userRoles.getAll())
    }

    function getActiveRoles(req, res) {
        promiseDataToResponse(res, userRoles.getAllActive())
    }

    function getUserActiveRoles(req, res) {
        promiseDataToResponse(res, userRoles.getUserActiveRoles(req.params.id))
    }


    function getUserRolesById(req, res) {
        promiseDataToResponse(res, userRoles.getById(req.params.id))
    }

    function deactivateUserRole(req, res) {
        promiseDataToResponse(res, userRoles.deactivate(req.params.id))
    }

    return usersRolesRouter

}
