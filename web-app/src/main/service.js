var { users_lists, sessions, users, roles, permissions, users_roles, lists, roles_permissions, protocols, history, configs, WEB_API_HOME_PATH } = require('./common/links').webApiLinks;
const DEFAULT_OPTIONS = (met) => { return { method: met, credentials: "include", headers: { 'Content-Type': "application/json" } } };

function produceInit(body, met) {
    return { ...DEFAULT_OPTIONS(met), body: JSON.stringify(body), json: true };
}

const request = (url, init) => fetch(WEB_API_HOME_PATH ? WEB_API_HOME_PATH + url : url, init)
    .then(resp => resp.json())
    .then(resp => {
        if (resp.err) {
            throw new Error(resp.err)
        }
        return resp
    })

const getRequest = (url) => request(url, DEFAULT_OPTIONS('GET'));
const makeRequest = (url, body, met) => request(url, produceInit(body, met));

/**
 * Function used to make login logout
 */
export function authenticationService(test) {
    if (test) {
        WEB_API_HOME_PATH = `http://localhost:8082`;
    }
    return {
        login: async (user, pass) => makeRequest(users.LOCAL_LOGIN_PATH, { username: user, password: pass }, 'POST'),
        logout: async (redirect) => makeRequest(users.LOGOUT_PATH, {}, 'POST')
    }
}

export function protocolService(test) {
    if (test) {
        WEB_API_HOME_PATH = `http://localhost:8082`;
    }
    return {
        changeActive: async (protocolName, active) => makeRequest(protocols.ACTIVATE_PATH, { protocol: protocolName, active: active }, 'PUT'),
        getPossibleAuthTypes: async () => getRequest(protocols.PROTOCOLS_PATH)
    };
}

export function userService(test) {
    if (test) {
        WEB_API_HOME_PATH = `http://localhost:8082`;
    }
    return {
        get: async () => getRequest(users.USER_PATH),
        post: async (arr) => makeRequest(users.USER_PATH, { username: arr[0], password: arr[1] }, 'POST'),
        update: async (oldObject, newValuesArr) => makeRequest(users.USERNAME_UPDATE_PATH(oldObject.id), { username: newValuesArr[0] }, 'PUT'),
        destroy: async (user) => {
            makeRequest(users.SPECIFIC_USER_PATH(user.id), {}, 'DELETE')
        },
        getAuthenticatedUser: async () => getRequest(users.GET_AUTHENTICATED_USER_PATH),
        getUser: async (name) => getRequest(users.SPECIFIC_USER_PATH_BY_USERNAME(name)),
        getUserById: async (id) => getRequest(users.SPECIFIC_USER_PATH(id)),
        getUserLists: async (id) => getRequest(users.LIST_PATH(id)),
        getUserHistory: async (id) => getRequest(users.HISTORY_PATH(id)),
        getAuthenticatedUserPermissions: async () => getRequest(users.CURRENT_USER_PERMISSIONS_PATH)
    }
}

export function listService(test) {
    if (test) {
        WEB_API_HOME_PATH = `http://localhost:8082`;
    }
    return {
        get: async () => getRequest(lists.LIST_PATH),
        post: async (arr) => makeRequest(lists.LIST_PATH, {
            list: arr[0]
        }, 'POST'),
        update: async (oldObject, newValuesArr) => makeRequest(lists.SPECIFIC_LIST_PATH(oldObject.id), { list: newValuesArr[0] }, 'PUT'),
        destroy: async (oldObject) => makeRequest(lists.SPECIFIC_LIST_PATH(oldObject.id), {}, 'DELETE'),
        getList: async (id) => getRequest(lists.SPECIFIC_LIST_PATH(id)),
        getActiveLists: async () => getRequest(lists.ACTIVE_LISTS_PATH),
        getUsersInThisList: async (id) => getRequest(lists.SPECIFIC_LIST_PATH(id) + "/users")
    }
}

export function rolesService(test) {
    if (test) {
        WEB_API_HOME_PATH = `http://localhost:8082`;
    }
    return {
        get: async () => getRequest(roles.ROLE_PATH),
        post: async (arr) => makeRequest(roles.ROLE_PATH, { role: arr[0], parent_role: arr[1] === '' ? null : arr[1] }, 'POST'),
        update: async (oldObject, newValuesArr) => makeRequest(roles.SPECIFIC_ROLE_PATH(oldObject.id), { role: newValuesArr[0], parent_role: newValuesArr[1] }, 'PUT'),
        destroy: async (oldObject) => makeRequest(roles.SPECIFIC_ROLE_PATH(oldObject.id), {}, 'DELETE'),
        getRole: async (id) => getRequest(roles.SPECIFIC_ROLE_PATH(id)),
    }
}

export function permissionService() {
    return {
        get: async () => getRequest(permissions.PERMISSION_PATH),
        post: async (arr) => makeRequest(permissions.PERMISSION_PATH, { action: arr[0], resource: arr[1] }, 'POST'),
        update: async (oldObject, arr) => makeRequest(permissions.SPECIFIC_PERMISSION_PATH(oldObject.id), { action: arr[0], resource: arr[1] }, 'PUT'),
        destroy: async (oldObject) => makeRequest(permissions.SPECIFIC_PERMISSION_PATH(oldObject.id), {}, 'DELETE'),
        getPermission: async (id) => getRequest(permissions.SPECIFIC_PERMISSION_PATH(id))
    }
}

