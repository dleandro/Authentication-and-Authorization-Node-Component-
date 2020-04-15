'use strict'

// this module contains all list related endpoints
module.exports = function(apiUtils, service) {
    
    const listRouter = require('express').Router()
    
    listRouter.route('/')
    .get(getLists)
    .delete(deleteList)
    .post(addList)

    listRouter.get('/active', getActiveLists)
    listRouter.get('/active/user/:id', getUserActiveList)

    
    function addList(req,res){
        service.addList(req.body.user,req.body.list,req.body.start_date,req.body.end_date,req.body.updater)
        .then(answer => apiUtils.setResponse(res, answer, 201))
        .catch(err => apiUtils.setResponse(res, JSON.parse(err).detail, JSON.parse(err).status))
    }
    
    function deleteList(req,res){
        service.deleteList(req.body.user,req.body.list,req.body.start_date,req.body.end_date,req.body.updater)
        .then(answer => apiUtils.setResponse(res, answer, 200))
        .catch(err => apiUtils.setResponse(res, JSON.parse(err).detail, JSON.parse(err).status))
    }

    function getLists(req,res){
        service.getLists()
        .then(answer => apiUtils.setResponse(res, answer, 200))
        .catch(err => apiUtils.setResponse(res, JSON.parse(err).detail, JSON.parse(err).status))
    }
    
    function getActiveLists(req,res){
        service.getActiveLists()
        .then(answer => apiUtils.setResponse(res, answer, 200))
        .catch(err => apiUtils.setResponse(res, JSON.parse(err).detail, JSON.parse(err).status))
    }

    function getUserActiveList(req, res){
        service.getUserActiveList([req.params.id])
        .then(answer => apiUtils.setResponse(res, answer, 200))
        .catch(err => apiUtils.setResponse(res, JSON.parse(err).detail, JSON.parse(err).status))
    }

    
    return listRouter
    
}