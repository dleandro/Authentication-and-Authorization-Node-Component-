const
    Idp = require('../sequelize-model').Idp,
    tryCatch = require('../../common/util/functions-utils');

module.exports = {

    getByUserId: userId => tryCatch(() => Idp.findOne({ where: { user_id: userId } })),

    /**
     *
     * @param idpId
     * @param idpname
     * @param userId
     * @returns {Promise<*>}
     */
    create: (idpId, idpname, userId) => tryCatch(() =>Idp.create({idpname, idp_id: idpId, user_id: userId})),
    /**
     *
     * @param idpId
     * @returns {Promise<*>}
     */
    delete: idpId => tryCatch(() => Idp.destroy({ where: { idp_id: idpId } })),
};
