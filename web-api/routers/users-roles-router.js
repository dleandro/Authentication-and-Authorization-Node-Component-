'use strict'

/**
 * this module contains all user's roles related endpoints
 * @param apiUtils
 * @param authization
 * @returns {*|Router}
 */

 

module.exports = function (apiUtils, authization) {
    
    const routerUtils=require('./router-utils')
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
        userRoles.create(req.body.user, req.body.role, req.body.start_date, req.body.end_date, req.body.updater, req.body.active)
            .then(answer => apiUtils.setResponse(res, answer.dataValues, 201))
            .catch(err => apiUtils.setResponse(res, JSON.parse(err.message), JSON.parse(err.message).status))
    }

    function getUsersRoles(req, res) {
        routerUtils.promiseDataToResponse(res, userRoles.getAll(),apiUtils)
    }

    function getActiveRoles(req, res) {
        routerUtils.promiseDataToResponse(res, userRoles.getAllActive(),apiUtils)
    }

    function getUserActiveRoles(req, res) {
        routerUtils.promiseDataToResponse(res, userRoles.getUserActiveRoles(req.params.id),apiUtils)
    }


    function getUserRolesById(req, res) {
        routerUtils.promiseDataToResponse(res, userRoles.getById(req.params.id),apiUtils)
    }

    function deactivateUserRole(req, res) {
        routerUtils.promiseDataToResponse(res, userRoles.deactivate(req.params.id),apiUtils)
    }

    return usersRolesRouter

}
