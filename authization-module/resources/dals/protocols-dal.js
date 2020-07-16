const Protocols = require('../sequelize-model').Protocols,
w = require('../../common/util/with')


module.exports = {
    create: w((name, active) =>
        Protocols.create({
            name: name,
            active: active
        })),
    get: w(() =>
        Protocols.findAll({ raw: true }))
    ,
    getByName: w((name) =>
        Protocols.findByPk(name, { raw: true })),

    getActive: w(() => Protocols.findAll({ where: { active: 1 } })),

    changeActive: w((protocol, active) => Protocols.update({ active: active }, { where: { protocol: protocol } }))
}
