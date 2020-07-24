

module.exports = function (apiUtils, authization) {

    const userListRouter = require('express').Router()

    const userList = authization.userList
    userListRouter.post('/', createUserList)

    function createUserList(req, res) {
        apiUtils.promiseDataToResponse(res, userList.create(req.body.ListId, req.body.UserId, req.body.updater, req.body.active), 201)
    }

    return userListRouter
}