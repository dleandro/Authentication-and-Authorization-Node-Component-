'use strict'

// this module contains all role related endpoints
module.exports = function (apiUtils, authization) {

    const errors = require('../common/errors/app-errors')

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
    const roles = authization.role
    const roleRouter = require('express').Router()

    roleRouter.route('/')
        .post(addRole)
        .get(getRoles)

    roleRouter.route('/:id')
        .get(getRoleById)
        .delete(deleteRole)
        .put(updateRole)

        roleRouter.get('/:id/users',getUsersWithThisRole)
        roleRouter.get('/:id/permissions',getPermissionsWithThisRole)

    roleRouter.route('/:id/permissions').get((req,res)=>promiseDataToResponse(res,roles.getRolePermissions(req.params.id)))

    function updateRole(req, res) {
        roles.update(req.params.id,req.body.role,req.body.parent_role)
            .then(answer => apiUtils.setResponse(res, req.body, 201))
            .catch(err => apiUtils.setResponse(res, JSON.parse(err.message), JSON.parse(err.message).status))
    }

    function addRole(req, res) {
        roles.create(req.body.role)
            .then(answer => {
                apiUtils.setResponse(res, answer[0].dataValues, 201)
            })
            .catch(err => apiUtils.setResponse(res, JSON.parse(err.message), JSON.parse(err.message).status))
    }

    function deleteRole(req, res) {
        promiseDataToResponse(res, roles.delete(req.params.id))
    }


    function getRoles(req, res) {
        promiseDataToResponse(res, roles.getAll())
    }

    function getRoleById(req, res) {
        promiseDataToResponse(res, roles.getSpecificById(req.params.id))
    }

    function getUsersWithThisRole(req,res){
        promiseDataToResponse(res,roles.getUsersWithThisRole(req.params.id))
    }

    function getPermissionsWithThisRole(req,res){
        promiseDataToResponse(res,roles.getPermissionsWithThisRole(req.params.id))
    }

    return roleRouter

}
