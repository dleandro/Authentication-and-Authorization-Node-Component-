const UserSession = require('../sequelize-model').UserSession
module.exports = {
    create: (userId, sessionId) =>
        UserSession.create({
            user_id: userId,
            session_id: sessionId
        })
}
