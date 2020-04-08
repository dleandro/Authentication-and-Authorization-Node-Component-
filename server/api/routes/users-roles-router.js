'use strict'

const api = require('../../util/api-utils')

// this module contains all user's roles related endpoints
module.exports = function(apiUtils, service) {
    
    const usersRolesRouter = require('express').Router()

    usersRolesRouter.post('/',addUsersRoles)

    function addUsersRoles(req,res){
        service.addPermission(req.body.user,req.body.role)
        .then(answer => apiUtils.setResponse(res, answer, 200))
            .catch(err => apiUtils.setResponse(res, JSON.parse(err).detail, JSON.parse(err).status))
    }

    
    return usersRolesRouter
    
}
