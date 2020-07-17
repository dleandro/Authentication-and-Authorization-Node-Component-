'use strict'


/**
 * this module contains all permissions related endpoints
 * @param apiUtils
 * @param authization
 * @returns {*|Router}
 */
module.exports = function (apiUtils, authization) {
    
    const permissionRouter = require('express').Router()
    const permissions = authization.permission

    permissionRouter.route('/')
        .get(getPermissions)
        .post(addPermission)

    permissionRouter.route('/:id')
        .get(getPermissionById)
        .put(updatePermission)
        .delete(deletePermission)


    permissionRouter.route('/:id/roles').get(getRolesByPermission)

    function getRolesByPermission(req,res){
        apiUtils.promiseDataToResponse(res, permissions.getRolesByPermission.with(req.params.id))
    }

    function getPermissions(req, res) {
        apiUtils.promiseDataToResponse(res, permissions.get.all())
    }

    function addPermission(req, res) {
        permissions.create.with(req.body.action,req.body.resource)
            .then(answer => {
                apiUtils.setResponse(res, answer[0].dataValues, 201)
            })
            .catch(err => apiUtils.setResponse(res, err.message, err.status))
        }

    function updatePermission(req, res) {
        permissions.update.with(req.params.id,req.body.action, req.body.resource)
            .then(answer => apiUtils.setResponse(res, req.body, 201))
            .catch(err => apiUtils.setResponse(res, err.message, err.status))
        }

    function deletePermission(req, res) {
        apiUtils.promiseDataToResponse(res,permissions.delete.with(req.params.id))
    }

    function getPermissionById(req, res) {
        apiUtils.promiseDataToResponse(res,permissions.getSpecificById.with(req.params.id))
    }

    return permissionRouter

}
