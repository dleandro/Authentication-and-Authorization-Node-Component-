'use strict'

// this module contains all user's history related endpoints
module.exports = function (apiUtils, authization) {

    const userHistory = authization.userHistory
    const userHistoryRouter = require('express').Router()
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

    userHistoryRouter
        .get('/', getAllHistories)

    userHistoryRouter
        .get('/:userId', getAllHistoriesFromSpecificUser)

    function getAllHistories(req, res) {
        promiseDataToResponse(res, userHistory.getAll())
    }

    function getAllHistoriesFromSpecificUser(req, res) {
        promiseDataToResponse(res, userHistory.getAllFromUser(req.params.id))
    }

    return userHistoryRouter

}
