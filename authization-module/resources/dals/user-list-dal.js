const UserList = require('../sequelize-model').UserList,
List=require('../sequelize-model').List,
User=require('../sequelize-model').User
module.exports = {
    getByUserId:(id) => UserList.findByPk(id),
    isUserBlackListed:(user_id)=>User.findAll({where:{id:user_id},include:[List],raw:true}),
    create:(listId,userId,updater,active)=>UserList.create({ListId:listId,UserId:userId,active:active,updater:updater})
}
