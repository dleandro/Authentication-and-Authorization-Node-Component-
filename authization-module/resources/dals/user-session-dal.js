const { Session } = require('../sequelize-model')

const UserSession = require('../sequelize-model').UserSession
module.exports = {
    create: (userId, sessionId) =>
        UserSession.create({
            user_id: userId,
            session_id: sessionId
        }),

        delete :(userId,sessionId)=>UserSession.destroy({where:{
            user_id:userId,
            session_id:sessionId
        }}),
        getAll:() => UserSession.findAll(),
        getUserSessions:(id)=>UserSession.findAll({
            where:{user_id:id},include: [Session],raw:true
        })
}
