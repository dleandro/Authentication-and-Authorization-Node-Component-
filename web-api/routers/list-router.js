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

    const promiseDataToResponse = (res, dataPromise) => dataPromise
        .catch(err => {
            throw errors.errorExecutingQuery
        })
        .then(data => {
            if (Array.isArray(data)){
                if (data.length) {
                    return apiUtils.setResponse(res, data, 200)
                }
            } else {
               if (data){
                   return apiUtils.setResponse(res, data, 200)
               }
            }
            throw errors.noResponseFound
        })
        .catch(err => {
            apiUtils.setResponse(res, JSON.parse(err.message), JSON.parse(err.message).status)
        });

    const lists = authization.list
    const listRouter = require('express').Router()

    listRouter.route('/')
        .get(getLists)
        .post(addList)

    listRouter.delete('/:id', deleteList)

    listRouter.put('/:id',updateList)

    listRouter.get('/:id', getList)

    listRouter.get('/:id/users', getUsersInThisList)

    listRouter.get('/active', getActiveLists)

    listRouter.get('/active/user/:id', getUserActiveList)

    listRouter.put('/deactivate/:id', deactivateList)

    function addList(req,res){
        lists.create(req.body.list)
        .then(answer => {
            //req.body = {...req.body,id:answer.insertId}
            apiUtils.setResponse(res, answer, 201)
        })
        .catch(err => apiUtils.setResponse(res, JSON.parse(err.message), JSON.parse(err.message).status))
    }

   /* function addUserToList(req, res) {
        userlist.create(req.body.user, req.body.list, req.body.start_date, req.body.end_date, req.body.updater, req.body.active)
            .then(answer => {
                req.body.id = answer.insertId
                apiUtils.setResponse(res, req.body, 201)
            })
            .catch(err => apiUtils.setResponse(res, JSON.parse(err.message), JSON.parse(err.message).status))
    }*/

    function deleteList(req, res) {
        promiseDataToResponse(res, lists.delete(req.params.id))
    }

    function getUsersInThisList(req,res){
        promiseDataToResponse(res, lists.getUsersInThisList(req.params.id))
    }

    function getLists(req, res) {
        promiseDataToResponse(res, lists.getAll())
    }

    function getActiveLists(req, res) {
        promiseDataToResponse(res, lists.getAllActive())
    }

    function getUserActiveList(req, res) {
        promiseDataToResponse(res, lists.getUsersActive(req.params.id))
    }

    function deactivateList(req, res) {
        promiseDataToResponse(res, lists.deactivate(req.params.id))
    }

    function getList(req, res) {
        promiseDataToResponse(res, lists.get(req.params.id))
    }

    function updateList(req, res) {
        lists.update(req.params.id,req.body.list)
            .then(answer => apiUtils.setResponse(res, req.body, 201))
            .catch(err => apiUtils.setResponse(res, JSON.parse(err.message), JSON.parse(err.message).status))
    }


    return listRouter

}
