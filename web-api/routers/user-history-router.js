'use strict'


// this module contains all user's history related endpoints
module.exports = function (apiUtils, authization) {
    
    const routerUtils=require('../common/util/router-utils')
    const userHistory = authization.userHistory
    const userHistoryRouter = require('express').Router()

    userHistoryRouter
        .get('/', getAllHistories)

    userHistoryRouter
        .get('/:userId', getAllHistoriesFromSpecificUser)

    function getAllHistories(req, res) {
        routerUtils.promiseDataToResponse(res, userHistory.get.all())
    }

    function getAllHistoriesFromSpecificUser(req, res) {
        routerUtils.promiseDataToResponse(res, userHistory.getAllFromUser.with(req.params.id))
    }

    return userHistoryRouter

}
