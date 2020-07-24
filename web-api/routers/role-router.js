'use strict'

// this module contains all role related endpoints
module.exports = function (apiUtils, authization) {

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

    roleRouter.route('/:id/permissions').get((req, res) => promiseDataToResponse(res, roles.getRolePermissions(req.params.id)))

    function updateRole(req, res) {
        apiUtils.promiseDataToResponse(res, roles.update(req.params.id, req.body.role, req.body.parent_role), 201)
    }

    function addRole(req, res) {
        apiUtils.promiseDataToResponse(res, roles.create(req.body.role), 201)
    }

    function deleteRole(req, res) {
        apiUtils.promiseDataToResponse(res, roles.delete(req.params.id))
    }


    function getRoles(req, res) {
        apiUtils.promiseDataToResponse(res, roles.get())
    }

    function getRoleById(req, res) {
        apiUtils.promiseDataToResponse(res, roles.getSpecificById(req.params.id))
    }

    function getUsersWithThisRole(req, res) {
        apiUtils.promiseDataToResponse(res, roles.getUsersWithThisRole(req.params.id))
    }

    function getPermissionsWithThisRole(req, res) {
        apiUtils.promiseDataToResponse(res, roles.getPermissionsWithThisRole(req.params.id))
    }

    return roleRouter

}
