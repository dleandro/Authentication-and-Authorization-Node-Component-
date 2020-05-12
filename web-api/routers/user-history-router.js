'use strict'

// this module contains all user's history related endpoints
module.exports = function (apiUtils, authization) {

    const userHistory = authization.userHistory

    const userHistoryRouter = require('express').Router()

    userHistoryRouter
        .get('/', getAllHistories)

    userHistoryRouter
        .get('/:userId', getAllHistoriesFromSpecificUser)

    function getAllHistories(req, res) {
        userHistory.getAll()
            .then(answer => apiUtils.setResponse(res, answer, 200))
            .catch(err => apiUtils.setResponse(res, JSON.parse(err.message), JSON.parse(err.message).status))
    }

    function getAllHistoriesFromSpecificUser(req, res) {
        userHistory.getAllFromUser(req.params.id)
            .then(answer => apiUtils.setResponse(res, answer, 200))
            .catch(err => apiUtils.setResponse(res, JSON.parse(err.message), JSON.parse(err.message).status))
    }

    return userHistoryRouter

}
