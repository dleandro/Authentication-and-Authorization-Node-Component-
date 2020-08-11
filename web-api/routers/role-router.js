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

    function updateRole(req, res) {
        apiUtils.promiseDataToResponse(res, roles.update(req.params.id, req.body.parent_role), 201)
    }

    function addRole(req, res) {
        apiUtils.promiseDataToResponse(res, roles.create(req.body.role,req.body.parent_role), 201)
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

    return roleRouter

}