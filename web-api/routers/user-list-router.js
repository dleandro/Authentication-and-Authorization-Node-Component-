

module.exports = function (apiUtils, authization) {
    
    const routerUtils=require('./router-utils')
    const userListRouter = require('express').Router()


        const userList=authization.userList
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