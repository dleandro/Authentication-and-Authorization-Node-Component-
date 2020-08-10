'use strict'


// this module contains all user's history related endpoints
module.exports = function (apiUtils, authization) {
    
    const userHistory = authization.userHistory
    const userHistoryRouter = require('express').Router()

    userHistoryRouter.get('/', getAllHistories)

    userHistoryRouter.get('/:id', getAllHistoriesFromSpecificUser)

    function getAllHistories(req, res) {
        apiUtils.promiseDataToResponse(res, userHistory.get())
    }

    function getAllHistoriesFromSpecificUser(req, res) {
        apiUtils.promiseDataToResponse(res, userHistory.getAllFromUser(req.params.id))
    }

    return userHistoryRouter

}