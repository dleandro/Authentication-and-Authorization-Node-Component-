const { Session } = require('../sequelize-model'),
    tryCatch = require('../../common/util/functions-utils');


module.exports = {
    get: () => tryCatch(() => Session.findAll()),

    getUserSessions: UserId => tryCatch(() => Session.findAll({where: { UserId }})),

    //TODO: this doesnt receive an endDate
    update: async (sid) => tryCatch(() => Session.update({expires: endDate,}, { where: {sid} })),

    delete: async sid => Promise.resolve({deletedRows: await tryCatch(() => Session.destroy({ where: {sid} }))}),
};
