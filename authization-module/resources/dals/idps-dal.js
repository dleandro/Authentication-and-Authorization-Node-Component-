const
    Idp = require('../sequelize-model').Idp,
    w = require('../../common/util/with')

module.exports = {
    /**
     *
     * @param idpId
     * @param idpname
     * @param userId
     * @returns {Promise<*>}
     */
    create: w((idpId, idpname, userId) =>
        Idp.create({
            idp_id: idpId,
            idpname: idpname,
            user_id: userId
        }
        )),
    /**
     *
     * @param idpId
     * @returns {Promise<*>}
     */
    delete: w((idpId) =>
        Idp.destroy({ where: { idp_id: idpId } }))
}
