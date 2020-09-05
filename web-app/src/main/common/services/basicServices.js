var { sessions, users, roles, permissions, lists, auth_types, configs, WEB_API_HOME_PATH,profile } = require('../links').webApiLinks;
const {request,makeRequest,getRequest,DEFAULT_OPTIONS} =require('../Requests').requests;
const dateify = date => new Date(`${date.date}T${date.time}`);


const arrayToObject = (valuesArr, fieldsArr) => {
    let obj = {};
    fieldsArr.forEach((field, idx) => obj[field] = valuesArr[idx]);
    return obj;
}

/**
 * Function used to make login logout
 */
export function authenticationService(test) {
    if (test) {
        WEB_API_HOME_PATH = `http://localhost:8080`;
    }
    return {
        login: async (user, pass) => makeRequest(users.LOCAL_LOGIN_PATH, { username: user, password: pass }, 'POST'),
        logout: async (redirect) => makeRequest(users.LOGOUT_PATH, {}, 'POST'),
        getUserRoles: async () => getRequest(users.ROLES_PATH)
    }
}

export function authTypesService(test) {
    if (test) {
        WEB_API_HOME_PATH = `http://localhost:8080`;
    }
    return {
        changeActive: async (protocolName, idp, active) => makeRequest(auth_types.ACTIVATE_PATH, { protocol: protocolName, idp, active }, 'PATCH'),
        getPossibleAuthTypes: async (signal) => request(auth_types.AUTH_TYPES_PATH, { ...DEFAULT_OPTIONS('GET'), signal: signal })
    };
}

export function userService(test) {
    if (test) {
        WEB_API_HOME_PATH = `http://localhost:8080`;
    }
    return {
        editFields: ['New Username'],
        postFields: ['New Username', 'New Password'],
        detailsUrl: user => `/users/${user.id}`,
        get: async () => getRequest(users.USER_PATH),
        //TODO: updater should be fetched automatically in the module not just here, not the users who needs to save the user
        post: async (arr) => makeRequest(users.USER_PATH, arrayToObject(arr, ['username', 'password', 'updater']), 'POST'),
        //TODO: update returning strange fields and not returning field id
        update: async (oldObject, newValuesArr, updater) => makeRequest(users.USERNAME_UPDATE_PATH(oldObject.id), { username: newValuesArr[0], updater: updater }, 'PUT'),
        //TODO: fix problem were delete is blocked by constraints
        destroy: async (user) => makeRequest(users.SPECIFIC_USER_PATH(user.id), {}, 'DELETE'),
        updatePassword: async (UserId, password) => makeRequest(users.PASSWORD_UPDATE_PATH(UserId), { password: password, updater: UserId }, 'PUT'),
        getAuthenticatedUser: async () => getRequest(users.GET_AUTHENTICATED_USER_PATH),
        getUser: async (name) => getRequest(users.SPECIFIC_USER_PATH_BY_USERNAME(name)),
        getUserById: async (id) => getRequest(users.SPECIFIC_USER_PATH(id)),
        getUserLists: async (id) => getRequest(users.LIST_PATH(id)),
        getAuthenticatedUserPermissions: async () => getRequest(users.CURRENT_USER_PERMISSIONS_PATH)
    }
}

export function listService(test) {
    if (test) {
        WEB_API_HOME_PATH = `http://localhost:8080`;
    }
    return {
        detailsUrl: list => `/lists/${list.id}`,
        get: async () => getRequest(lists.LIST_PATH),
        post: async (arr) => makeRequest(lists.LIST_PATH, {list: arr[0]}, 'POST'),
        update: async (oldObject, newValuesArr) => makeRequest(lists.SPECIFIC_LIST_PATH(oldObject.id), { list: newValuesArr[0] }, 'PUT'),
        destroy: async (oldObject) => makeRequest(lists.SPECIFIC_LIST_PATH(oldObject.id), {}, 'DELETE'),
        getList: async (id) => getRequest(lists.SPECIFIC_LIST_PATH(id)),
        getActiveLists: async () => getRequest(lists.ACTIVE_LISTS_PATH),
        getUsersInThisList: async (id) => getRequest(lists.SPECIFIC_LIST_PATH(id) + "/users")
    }
}

