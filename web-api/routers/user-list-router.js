

module.exports = function (apiUtils, authization) {

    const userListRouter = require('express').Router()

    const userList = authization.userList
    userListRouter.post('/', createUserList)
    userListRouter.delete('/', deleteUserList)
    userListRouter.put('/', editUserList)

    function createUserList(req, res) {
        apiUtils.promiseDataToResponse(res, userList.create(req.body.ListId, req.body.UserId, req.body.updater, req.body.active), 201)
    }

    function deleteUserList(req, res) {
        apiUtils.promiseDataToResponse(res, userList.delete(req.body.ListId, req.body.UserId))
    }

    function editUserList(req, res) {
        apiUtils.promiseDataToResponse(res, userList.update(req.body.user,req.body.list,req.body.end_date,req.body.active))
    }

    return userListRouter
}