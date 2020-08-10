const AuthenticationTypes = require('../sequelize-model').AuthenticationTypes,
    tryCatch = require('../../common/util/functions-utils')


module.exports = {

    get: () => tryCatch(() => AuthenticationTypes.findAll()),

    getActive: () => tryCatch(() => AuthenticationType.findAll({ where: { active: 1 } })),

    changeActive: (protocol, idp, active) => tryCatch(() => AuthenticationType.update({ active: active }, { where: { protocol: protocol, idp: idp } }))

}
