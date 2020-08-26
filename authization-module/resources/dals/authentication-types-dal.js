const AuthenticationTypes = require('../sequelize-model').AuthenticationTypes,
    tryCatch = require('../../common/util/functions-utils');


module.exports = {

    get: () => tryCatch(() => AuthenticationTypes.findAll()),

    getActive: () => tryCatch(() => AuthenticationTypes.findAll({ where: { active: 1 } })),

    changeActive: (protocol, idp, active) => tryCatch(() => AuthenticationTypes.update({active}, { where: {protocol, idp } })),

    getByName: (protocol,idp)=> AuthenticationTypes.findAll({where:{protocol, idp, active:1}}),

}
