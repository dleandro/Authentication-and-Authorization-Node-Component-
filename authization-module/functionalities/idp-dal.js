const Idp = require('../functionalities/Models/idp')

module.exports = {
    /**
     *
     * @param idpId
     * @param idpname
     * @param userId
     * @returns {Promise<*>}
     */
    create: (idpId, idpname, userId) =>
        await Idp.create({
            idp_id: idpId,
            idpname: idpname,
            user_id: userId
        }
        ),
    /**
     *
     * @param idpId
     * @returns {Promise<*>}
     */
    delete: (idpId) =>
        await Idp.destroy({ where: { idp_id: idpId } })
}
