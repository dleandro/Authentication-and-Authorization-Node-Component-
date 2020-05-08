'use strict'

// this module contains all user's history related endpoints
module.exports = function(apiUtils) {

    const data=require('../../authization-module/authization').userHistory
    
    const userHistoryRouter = require('express').Router()

    userHistoryRouter
    .get('/', getAllHistories)

    userHistoryRouter
    .get('/:userId', getAllHistoriesFromSpecificUser)

    function getAllHistories(req, res) {
        data.getAllHistories()
        .then(answer => apiUtils.setResponse(res, answer, 200))
        .catch(err => apiUtils.setResponse(res, JSON.parse(err.message), JSON.parse(err.message).status))
    }

    function getAllHistoriesFromSpecificUser(req, res) {
        data.getAllHistoriesFromSpecificUser(req.params.id)
        .then(answer => apiUtils.setResponse(res, answer, 200))
        .catch(err => apiUtils.setResponse(res, JSON.parse(err.message), JSON.parse(err.message).status))
    }

    return userHistoryRouter
    
}
