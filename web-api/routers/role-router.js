'use strict'

// this module contains all role related endpoints
module.exports = function (apiUtils, authization) {

    const errors = require('../common/errors/app-errors')
    
    const routerUtils=require('./router-utils')
    
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
        routerUtils.promiseDataToResponse(res, roles.delete(req.params.id),apiUtils)
    }


    function getRoles(req, res) {
        routerUtils.promiseDataToResponse(res, roles.getAll(),apiUtils)
    }

    function getRoleById(req, res) {
        routerUtils.promiseDataToResponse(res, roles.getSpecificById(req.params.id),apiUtils)
    }

    function getUsersWithThisRole(req,res){
        routerUtils.promiseDataToResponse(res,roles.getUsersWithThisRole(req.params.id),apiUtils)
    }

    function getPermissionsWithThisRole(req,res){
        routerUtils.promiseDataToResponse(res,roles.getPermissionsWithThisRole(req.params.id),apiUtils)
    }

    return roleRouter

}