export function userRoleService() {
    return {
        get: async (userId) => getRequest(users.ROLES_PATH(userId)),
        post: async (arr) => makeRequest(users_roles.USERS_ROLES_PATH, { user: arr[0], role: arr[1], active: arr[2], updater: arr[3], start_date: arr[4] }, 'POST'),
        update: async (oldObject, arr) => makeRequest(users_roles.USERS_ROLES_PATH, { user: oldObject.userId, role: oldObject.roleId, end_date: new Date(arr[0].date + 'T' + arr[0].time), active: arr[1] }, 'PUT'),
        destroy: async (oldObject) => makeRequest(users_roles.USERS_ROLES_PATH, { user: oldObject.userId, role: oldObject.RoleId }, 'DELETE'),
        getUsersActiveRoles: async (id) => getRequest(users_roles.USERS_ACTIVE_ROLES_PATH(id)),
        deactivateUserRole: async (userid, roleid) => makeRequest(users_roles.USERS_ROLES_PATH, { user: userid, role: roleid, active: 0 }, 'PUT')
    }
}

export function roleUserService() {
    return {
        get: async (roleId) => getRequest(roles.ROLE_USERS_PATH(roleId)),
        post: async (arr) => makeRequest(users_roles.USERS_ROLES_PATH, { user: arr[0], role: arr[1], active: arr[2], updater: arr[3], start_date: arr[4] }, 'POST'),
        update: userRoleService().update,
        destroy: userRoleService().destroy
    }
}

export function sessionService(test) {
    if (test) {
        WEB_API_HOME_PATH = `http://localhost:8082`;
    }
    return {
        get: async (id) => getRequest(users.SESSION_PATH(id)),
        update: async (oldObject, arr) => makeRequest(sessions.SPECIFIC_SESSION_PATH(oldObject.sid), { sid: oldObject.sid, date: new Date(arr[0].date + 'T' + arr[0].time) }, 'PUT'),
        destroy: async (oldObject) => makeRequest(sessions.SESSION_PATH, { sid: oldObject.sid }, 'DELETE'),
        getSession: async (id) => getRequest(sessions.SPECIFIC_SESSION_PATH(id))
    }
}
// TODO: UserSessions

export function rolePermissionService() {
    return {
        get: async (id) => getRequest(roles.ROLES_PERMISSION_PATH(id)),
        post: async (obj) => makeRequest(roles_permissions.ROLES_PERMISSION_PATH, { permissionId: obj.permissionId, roleId: obj.roleId }, 'POST')
            .then(data => permissionService().getPermission(data.PermissionId)),
        destroy: async (oldObject) => makeRequest(roles_permissions.ROLES_PERMISSION_PATH, { permissionId: oldObject.permissionId, roleId: oldObject.roleId }, 'DELETE')
    }
}

export function permissionRoleService() {
    return {
        get: async (id) => getRequest(permissions.SPECIFIC_PERMISSION_PATH(id) + '/roles'),
        post: async (obj) => makeRequest(roles_permissions.ROLES_PERMISSION_PATH, { permissionId: obj.permissionId, roleId: obj.roleId }, 'POST')
            .then(data => permissionService().getPermission(data.PermissionId)),
        destroy: rolePermissionService().destroy
    }
}

export function userListService() {
    return {
        get: async (id) => getRequest(users.LIST_PATH(id)),
        post: async (arr) => makeRequest(users_lists.USERS_LIST_PATH, { ListId: arr[0], UserId: arr[1], active: arr[2], start_date: arr[3], updater: arr[4] }, 'POST'),
        update: async (oldObject, arr) => makeRequest(users_lists.USERS_LIST_PATH, { user: oldObject.userId, list: oldObject.listId, end_date: new Date(arr[0].date + 'T' + arr[0].time), active: arr[1] }, 'PUT'),
        destroy: async (oldObject) => makeRequest(users_lists.USERS_LIST_PATH, { ListId: oldObject.listId, UserId: oldObject.userId }, 'DELETE'),
        // not working
        deactivateList: async (listId, userId) => makeRequest(users_lists.USERS_LIST_PATH, { active: 0 }, 'PUT')
    }
}

export function listUserService() {
    return {
        get: async (id) => getRequest(lists.USERS_LISTS_PATH(id)),
        post: async (arr) => makeRequest(users_lists.USERS_LIST_PATH, { ListId: arr[0], UserId: arr[1], active: arr[2], start_date: arr[3], updater: arr[4] }, 'POST'),
        update: async (oldObject, arr) => userListService().update(),
        destroy: async (oldObject) => userListService().destroy(),
        // not working
        deactivateList: async (listId, userId) => makeRequest(users_lists.USERS_LIST_PATH, { active: 0 }, 'PUT')
    }
}


// TODO: USERHISTORY
// THIS ONE BELOW IS THE LOGS
export function historyService(test) {
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
        changeGoogleAuthenticationOptions: async (google_opts) => makeRequest(configs.GOOGLE_CONFIG_PATH, { google_opts: google_opts }, 'PUT'), //recebe os mesmos parametros que estao no config file NOTA: esses mesmos parametros devem vir tb no getAuthTypesInfo do authService
        changeAzureADAuthenticationOptions: async (azure_opts) => makeRequest(configs.AZUREAD_CONFIG_PATH, { azure_opts: azure_opts }, 'PUT'),
        changeSamlAuthenticationOptions: async (saml_opts) => makeRequest(configs.SAML_CONFIG_PATH, { saml_opts: saml_opts }, 'PUT'), //recebe os mesmos parametros que estao no config file NOTA: esses mesmos parametros devem vir tb no getAuthTypesInfo do authService
        getGoogleOptions: async () => getRequest(configs.GOOGLE_CONFIG_PATH + '/options'),
        getAzureOptions: async () => getRequest(configs.AZUREAD_CONFIG_PATH + '/options'),
        getSamlOptions: async () => getRequest(configs.SAML_CONFIG_PATH + '/options'),
        getOptions: async (protocol) => getRequest(configs.SPECIFIC_PATH(protocol) + '/options')
    }
}




