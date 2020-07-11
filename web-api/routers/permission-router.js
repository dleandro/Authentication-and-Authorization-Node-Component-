'use strict'


/**
 * this module contains all permissions related endpoints
 * @param apiUtils
 * @param authization
 * @returns {*|Router}
 */
module.exports = function (apiUtils, authization) {
    
    
    
    const routerUtils=require('./router-utils')
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
        routerUtils.promiseDataToResponse(res, permissions.getRolesByPermission(req.params.id),apiUtils)
    }
    

    function getPermissions(req, res) {
        routerUtils.promiseDataToResponse(res, permissions.getAll(),apiUtils)
    }

    function addPermission(req, res) {
        permissions.create(req.body.action,req.body.resource)
            .then(answer => {
                apiUtils.setResponse(res, answer[0].dataValues, 201)
            })
            .catch(err => apiUtils.setResponse(res, JSON.parse(err.message), JSON.parse(err.message).status))
    }
    function updatePermission(req, res) {
        permissions.update(req.params.id,req.body.action, req.body.resource)
            .then(answer => apiUtils.setResponse(res, req.body, 201))
            .catch(err => apiUtils.setResponse(res, JSON.parse(err.message), JSON.parse(err.message).status))
    }

    function deletePermission(req, res) {
        routerUtils.promiseDataToResponse(res,permissions.delete(req.params.id),apiUtils)
    }

    function getPermissionById(req, res) {
        routerUtils.promiseDataToResponse(res,permissions.getSpecificById(req.params.id),apiUtils)
    }

    return permissionRouter

}
