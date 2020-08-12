const CustomError = require('./custom-error');

module.exports = {

    SequelizeValidationError: { status: 400 },
    SequelizeUniqueConstraintError: { status: 409 },
    SequelizeForeignKeyConstraintError: { status: 409 },
    SequelizeConnectionError: { status: 400 },
    Unauthorized: new CustomError({
        title: 'Unauthorized',
        detail: `The current user cannot access this resource`,
        status: 401
    }),
    Forbidden: new CustomError({
        title: 'Forbidden',
        detail: `The  user is not Authenticated`,
        status: 403
    }),

    IdpUserUnauthorized: new CustomError({
        title: 'Unauthorized',
        detail: 'User registered with an identity provider so he cannot authenticate via a local strategy',
        status: 401
    }),

    incorrectPassword: new CustomError({
        title: 'Incorrect Password',
        detail: 'The user tried to authenticate with the wrong password',
        status: 401
    }),

    userIsBlacklisted: new CustomError({
        title: 'User is Blacklisted',
        detail: 'The user that tried to authenticate is currently blacklisted',
        status: 401
    }),

    protocolIsNotActive: new CustomError({
        title: 'The authentication scheme you tried to use is currently inactive',
        detail: 'The authentication scheme you tried to use is currently inactive, ask an admin to activate it',
        status: 400
    })
    
};

