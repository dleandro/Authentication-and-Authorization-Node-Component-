const AuthenticationTypes = require('../sequelize-model').AuthenticationTypes,
    tryCatch = require('../../common/util/functions-utils')


module.exports = {

    get: () => tryCatch(() => AuthenticationTypes.findAll()),

    getActive: () => tryCatch(() => AuthenticationTypes.findAll({ where: { active: 1 } })),

    changeActive: (protocol, idp, active) => tryCatch(() => AuthenticationTypes.update({ active: active }, { where: { protocol: protocol, idp: idp } })),

    getByName: async (protocol,idp)=> await AuthenticationTypes.findAll({
        where:{
            protocol:protocol,
            idp:idp,
            active:1
        }
    })

}
