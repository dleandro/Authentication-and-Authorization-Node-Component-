'use strict'


// this module contains all user's history related endpoints
module.exports = function (apiUtils, authization) {
    
    const routerUtils=require('./router-utils')
    const userHistory = authization.userHistory
    const userHistoryRouter = require('express').Router()

    userHistoryRouter
        .get('/', getAllHistories)

    userHistoryRouter
        .get('/:userId', getAllHistoriesFromSpecificUser)

    function getAllHistories(req, res) {
        routerUtils.promiseDataToResponse(res, userHistory.getAll(),apiUtils)
    }

    function getAllHistoriesFromSpecificUser(req, res) {
        routerUtils.promiseDataToResponse(res, userHistory.getAllFromUser(req.params.id),apiUtils)
    }

    return userHistoryRouter

}
