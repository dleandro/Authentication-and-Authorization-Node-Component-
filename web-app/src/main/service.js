var { users_lists, sessions, users, roles, permissions, users_roles, lists, roles_permissions, auth_types, history, configs, WEB_API_HOME_PATH } = require('./common/links').webApiLinks;
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

const arrayToObject = (valuesArr,fieldsArr)=>{
    let obj={};
    fieldsArr.forEach((field,idx) => obj[field]=valuesArr[idx]);
    return obj;
}

/**
 * Function used to make login logout
 */
export function authenticationService(test) {
    if (test) {
        WEB_API_HOME_PATH = `http://localhost:8082`;
    }
    return {
        login: async (user, pass) => makeRequest(users.LOCAL_LOGIN_PATH, { username: user, password: pass }, 'POST'),
        logout: async (redirect) => makeRequest(users.LOGOUT_PATH, {}, 'POST'),
        getUserRoles: async()=>getRequest(users.ROLES_PATH)
    }
}

export function authTypesService(test) {
    if (test) {
        WEB_API_HOME_PATH = `http://localhost:8082`;
    }
    return {
        changeActive: async (protocolName, idp, active) => makeRequest(auth_types.ACTIVATE_PATH, { protocol: protocolName, idp, active }, 'PATCH'),
        getPossibleAuthTypes: async (signal) => request(auth_types.AUTH_TYPES_PATH, { ...DEFAULT_OPTIONS('GET'), signal: signal })
    };
}

export function userService(test) {
    if (test) {
        WEB_API_HOME_PATH = `http://localhost:8082`;
    }
    return {
        get: async () => getRequest(users.USER_PATH),
        post: async (arr) =>makeRequest(users.USER_PATH, arrayToObject(arr,['username','password','updater']), 'POST'),
        //TODO: update returning strange fields and not returning field id
        update: async (oldObject, newValuesArr,updater) => makeRequest(users.USERNAME_UPDATE_PATH(oldObject.id), { username: newValuesArr[0],updater:updater }, 'PUT'),
        //TODO: fix problem were delete is blocked by constraints
        destroy: async (user) => {
            makeRequest(users.SPECIFIC_USER_PATH(user.id), {}, 'DELETE')
        },
        updatePassword:async (UserId,password)=>makeRequest(users.PASSWORD_UPDATE_PATH(UserId), { password: password,updater:UserId }, 'PUT'),
        getAuthenticatedUser: async () => getRequest(users.GET_AUTHENTICATED_USER_PATH),
        getUser: async (name) => getRequest(users.SPECIFIC_USER_PATH_BY_USERNAME(name)),
        getUserById: async (id) => getRequest(users.SPECIFIC_USER_PATH(id)),
        getUserLists: async (id) => getRequest(users.LIST_PATH(id)),
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
        post: async (arr) => makeRequest(roles.ROLE_PATH, { role: arr[0], parent_role: arr[1].value === '' ? null : arr[1].value }, 'POST'),
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
        get: async userId => getRequest(users_roles.BY_USER(userId)),
        post: async (userId, roleId, updater, date) => makeRequest(users_roles.USERS_ROLES_PATH, { user: userId, role: roleId, active: 1, updater: updater, start_date: date }, 'POST'),
        update: async (userId, roleId,updater, arr) => makeRequest(users_roles.USERS_ROLES_PATH, { user: userId, role: roleId,updater:updater, end_date: new Date(arr[0].date + 'T' + arr[0].time), active: arr[1] }, 'PUT'),
        destroy: async (UserId, RoleId) => makeRequest(users_roles.USERS_ROLES_PATH, { user: UserId, role: RoleId }, 'DELETE'),
        getUsersActiveRoles: async (id) => getRequest(users_roles.USERS_ACTIVE_ROLES_PATH(id)),
        deactivateUserRole: async (userid, roleid) => makeRequest(users_roles.USERS_ROLES_PATH, { user: userid, role: roleid, active: 0 }, 'PUT')
    }
}


export function roleUserService() {
    return {
        get: async (roleId) => getRequest(users_roles.BY_ROLE(roleId)),
        post: async (arr) => makeRequest(users_roles.USERS_ROLES_PATH, { user: arr[0], role: arr[1], active: 1, updater: arr[2], start_date: arr[3] }, 'POST'),
        update: userRoleService().update,
        destroy: userRoleService().destroy
    }
}

