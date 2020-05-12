const dalUtils=require('../common/util/dal-utils')
/**
 *
 * @type {{
 * insertIDP: insertIDP,
 * deleteIDPByUserId: deleteIDPByUserId}}
 */
module.exports={
    /**
     *
     * @param idpId
     * @param idpname
     * @param userId
     * @returns {Promise<*>}
     */
    insertIDP: (idpId, idpname, userId) =>
        dalUtils.executeQuery({
            statement: 'Insert into IDP(user_id,idp_id,idpname) values (?,?,?)',
            description: "user's username update",
            params: [userId, idpId, idpname]
        }),
    /**
     *
     * @param idpId
     * @returns {Promise<*>}
     */
    deleteIDPByUserId: (idpId) =>
        dalUtils.executeQuery({
            statement: 'Delete from IDP where user_id=?',
            description: "user's username update",
            params: [user_id, idpId, idpname]
        })
}
