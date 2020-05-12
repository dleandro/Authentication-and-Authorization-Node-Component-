'use strict'

// this module contains all user's roles related endpoints
module.exports = function(apiUtils) {

    const data=require('../../authization-module/authization').userRole
    
    const usersRolesRouter = require('express').Router()
    const authization = require('../../authization-module/authization')

    usersRolesRouter.use(authization.checkAuthorization.hasPermissions)
        
    usersRolesRouter.route('/')
    .post(addUsersRoles)
    .get(getUsersRoles)

    usersRolesRouter.get('/active', getActiveRoles)
    usersRolesRouter.get('/active/user/:id', getUserActiveRoles)
    usersRolesRouter.get('/active/user', getUserRolesById)    
    usersRolesRouter.put('/deactivate/:userRoleId', deactivateUserRole)
  
    function addUsersRoles(req, res){
        data.addUserRole(req.body.user, req.body.role,req.body.start_date,req.body.end_date,req.body.updater,req.body.active)
        .then(answer => apiUtils.setResponse(res, answer, 201))
        .catch(err => apiUtils.setResponse(res, JSON.parse(err.message), JSON.parse(err.message).status))
    }

    function getUsersRoles(req,res){
        data.getUserRoles()
        .then(answer => apiUtils.setResponse(res, answer, 200))
        .catch(err => apiUtils.setResponse(res, JSON.parse(err.message), JSON.parse(err.message).status))
    }

    function getActiveRoles(req,res){
        data.getActiveRoles()
        .then(answer => apiUtils.setResponse(res, answer, 200))
        .catch(err => apiUtils.setResponse(res, JSON.parse(err.message), JSON.parse(err.message).status))
    }

    function getUserActiveRoles(req,res){
        data.getUserActiveRoles(req.params.id)
        .then(answer => apiUtils.setResponse(res, answer, 200))
        .catch(err => apiUtils.setResponse(res, JSON.parse(err.message), JSON.parse(err.message).status))
    }
    
    
    function getUserRolesById(req, res){
        data.getUserRolesById(req.params.id)
        .then(answer => apiUtils.setResponse(res, answer, 200))
        .catch(err => apiUtils.setResponse(res, JSON.parse(err.message), JSON.parse(err.message).status))
    }

    function deactivateUserRole(req, res) {
        data.deactivateUserRole(req.params.id)
        .then(answer => apiUtils.setResponse(res, answer, 200))
        .catch(err => apiUtils.setResponse(res, JSON.parse(err.message), JSON.parse(err.message).status))
    }
    
    return usersRolesRouter
    
}
