const {checkProtocol,findUserByIdpOrCreate,addNotification,isBlackListed} = require('../../../util/passport-utils');

const strategyCallback= async (idpId, idpName, username, password,protocol,idp,done) => {
    let errorMessage = 'Protocol is not avaiable';
    if (await checkProtocol(protocol,idp)) {
        const user = await findUserByIdpOrCreate(idpId, idpName, username, password);
        if (!await isBlackListed(user.id)) {
            return done(null, user);
        }
        addNotification(user.id);
        errorMessage= 'User is BlackListed';
    }
    return done(null, false, {message: errorMessage});
};

module.exports = strategyCallback;
