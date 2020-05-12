'use strict'

// this module contains all list related endpoints
module.exports = function (apiUtils, authization) {

    const lists = authization.list
    const listRouter = require('express').Router()

    listRouter.route('/')
        .get(getLists)
        .post(addList)

    listRouter.delete('/:id', deleteList)

    listRouter.get('/active', getActiveLists)

    listRouter.get('/active/user/:id', getUserActiveList)

    listRouter.put('/deactivate/:id', deactivateList)

    function addList(req, res) {
        lists.create(req.body.user, req.body.list, req.body.start_date, req.body.end_date, req.body.updater, req.body.active)
            .then(answer => {
                req.body.id = answer.insertId
                apiUtils.setResponse(res, req.body, 201)
            })
            .catch(err => apiUtils.setResponse(res, JSON.parse(err.message), JSON.parse(err.message).status))
    }

    function deleteList(req, res) {
        lists.delete(req.params.id)
            .then(answer => apiUtils.setResponse(res, answer, 200))
            .catch(err => apiUtils.setResponse(res, JSON.parse(err.message), JSON.parse(err.message).status))
    }

    function getLists(req, res) {
        lists.getAll()
            .then(answer => apiUtils.setResponse(res, answer, 200))
            .catch(err => apiUtils.setResponse(res, JSON.parse(err.message), JSON.parse(err.message).status))
    }

    function getActiveLists(req, res) {
        lists.getAllActive()
            .then(answer => apiUtils.setResponse(res, answer, 200))
            .catch(err => apiUtils.setResponse(res, JSON.parse(err.message), JSON.parse(err.message).status))
    }

    function getUserActiveList(req, res) {
        lists.getUsersActive(req.params.id)
            .then(answer => apiUtils.setResponse(res, answer, 200))
            .catch(err => apiUtils.setResponse(res, JSON.parse(err.message), JSON.parse(err.message).status))
    }

    function deactivateList(req, res) {
        lists.deactivate(req.params.id)
            .then(answer => apiUtils.setResponse(res, answer, 200))
            .catch(err => apiUtils.setResponse(res, JSON.parse(err.message), JSON.parse(err.message).status))
    }


    return listRouter

}