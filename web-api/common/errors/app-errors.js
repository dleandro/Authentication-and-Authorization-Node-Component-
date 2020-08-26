const CustomError = require('./custom-error');

module.exports = {userNotAuthenticated: new CustomError({title: 'User is not authenticated',
        detail: 'User tried to access a resource that requires authentication and he doesn\'t meet those requirements', status: 401})};
