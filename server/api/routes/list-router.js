'use strict'

const api = require('../api-utils')

// this module contains all list related endpoints
module.exports = function(service) {
    
    const listRouter = require('express').Router()
    
    
    listRouter.delete('/list', deleteList)
    
    listRouter.post('/list', addList)
    
    function addList(req,res){
        service.addList(req.body.user,req.body.list,req.body.start_date,req.body.end_date,req.body.updater)
        .then(answer => setResponse(res, answer, 200))
        .catch(err => setResponse(res, JSON.parse(err).detail, JSON.parse(err).status))
    }
    
    
    function deleteList(req,res){
        service.deleteList(req.body.user,req.body.list,req.body.start_date,req.body.end_date,req.body.updater)
        .then(answer => setResponse(res, answer, 200))
        .catch(err => setResponse(res, JSON.parse(err).detail, JSON.parse(err).status))
    }
    
    
    return listRouter
    
}