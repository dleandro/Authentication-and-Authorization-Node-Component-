'use strict'

const errors = require('../common/errors/app-errors');
const { update } = require('../../authization-module/resources/dals/permissions-dal');
/**
 * this module contains all list related endpoints
 * @param apiUtils
 * @param authization
 * @returns {*|Router}
 */
module.exports = function (apiUtils, authization) {


    const routerUtils = require('../common/util/router-utils')
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
        lists.create.with(req.body.list)
            .then(answer => {
                apiUtils.setResponse(res, answer.dataValues, 201)
            })
            .catch(err => apiUtils.setResponse(res, err.message, err.status))
    }

    function deleteList(req, res) {
        routerUtils.promiseDataToResponse(res, lists.delete.with(req.params.id))
    }

    function getUsersInThisList(req, res) {
        routerUtils.promiseDataToResponse(res, lists.getUsersInThisList.with(req.params.id))
    }

    function getLists(req, res) {
        routerUtils.promiseDataToResponse(res, lists.get.all())
    }

    function getActiveLists(req, res) {
        routerUtils.promiseDataToResponse(res, lists.getActive.all())
    }

    function getUserActiveList(req, res) {
        routerUtils.promiseDataToResponse(res, lists.getUsersActive.with(req.params.id))
    }

    function deactivateList(req, res) {
        routerUtils.promiseDataToResponse(res, lists.deactivate.with(req.params.id))
    }

    function getList(req, res) {
        routerUtils.promiseDataToResponse(res, lists.getById.with(req.params.id), routerUtils)
    }

    function updateList(req, res) {
        lists.update.with(req.params.id, req.body.list)
            .then(answer => apiUtils.setResponse(res, req.body, 201))
            .catch(err => apiUtils.setResponse(res, err.message, err.status))
    }


    return listRouter

}
