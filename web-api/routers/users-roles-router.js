'use strict'

/**
 * this module contains all user's roles related endpoints
 * @param apiUtils
 * @param authization
 * @returns {*|Router}
 */
module.exports = function (apiUtils, authization) {

    const routerUtils = require('../common/util/router-utils')
    const userRoles = authization.userRole

    const usersRolesRouter = require('express').Router()

    usersRolesRouter.route('/')
        .post(addUsersRoles)
        .get(getUsersRoles)


    usersRolesRouter.get('/active', getActiveRoles)
    usersRolesRouter.get('/active/user/:id', getUserActiveRoles)
    usersRolesRouter.get('/active/user', getUserRolesById)
    usersRolesRouter.put('/deactivate/:userRoleId', deactivateUserRole)

    function addUsersRoles(req, res) {
        userRoles.create.with(req.body.user, req.body.role, req.body.start_date, req.body.end_date, req.body.updater, req.body.active)
            .then(answer => apiUtils.setResponse(res, answer.dataValues, 201))
            .catch(err => apiUtils.setResponse(res, err.message, err.status))
        }

    function getUsersRoles(req, res) {
        routerUtils.promiseDataToResponse(res, userRoles.get.all(), apiUtils)
    }

    function getActiveRoles(req, res) {
        routerUtils.promiseDataToResponse(res, userRoles.getActive.all(), apiUtils)
    }

    function getUserActiveRoles(req, res) {
        routerUtils.promiseDataToResponse(res, userRoles.getUserActiveRoles.with(req.params.id), apiUtils)
    }


    function getUserRolesById(req, res) {
        routerUtils.promiseDataToResponse(res, userRoles.getById.with(req.params.id), apiUtils)
    }

    function deactivateUserRole(req, res) {
        routerUtils.promiseDataToResponse(res, userRoles.deactivate.with(req.params.id), apiUtils)
    }

    return usersRolesRouter

}
