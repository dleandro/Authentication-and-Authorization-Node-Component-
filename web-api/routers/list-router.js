'use strict'



/**
 * this module contains all list related endpoints
 * @param apiUtils
 * @param authization
 * @returns {*|Router}
 */
module.exports = function (apiUtils, authization) {

    const promiseDataToResponse = (res,dataPromise) => dataPromise
        .then(answer => apiUtils.setResponse(res, answer, 200))
        .catch(err => apiUtils.setResponse(res, JSON.parse(err.message), JSON.parse(err.message).status));
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
        promiseDataToResponse(res,lists.delete(req.params.id))
    }

    function getLists(req, res) {
        promiseDataToResponse(res,lists.getAll())
    }

    function getActiveLists(req, res) {
        promiseDataToResponse(res,lists.getAllActive())
    }

    function getUserActiveList(req, res) {
        promiseDataToResponse(res,lists.getUsersActive(req.params.id))
    }

    function deactivateList(req, res) {
        promiseDataToResponse(res,lists.deactivate(req.params.id))
    }


    return listRouter

}
