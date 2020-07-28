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

    listRouter.get('/user/:id', getUserList)

    listRouter.put('/deactivate/:id', deactivateList)

    function addList(req, res) {
        apiUtils.promiseDataToResponse(res, lists.create(req.body.list), 201)
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

    function getUserList(req, res) {
        apiUtils.promiseDataToResponse(res, lists.getUsersLists(req.params.id))
    }

    function deactivateList(req, res) {
        apiUtils.promiseDataToResponse(res, lists.deactivate(req.params.id))
    }

    function getList(req, res) {
        apiUtils.promiseDataToResponse(res, lists.getById(req.params.id))
    }

    function updateList(req, res) {
        apiUtils.promiseDataToResponse(res, lists.update(req.params.id, req.body.list), 201)
    }

    return listRouter

}
