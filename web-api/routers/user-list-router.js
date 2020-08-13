


module.exports = function (apiUtils, authization) {

    const userListRouter = require('express').Router()

    const userList = authization.userList
    userListRouter.post('/', createUserList)
    userListRouter.delete('/', deleteUserList)
    userListRouter.put('/', editUserList)
    userListRouter.get('/users/:id', getByUser)
    userListRouter.get('/lists/:id', getByList)
    userListRouter.patch('/users/:userId/lists/:listId/active', changeActiveFlag)


    function createUserList(req, res) {
        apiUtils.promiseDataToResponse(res, userList.create(req.body.ListId, req.body.UserId, req.body.updater, req.body.start_date, req.body.end_date, req.body.active), 201)
    }

    function deleteUserList(req, res) {
        apiUtils.promiseDataToResponse(res, userList.delete(req.body.ListId, req.body.UserId))
    }

    function editUserList(req, res) {
        apiUtils.promiseDataToResponse(res, userList.update(req.body.user, req.body.list, req.body.start_date, req.body.end_date, req.body.active, req.body.updater))
    }

    function getByUser(req, res) {
        apiUtils.promiseDataToResponse(res, userList.getByUser(req.params.id))
    }

    function getByList(req, res) {
        apiUtils.promiseDataToResponse(res, userList.getByList(req.params.id))
    }

    function changeActiveFlag(req, res) {
        apiUtils.promiseDataToResponse(res, userList.changeActiveFlag(req.params.userId, req.params.listId, req.body.active), 201)
    }

    return userListRouter
}