'use strict'

// this module contains all role related endpoints
module.exports = function (apiUtils, authization) {

    const routerUtils = require('../common/util/router-utils')
    const roles = authization.role
    const roleRouter = require('express').Router()

    roleRouter.route('/')
        .post(addRole)
        .get(getRoles)

    roleRouter.route('/:id')
        .get(getRoleById)
        .delete(deleteRole)
        .put(updateRole)

    roleRouter.get('/:id/users', getUsersWithThisRole)
    roleRouter.get('/:id/permissions', getPermissionsWithThisRole)

    roleRouter.route('/:id/permissions').get((req, res) => promiseDataToResponse(res, roles.getRolePermissions.with(req.params.id)))

    function updateRole(req, res) {
        roles.update.with(req.params.id, req.body.role, req.body.parent_role)
            .then(answer => apiUtils.setResponse(res, req.body, 201))
            .catch(err => apiUtils.setResponse(res, err.message, err.status))
        }

    function addRole(req, res) {
        roles.create.with(req.body.role)
            .then(answer => {
                apiUtils.setResponse(res, answer[0].dataValues, 201)
            })
            .catch(err => apiUtils.setResponse(res, err.message, err.status))
        }

    function deleteRole(req, res) {
        routerUtils.promiseDataToResponse(res, roles.delete.with(req.params.id))
    }


    function getRoles(req, res) {
        routerUtils.promiseDataToResponse(res, roles.get.all())
    }

    function getRoleById(req, res) {
        routerUtils.promiseDataToResponse(res, roles.getSpecificById.with(req.params.id))
    }

    function getUsersWithThisRole(req, res) {
        routerUtils.promiseDataToResponse(res, roles.getUsersWithThisRole.with(req.params.id))
    }

    function getPermissionsWithThisRole(req, res) {
        routerUtils.promiseDataToResponse(res, roles.getPermissionsWithThisRole.with(req.params.id))
    }

    return roleRouter

}
