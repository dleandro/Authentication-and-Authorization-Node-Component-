'use strict'


module.exports =  function(dalUtils, errors) {

    return {
        addUser_History: async (user_id,date,description) => {



try {
    return await dalUtils.executeQuery(`INSERT INTO User_History(user_id,date,description) VALUES (?,?,?);`,
    [user_id,date,description])             

} catch (error) {
    throw errors.errorExecutingQuery
}


}
}
        
    }
