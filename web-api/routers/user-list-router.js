module.exports = function (apiUtils, authization) {

    const userListRouter = require('express').Router()


        const userList=authization.userList

        const promiseDataToResponse = (res, dataPromise) => dataPromise
        .catch(err => {
            throw errors.errorExecutingQuery
        })
        .then(data => {
            if (Array.isArray(data)){
                if (data.length) {
                    return apiUtils.setResponse(res, data, 200)
                }
            } else {
               if (data){
                   return apiUtils.setResponse(res, data, 200)
               }
            }
            throw errors.noResponseFound
        })
        .catch(err => {
            apiUtils.setResponse(res, JSON.parse(err.message), JSON.parse(err.message).status)
        });

        userListRouter.post('/',createUserList)


        function createUserList(req,res){
            userList.create(req.body.ListId,req.body.UserId,req.body.updater,req.body.active)
            .then(answer => {
                apiUtils.setResponse(res, answer[0].dataValues, 201)
            })
            .catch(err => apiUtils.setResponse(res, err, 400));
        }



    return userListRouter
}