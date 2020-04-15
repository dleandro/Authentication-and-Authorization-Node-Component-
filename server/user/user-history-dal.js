'use strict'


module.exports =  function(dalUtils, errors) {

    return {
        addUser_History: async (queryParams) => {



try {
    return await dalUtils.executeQuery(`INSERT INTO User_History(user_id,date,description) VALUES (?,?,?);`,
    queryParams)             

} catch (error) {
    throw errors.errorExecutingQuery
}


}
}
        
    }
