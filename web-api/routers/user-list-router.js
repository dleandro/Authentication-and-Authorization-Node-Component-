

module.exports = function (apiUtils, authization) {

    const userListRouter = require('express').Router()

    const userList = authization.userList
    userListRouter.post('/', createUserList)
    userListRouter.delete('/', deleteUserList)

    function createUserList(req, res) {
        apiUtils.promiseDataToResponse(res, userList.create(req.body.ListId, req.body.UserId, req.body.updater, req.body.active), 201)
    }

    function deleteUserList(req, res) {
        apiUtils.promiseDataToResponse(res, userList.delete(req.body.ListId, req.body.UserId))
    }

    return userListRouter
}