'use strict'

// this module contains all user's history related endpoints
module.exports = function (apiUtils, authization) {

    const userHistory = authization.userHistory
    const userHistoryRouter = require('express').Router()
    const promiseDataToResponse = (res,dataPromise) => dataPromise
        .then(answer => apiUtils.setResponse(res, answer, 200))
        .catch(err => apiUtils.setResponse(res, JSON.parse(err.message), JSON.parse(err.message).status));

    userHistoryRouter
        .get('/', getAllHistories)

    userHistoryRouter
        .get('/:userId', getAllHistoriesFromSpecificUser)

    function getAllHistories(req, res) {
        promiseDataToResponse(res,userHistory.getAll())
    }

    function getAllHistoriesFromSpecificUser(req, res) {
        promiseDataToResponse(res,userHistory.getAllFromUser(req.params.id))
    }

    return userHistoryRouter

}
