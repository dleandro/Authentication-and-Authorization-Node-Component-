const dalUtils=require('../common/util/dal-utils')

module.exports={
 insertIDP: async (idp_id, idpname, user_id) => {
    const query = {
        statement: 'Insert into IDP(user_id,idp_id,idpname) values (?,?,?)',
        description: "user's username update",
        params: [user_id, idp_id, idpname]
    }
    try {

        return await dalUtils.executeQuery(query)


    } catch (error) {

        throw error
    }
},
deleteIDPByUserId: async (idp_id) => {
    const query = {
        statement: 'Delete from IDP where user_id=?',
        description: "user's username update",
        params: [user_id, idp_id, idpname]
    }
    try {

        return await dalUtils.executeQuery(query)


    } catch (error) {

        throw error
    }
}
}