export function UsersessionService(test) {
    if (test) {
        WEB_API_HOME_PATH = `http://localhost:8082`;
    }
    return {
        get: async (id) => getRequest(sessions.USER_SESSIONS_PATH(id)),
        update: async (oldObject, arr) => makeRequest(sessions.SPECIFIC_SESSION_PATH(oldObject.sid), { sid: oldObject.sid, date: new Date(arr[0].date + 'T' + arr[0].time) }, 'PUT'),
        destroy: async (oldObject) => makeRequest(sessions.SESSION_PATH, { sid: oldObject.sid }, 'DELETE'),
        getSession: async (id) => getRequest(sessions.SPECIFIC_SESSION_PATH(id))
    }
}

export function sessionService(test) {
    if (test) {
        WEB_API_HOME_PATH = `http://localhost:8082`;
    }
    return {
        get: async () => getRequest(sessions.SESSION_PATH),
        destroy: async (oldObject) => makeRequest(sessions.SESSION_PATH, { sid: oldObject.sid }, 'DELETE')
    }
}
// TODO: UserSessions
//TODO: User Permissions
export function rolePermissionService() {
    return {
        //TODO: get returns object with fields PermissionId and Permission.id chose one and change destroy/update according to the chosen one
        get: async (id) => getRequest(roles_permissions.BY_ROLE(id)),
        post: async (arr) => makeRequest(roles_permissions.ROLES_PERMISSION_PATH, { permissionId: arr[0], roleId: arr[1] }, 'POST')
            .then(data => permissionService().getPermission(data.PermissionId)),
        destroy: async (roleId, PermissionId) => makeRequest(roles_permissions.ROLES_PERMISSION_PATH, { permissionId: PermissionId, roleId: roleId }, 'DELETE')
    }
}

export function permissionRoleService() {
    return {
        get: async (id) => getRequest(roles_permissions.BY_PERMISSION(id)),
        post: async (arr) => makeRequest(roles_permissions.ROLES_PERMISSION_PATH, { permissionId: arr[0], roleId: arr[1] }, 'POST'),
        destroy: rolePermissionService().destroy
    }
}

export function userListService() {
    return {
        //TODO: get not working, problem in api
        get: async (id) => getRequest(users_lists.BY_USER(id)),
        post: async arr => makeRequest(users_lists.USERS_LIST_PATH, { ListId: arr[0], UserId: arr[1], active: 1, start_date: arr[2], updater: arr[3] }, 'POST'),
        update: async (UserId, ListId,updater,arr) => makeRequest(users_lists.USERS_LIST_PATH, { user: UserId, updater:updater, list: ListId, end_date: new Date(arr[0].date + 'T' + arr[0].time), active: arr[1] }, 'PUT'),
        destroy: async (ListId, UserId) => makeRequest(users_lists.USERS_LIST_PATH, { ListId: ListId, UserId: UserId }, 'DELETE'),
        // not working
        deactivateList: async (listId, userId) => makeRequest(users_lists.USERS_LIST_PATH, { active: 0 }, 'PUT')
    }
}

export function listUserService() {
    return {
        get: async (id) => getRequest(users_lists.BY_LIST(id)),
        post: async (arr) => makeRequest(users_lists.USERS_LIST_PATH, { ListId: arr[0], UserId: arr[1], active: 1, start_date: arr[2], updater: arr[3] }, 'POST'),
        update:userListService().update,
        destroy: async (ListId, UserId) => userListService().destroy(ListId, UserId),
        // not working
        deactivateList: async (listId, userId) => makeRequest(users_lists.USERS_LIST_PATH, { active: 0 }, 'PUT')
    }
}


// TODO: USERHISTORY
export function userHistoryService() {
    return {
        get: async (id) => getRequest(history.USER_HITORY_PATH(id))
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
        changeGoogleAuthenticationOptions: async (google_opts) => makeRequest(configs.GOOGLE_CONFIG_PATH, { google_opts: google_opts }, 'PUT'), //recebe os mesmos parametros que estao no config file NOTA: esses mesmos parametros devem vir tb no getAuthTypesInfo do authService
        changeAzureADAuthenticationOptions: async (azure_opts) => makeRequest(configs.AZUREAD_CONFIG_PATH, { azure_opts: azure_opts }, 'PUT'),
        changeSamlAuthenticationOptions: async (saml_opts) => makeRequest(configs.SAML_CONFIG_PATH, { saml_opts: saml_opts }, 'PUT'), //recebe os mesmos parametros que estao no config file NOTA: esses mesmos parametros devem vir tb no getAuthTypesInfo do authService
        getGoogleOptions: async () => getRequest(configs.GOOGLE_CONFIG_PATH),
        getAzureOptions: async () => getRequest(configs.AZUREAD_CONFIG_PATH),
        getSamlOptions: async () => getRequest(configs.SAML_CONFIG_PATH),
        getOptions: async (protocol, idp) => getRequest(configs.SPECIFIC_PATH(protocol, idp)),
        getRbacOptions: async () => getRequest(configs.RBAC_OPTS_PATH)
    }
}