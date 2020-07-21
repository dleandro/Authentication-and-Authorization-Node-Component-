const fetch = require('node-fetch')
var { users_lists, sessions, users, roles, permissions, users_roles, lists, roles_permissions, protocols, history, configs } = require('./common/links').webApiLinks;
const DEFAULT_OPTIONS = (met) => { return { method: met, credentials: "include", headers: { 'Content-Type': "application/json" } } };
var HOME_PATH = undefined
//var HOME_PATH = 'http://35.233.44.226:80'

function produceInit(body, met) {
    return { ...DEFAULT_OPTIONS(met), body: JSON.stringify(body), json: true };
}

function handleResponse(resp) {
    if (resp.ok) {
        return resp.json();
    }
    if (resp.status === 401) {
        return createErrObj("Unauthorized:The current user cannot access this resource", 401)
    }
    throw new Error('Network response was not ok');
}

function createErrObj(msg, status) {
    return JSON.parse(`{ "err":"${msg}","status":"${status}"}`)
}


const request = (url, init) => fetch(HOME_PATH ? HOME_PATH + url : url, init)
    .then(resp =>
        handleResponse(resp)
    )
    .catch(err => {
        console.error(`failed to fetch: ${init.method} ${HOME_PATH ? HOME_PATH + url : url}`); console.error(err); return [err]
    })

const getRequest = (url) => request(url, DEFAULT_OPTIONS('GET'));
const makeRequest = (url, body, met) => request(url, produceInit(body, met));


/**
 * Function used to make login logout
 */
export function authenticationService(test) {

    return {
        login: async (user, pass) => makeRequest(users.LOCAL_LOGIN_PATH, { username: user, password: pass }, 'POST'),

        logout: async (redirect) => makeRequest(users.LOGOUT_PATH, {}, 'POST')
    }
}

export function protocolService() {

    return {
        changeActive: async (protocolName, active) => makeRequest(protocols.ACTIVATE_PATH, { protocol: protocolName, active: active }, 'PUT'),
        getPossibleAuthTypes: async () => getRequest(protocols.PROTOCOLS_PATH)
    }
}

export function userService() {
    return {
        getAuthenticatedUser: async () => getRequest(users.GET_AUTHENTICATED_USER_PATH),
        getUser: async (name) => getRequest(users.SPECIFIC_USER_PATH_BY_USERNAME(name)),
        getUserById: async (id) => getRequest(users.SPECIFIC_USER_PATH(id)),
        getUsers: async () => getRequest(users.USER_PATH),
        getUserSessions: async (id) => getRequest(users.SESSION_PATH(id)),
        getUserLists: async (id) => getRequest(users.LIST_PATH(id)),
        getUserHistory: async (id) => getRequest(users.HISTORY_PATH(id)),
        getAuthenticatedUserPermissions: async () => getRequest(users.CURRENT_USER_PERMISSIONS_PATH),
        addUser: async (arr) => makeRequest(users.USER_PATH, { username: arr[0], password: arr[1] }, 'POST'),
        editUsername: async (arr) => makeRequest(users.USERNAME_UPDATE_PATH(arr[0]), { username: arr[1] }, 'PUT'),
        deleteUser: async (arr) => {
            makeRequest(users.SPECIFIC_USER_PATH(arr[0]), {}, 'DELETE')
        }
    }
}



export function listService(test) {
    if (test){
        HOME_PATH='http://localhost:3000';
    }
    return {
        getLists: async () => getRequest(lists.LIST_PATH),
        getList: async (id) => getRequest(lists.SPECIFIC_LIST_PATH(id)),
        addList: async (arr) => makeRequest(lists.LIST_PATH, {
            list: arr[1]
        }, 'POST'),
        editList: async (arr) => makeRequest(lists.SPECIFIC_LIST_PATH(arr[0]), { list: arr[1] }, 'PUT'),
        deleteList: async (id) => makeRequest(lists.SPECIFIC_LIST_PATH(id), {}, 'DELETE'),
        getActiveLists: async () => getRequest(lists.ACTIVE_LISTS_PATH),
        getUserActiveLists: async (id) => getRequest(lists.USERS_ACTIVE_LISTS_PATH(id)),
        getUsersInThisList: async (id) => getRequest(lists.SPECIFIC_LIST_PATH(id) + "/users")
    }
}

