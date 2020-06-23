const { Session } = require('../sequelize-model')

module.exports = {
        getAll:() => Session.findAll(),
        getUserSessions:(id)=>Session.findAll({
            where:{UserId:id}
        })
}
