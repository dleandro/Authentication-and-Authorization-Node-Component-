'use strict'


/**
 * this module contains all permissions related endpoints
 * @param apiUtils
 * @param authization
 * @returns {*|Router}
 */
module.exports = function (apiUtils, authization) {

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
        promiseDataToResponse(res, permissions.getRolesByPermission(req.params.id))
    }
    

    function getPermissions(req, res) {
        promiseDataToResponse(res, permissions.getAll())
    }

    function addPermission(req, res) {
        permissions.create(req.body.action,req.body.resource)
            .then(answer => {
                req.body.id = answer.insertId
                apiUtils.setResponse(res, req.body, 201)
            })
            .catch(err => apiUtils.setResponse(res, JSON.parse(err.message), JSON.parse(err.message).status))
    }
    function updatePermission(req, res) {
        permissions.update(req.params.id,req.body.action, req.body.resource)
            .then(answer => apiUtils.setResponse(res, req.body, 201))
            .catch(err => apiUtils.setResponse(res, JSON.parse(err.message), JSON.parse(err.message).status))
    }

    function deletePermission(req, res) {
        promiseDataToResponse(res,permissions.delete(req.params.id))
    }

    function getPermissionById(req, res) {
        promiseDataToResponse(res,permissions.getSpecificById(req.params.id))
    }

    return permissionRouter

}
