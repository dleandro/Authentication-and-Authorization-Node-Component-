const Protocols = require('../functionalities/Models/protocols')

module.exports = {
    create: async (name,active) =>
        await Protocols.create({
            name: name,
            active:active
        }),
    getAll: async () =>
        await Protocols.findAll({ raw: true })
    ,
    get: async (name) => {
        await Protocols.findByPk(name)
    },
}