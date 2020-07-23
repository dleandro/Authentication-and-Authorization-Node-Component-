

module.exports = function (apiUtils, authization) {

    const userListRouter = require('express').Router()

    const userList = authization.userList
    userListRouter.post('/', createUserList)
    userListRouter.delete('/',deleteUserList)


    function createUserList(req, res) {
        userList.create(req.body.ListId, req.body.UserId, req.body.updater,req.body.start_date, req.body.active)
            .then(answer => {
                apiUtils.setResponse(res, answer.dataValues, 201)
            })
            .catch(err => apiUtils.setResponse(res, err.message, err.status))
        }

        function deleteUserList(req, res) {
            apiUtils.promiseDataToResponse(res, userList.delete(req.body.ListId,req.body.UserId))
        }


    return userListRouter
}