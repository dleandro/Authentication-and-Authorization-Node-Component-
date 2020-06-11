'use strict'

// this module contains all role related endpoints
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
    const roles = authization.role
    const roleRouter = require('express').Router()

    roleRouter.route('/')
        .post(addRole)
        .get(getRoles)

    roleRouter.route('/:id')
        .get(getRoleById)
        .delete(deleteRole)

    roleRouter.route('/:id/permissions').get((req,res)=>promiseDataToResponse(res,roles.getRolePermissions(req.params.id)))

    function addRole(req, res) {
        roles.create(req.body.role)
            .then(answer => {
                req.body.id = answer.insertId
                apiUtils.setResponse(res, req.body, 201)
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

    return roleRouter

}
