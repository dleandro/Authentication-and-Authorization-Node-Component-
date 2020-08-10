'use strict'

/**
 * this module contains all list related endpoints
 * @param apiUtils
 * @param authization
 * @returns {*|Router}
 */
module.exports = function (apiUtils, authization) {

    const lists = authization.list
    const listRouter = require('express').Router()
    const getResponseCallback = (cb) => (req, res) => apiUtils.promiseDataToResponse(res, cb(req))

    const getters = [
        { endpoint: '/', dataPromise: (req) => lists.get() },
        { endpoint: '/:id', dataPromise: (req) => lists.getById(req.params.id) },
        { endpoint: '/active', dataPromise: (req) => lists.getActive() },
    ]

    getters.forEach(getter => listRouter.get(getter.endpoint, getResponseCallback(getter.dataPromise)));

    listRouter.route('/')
        .post(addList)

    listRouter.delete('/:id', deleteList)

    listRouter.put('/:id', updateList)

    function addList(req, res) {
        apiUtils.promiseDataToResponse(res, lists.create(req.body.list), 201)
    }

    function deleteList(req, res) {
        apiUtils.promiseDataToResponse(res, lists.delete(req.params.id))
    }

    function updateList(req, res) {
        apiUtils.promiseDataToResponse(res, lists.update(req.params.id, req.body.list), 201)
    }

    return listRouter

}
