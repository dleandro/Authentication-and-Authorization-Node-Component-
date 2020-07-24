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
        .delete(deleteUsersRoles)


    usersRolesRouter.get('/active', getActiveRoles)
    usersRolesRouter.get('/active/user/:id', getUserActiveRoles)
    usersRolesRouter.get('/active/user', getUserRolesById)
    usersRolesRouter.put('/deactivate/:userRoleId', deactivateUserRole)

    function addUsersRoles(req, res) {
        apiUtils.promiseDataToResponse(
            res,
            userRoles.create(req.body.user, req.body.role, req.body.start_date, req.body.end_date, req.body.updater, req.body.active),
            201)
    }

        
    function deleteUsersRoles(req, res) {
            apiUtils.promiseDataToResponse(res, userRoles.delete(req.body.user,req.body.role))
        }

    function getUsersRoles(req, res) {
        apiUtils.promiseDataToResponse(res, userRoles.get())
    }

    function getActiveRoles(req, res) {
        apiUtils.promiseDataToResponse(res, userRoles.getActive())
    }

    function getUserActiveRoles(req, res) {
        apiUtils.promiseDataToResponse(res, userRoles.getUserActiveRoles(req.params.id))
    }

    function getUserRolesById(req, res) {
        apiUtils.promiseDataToResponse(res, userRoles.getById(req.params.id))
    }

    function deactivateUserRole(req, res) {
        apiUtils.promiseDataToResponse(res, userRoles.deactivate(req.params.id))
    }

    return usersRolesRouter

}