export function rolesService(test) {

    const rolesDropdownOptionsFetcher = () => rolesService().get().then(data=>data.map(value=>({eventKey:value.id,text:value.role})));

    if (test) {
        WEB_API_HOME_PATH = `http://localhost:8080`;
    }
    return {
        postFields: ['New Role', {text:'Id of the Parent Role (dropdown) ', DropdownOptionsFetcher:rolesDropdownOptionsFetcher}],
        detailsUrl: role => `/roles/${role.id}`,
        get: async () => getRequest(roles.ROLE_PATH),
        post: async (arr) => makeRequest(roles.ROLE_PATH, { role: arr[0], parent_role: arr[1].value === '' ? null : arr[1].value }, 'POST'),
        update: async (oldObject, newValuesArr) => makeRequest(roles.SPECIFIC_ROLE_PATH(oldObject.id), { role: newValuesArr[0], parent_role: newValuesArr[1] }, 'PUT'),
        destroy: async (oldObject) => makeRequest(roles.SPECIFIC_ROLE_PATH(oldObject.id), {}, 'DELETE'),
        getRole: async (id) => getRequest(roles.SPECIFIC_ROLE_PATH(id)),
    }
}

export function permissionService(test) {
    if (test) {
        WEB_API_HOME_PATH = `http://localhost:8080`;
    }
    return {
        postFields: ['New Action', 'New Resource'],
        detailsUrl: permission => `/permissions/${permission.id}`,
        get: async () => getRequest(permissions.PERMISSION_PATH),
        post: async (arr) => makeRequest(permissions.PERMISSION_PATH, { action: arr[0], resource: arr[1] }, 'POST'),
        update: async (oldObject, arr) => makeRequest(permissions.SPECIFIC_PERMISSION_PATH(oldObject.id), { action: arr[0], resource: arr[1] }, 'PUT'),
        destroy: async (oldObject) => makeRequest(permissions.SPECIFIC_PERMISSION_PATH(oldObject.id), {}, 'DELETE'),
        getPermission: async (id) => getRequest(permissions.SPECIFIC_PERMISSION_PATH(id))
    }
}

export function sessionService(test) {
    if (test) {
        WEB_API_HOME_PATH = `http://localhost:8082`;
    }
    return {
        get: async () => getRequest(sessions.SESSION_PATH)
            .then(results => results.map(({UserId, createdAt, expires, sid}) => ({sid,UserId, start_date: `${new Date(createdAt)}`, end_date: `${new Date(expires)}`}))),
        destroy: async (oldObject) => makeRequest(sessions.SESSION_PATH, { sid: oldObject.sid }, 'DELETE')
    }
}

export function profileService(){
    return {
        get: async () => getRequest(profile.SESSION_PATH)
        .then(results => results.map(({ createdAt, expires, sid}) => ({sid, start_date: `${new Date(createdAt)}`, end_date: `${new Date(expires)}`}))),
        put: async (newPassword) => makeRequest(profile.PASSWORD_UPDATE_PATH,{password:newPassword},'PUT'),
        destroy : async (oldObj) => makeRequest(profile.SESSION_PATH,{ sid: oldObj.sid },'DELETE')
    }
}

// THIS ONE BELOW IS THE LOGS
export function logsService(test) {
    if (test) {
        WEB_API_HOME_PATH = `http://localhost:8082`;
    }
    return {
        get: async (userId) => getRequest(users.HISTORY_PATH(userId))
    }
}

export function configService() {
    return {
        changeDatabaseOptions: async (database_opts) => makeRequest(configs.DATABASE_CONFIG_PATH, { database_opts: database_opts }, 'POST'),
        changeDatabaseType: async (dbType) => makeRequest(configs.DATABASE_CONFIG_PATH, { type: dbType }, 'PUT'),
        change_google_oauth2_AuthenticationOptions: async (google_oauth2_opts) => makeRequest(configs.GOOGLE_CONFIG_PATH, { google_oauth2_opts: google_oauth2_opts }, 'PUT'), //recebe os mesmos parametros que estao no config file NOTA: esses mesmos parametros devem vir tb no getAuthTypesInfo do authService
        change_office365_oauth2_AuthenticationOptions: async (office365_oauth2_opts) => makeRequest(configs.AZUREAD_CONFIG_PATH, { office365_oauth2_opts: office365_oauth2_opts }, 'PUT'),
        change_office365_saml_AuthenticationOptions: async (office365_saml_opts) => makeRequest(configs.SAML_CONFIG_PATH, { office365_saml_opts: office365_saml_opts }, 'PUT'), //recebe os mesmos parametros que estao no config file NOTA: esses mesmos parametros devem vir tb no getAuthTypesInfo do authService
        getGoogleOptions: async () => getRequest(configs.GOOGLE_CONFIG_PATH),
        getAzureOptions: async () => getRequest(configs.AZUREAD_CONFIG_PATH),
        getSamlOptions: async () => getRequest(configs.SAML_CONFIG_PATH),
        getOptions: async (protocol, idp) => getRequest(configs.SPECIFIC_PATH(protocol, idp)),
        getRbacOptions: async () => getRequest(configs.RBAC_OPTS_PATH)
    }
}