export function rolesService() {
    return {
        getRoles: async () => getRequest(roles.ROLE_PATH),
        getRole: async (id) => getRequest(roles.SPECIFIC_ROLE_PATH(id)),
        getUsersWithThisRole: async (id) => getRequest(roles.ROLE_USERS_PATH(id)),
        getPermissionsWithThisRole: async (id) => getRequest(roles.ROLES_PERMISSION_PATH(id)),
        addRole: async (arr) => makeRequest(roles.ROLE_PATH, { role: arr[1], parent_role: arr[2] }, 'POST'),
        editRole: async (arr) => makeRequest(roles.SPECIFIC_ROLE_PATH(arr[0]), { role: arr[1], parent_role: arr[2] }, 'PUT'),
        deleteRole: async (id) => makeRequest(roles.SPECIFIC_ROLE_PATH(id), {}, 'DELETE')

    }
}

export function permissionService() {
    return {
        getPermissions: async () => getRequest(permissions.PERMISSION_PATH),
        getPermission: async (id) => getRequest(permissions.SPECIFIC_PERMISSION_PATH(id)),
        addPermission: async (arr) => makeRequest(permissions.PERMISSION_PATH, { action: arr[1], resource: arr[2] }, 'POST'),
        editPermission: async (arr) => makeRequest(permissions.SPECIFIC_PERMISSION_PATH(arr[0]), { action: arr[1], resource: arr[2] }, 'PUT'),
        deletePermission: async (arr) => makeRequest(permissions.SPECIFIC_PERMISSION_PATH(arr[0]), {}, 'DELETE'),
        getRolesWithThisPermission: async (id) => getRequest(permissions.SPECIFIC_PERMISSION_PATH(id) + '/roles')
    }
}

export function userRoleService() {
    return {
        getUsersActiveRoles: async (id) => getRequest(users_roles.USERS_ACTIVE_ROLES_PATH(id)),
        getUsersRoles: async (id) => getRequest(users.ROLES_PATH(id)),
        addUserRole: async (userid, roleid, updater) => makeRequest(users_roles.USERS_ROLES_PATH, { user: userid, role: roleid, active: 1, updater: updater }, 'POST'),
        deactivateUserRole: async (userid, roleid) => makeRequest(users_roles.USERS_ROLES_PATH, { user: userid, role: roleid, active: 0 }, 'PUT'),
        deleteUserRole: async (userId, RoleId) => makeRequest(users_roles.USERS_ROLES_PATH, { user: userId, role: RoleId }, 'DELETE')
    }
}

export function sessionService() {
    return {
        getSessions: async () => getRequest(sessions.SESSION_PATH),
        getSession: async (id) => getRequest(sessions.SPECIFIC_SESSION_PATH(id)),
        deleteSession: async (id) => makeRequest(sessions.SESSION_PATH, { sid: id }, 'DELETE'),
        changeSessionData: async (data, id) => makeRequest(sessions.SPECIFIC_SESSION_PATH, { sid: id, data: data }, 'PUT')
    }
}

export function rolePermissionService() {
    return {
        addRolePermission: async (roleId, permissionId, action, resource) => makeRequest(roles_permissions.ROLES_PERMISSION_PATH, { permissionId: permissionId, action: action, resource: resource, roleId: roleId }, 'POST'),
        deleteRolePermission: async (roleId, permissionId) => makeRequest(roles_permissions.ROLES_PERMISSION_PATH, { permissionId: permissionId, roleId: roleId }, 'DELETE')
    }
}

export function userListService() {
    return {
        addUserList: async (listId, userId, updater) => makeRequest(users_lists.USERS_LIST_PATH, { ListId: listId, UserId: userId, active: 1, updater: updater }, 'POST'),
        deactivateList: async (listId, userId) => makeRequest(users_lists.USERS_LIST_PATH, { active: 0 }, 'PUT'),
        deleteUserList: async (listId, userId) => makeRequest(users_lists.USERS_LIST_PATH, { ListId: listId, UserId: userId }, 'DELETE')
    }
}

export function historyService() {
    return {
        getUserHistory: async (userId) => getRequest(history.HISTORY_PATH)
    }
}


export function configService() {
    return {
        changeDatabaseOptions: async (database_opts) => makeRequest(configs.DATABASE_CONFIG_PATH, { database_opts: database_opts }, 'POST'),
        changeDatabaseType: async (dbType) => makeRequest(configs.DATABASE_CONFIG_PATH, { type: dbType }, 'PUT'),
        changeGoogleAuthenticationOptions: async (google_opts) => makeRequest(configs.GOOGLE_CONFIG_PATH, { google_opts: google_opts }, 'PUT'), //recebe os mesmos parametros que estao no config file NOTA: esses mesmos parametros devem vir tb no getAuthTypesInfo do authService
        changeAzureADAuthenticationOptions: async (azure_opts) => makeRequest(configs.AZUREAD_CONFIG_PATH, { azure_opts: azure_opts }, 'PUT'), //recebe os mesmos parametros que estao no config file NOTA: esses mesmos parametros devem vir tb no getAuthTypesInfo do authService
    }
}




