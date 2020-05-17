const UserSession = require('../sequelize-model').UserSession
module.exports = {
    create: async (user_id, session_id) =>
        await UserSession.create({
            user_id: user_id,
            session_id: session_id
        })
}