'use strict'

const errors = require('../common/errors/app-errors');
/**
 * this module contains all list related endpoints
 * @param apiUtils
 * @param authization
 * @returns {*|Router}
 */
module.exports = function (apiUtils, authization) {

    const lists = authization.list
    const listRouter = require('express').Router()

    listRouter.route('/')
        .get(getLists)
        .post(addList)

    listRouter.delete('/:id', deleteList)

    listRouter.put('/:id', updateList)

    listRouter.get('/:id', getList)

    listRouter.get('/:id/users', getUsersInThisList)

    listRouter.get('/active', getActiveLists)

    listRouter.get('/active/user/:id', getUserActiveList)

    listRouter.put('/deactivate/:id', deactivateList)

    function addList(req, res) {
        lists.create(req.body.list)
            .then(answer => {
                apiUtils.setResponse(res, answer.dataValues, 201)
            })
            .catch(err => apiUtils.setResponse(res, err.message, err.status))
    }

    function deleteList(req, res) {
        apiUtils.promiseDataToResponse(res, lists.delete(req.params.id))
    }

    function getUsersInThisList(req, res) {
        apiUtils.promiseDataToResponse(res, lists.getUsersInThisList(req.params.id))
    }

    function getLists(req, res) {
        apiUtils.promiseDataToResponse(res, lists.get())
    }

    function getActiveLists(req, res) {
        apiUtils.promiseDataToResponse(res, lists.getActive())
    }

    function getUserActiveList(req, res) {
        apiUtils.promiseDataToResponse(res, lists.getUsersActive(req.params.id))
    }

    function deactivateList(req, res) {
        apiUtils.promiseDataToResponse(res, lists.deactivate(req.params.id))
    }

    function getList(req, res) {
        apiUtils.promiseDataToResponse(res, lists.getById(req.params.id))
    }

    function updateList(req, res) {
        lists.update(req.params.id, req.body.list)
            .then(answer => apiUtils.setResponse(res, req.body, 201))
            .catch(err => apiUtils.setResponse(res, err.message, err.status))
    }


    return listRouter

}
