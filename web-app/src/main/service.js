const fetch = require('node-fetch')
var { users_lists, sessions, users, roles, permissions, users_roles, lists, roles_permissions, protocols, history, configs } = require('./common/links').webApiLinks;
const DEFAULT_OPTIONS = (met) => { return { method: met, credentials: "include", headers: { 'Content-Type': "application/json" } } };
var HOME_PATH = process.env.REACT_APP_WEBAPP?undefined:'https://webapi-dot-auth-authorization.ew.r.appspot.com'

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
    if (test){ //se me apagas isto outra vez vou ai ao barreiro partir-te os cornos
        HOME_PATH=`http://localhost:8082`;
    }
    return {
        login: async (user, pass) => makeRequest(users.LOCAL_LOGIN_PATH, { username: user, password: pass }, 'POST'),

        logout: async (redirect) => makeRequest(users.LOGOUT_PATH, {}, 'POST')
    }
}

export function protocolService(test) {
    if (test){ //se me apagas isto outra vez vou ai ao barreiro partir-te os cornos
        HOME_PATH=`http://localhost:8082`;
    }
    return {
        changeActive: async (protocolName, active) => makeRequest(protocols.ACTIVATE_PATH, { protocol: protocolName, active: active }, 'PUT'),
        getPossibleAuthTypes: async () =>  getRequest(protocols.PROTOCOLS_PATH)
     
    }
}

export function userService(test) {
    if (test){ //se me apagas isto outra vez vou ai ao barreiro partir-te os cornos
        HOME_PATH=`http://localhost:8082`;
    }
    return {
        getAuthenticatedUser: async () => getRequest(users.GET_AUTHENTICATED_USER_PATH),
        getUser: async (name) => getRequest(users.SPECIFIC_USER_PATH_BY_USERNAME(name)),
        getUserById: async (id) => getRequest(users.SPECIFIC_USER_PATH(id)),
        get: async () => getRequest(users.USER_PATH),
        getUserSessions: async (id) => getRequest(users.SESSION_PATH(id)),
        getUserLists: async (id) => getRequest(users.LIST_PATH(id)),
        getUserHistory: async (id) => getRequest(users.HISTORY_PATH(id)),
        getAuthenticatedUserPermissions: async () => getRequest(users.CURRENT_USER_PERMISSIONS_PATH),
        post: async (arr) => makeRequest(users.USER_PATH, { username: arr[0], password: arr[1] }, 'POST'),
        editUsername: async (arr) => makeRequest(users.USERNAME_UPDATE_PATH(arr[0]), { username: arr[1] }, 'PUT'),
        destroy: async (arr) => {
            makeRequest(users.SPECIFIC_USER_PATH(arr[0]), {}, 'DELETE')
        }
    }
}



export function listService(test) {
    if (test){ //se me apagas isto outra vez vou ai ao barreiro partir-te os cornos
        HOME_PATH=`http://localhost:8082`;
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
        getUserLists: async (id) => getRequest(lists.USERS_LISTS_PATH(id)),
        getUsersInThisList: async (id) => getRequest(lists.SPECIFIC_LIST_PATH(id) + "/users")
    }
}

export function rolesService(test) {
    if (test){ //se me apagas isto outra vez vou ai ao barreiro partir-te os cornos
        HOME_PATH=`http://localhost:8082`;
    }
    return {
        getRoles: async () => getRequest(roles.ROLE_PATH),
        getRole: async (id) => getRequest(roles.SPECIFIC_ROLE_PATH(id)),
        getUsersWithThisRole: async (id) => getRequest(roles.ROLE_USERS_PATH(id)),
        getPermissionsWithThisRole: async (id) => getRequest(roles.ROLES_PERMISSION_PATH(id)),
        addRole: async (arr) => makeRequest(roles.ROLE_PATH, { role: arr[1], parent_role: arr[2]===''?null:arr[2] }, 'POST').then(vals=>vals[0]),
        editRole: async (arr) => makeRequest(roles.SPECIFIC_ROLE_PATH(arr[0]), { role: arr[1], parent_role: arr[2] }, 'PUT'),
        deleteRole: async (id) => makeRequest(roles.SPECIFIC_ROLE_PATH(id), {}, 'DELETE')

    }
}

export function permissionService() {
    return {
        getPermissions: async () => getRequest(permissions.PERMISSION_PATH),
        getPermission: async (id) => getRequest(permissions.SPECIFIC_PERMISSION_PATH(id)),
        addPermission: async (arr) => makeRequest(permissions.PERMISSION_PATH, { action: arr[1], resource: arr[2] }, 'POST').then(array=>array[0]),
        editPermission: async (arr) => makeRequest(permissions.SPECIFIC_PERMISSION_PATH(arr[0]), { action: arr[1], resource: arr[2] }, 'PUT'),
        deletePermission: async (arr) => makeRequest(permissions.SPECIFIC_PERMISSION_PATH(arr[0]), {}, 'DELETE'),
        getRolesWithThisPermission: async (id) => getRequest(permissions.SPECIFIC_PERMISSION_PATH(id) + '/roles')
    }
}

export function userRoleService() {
    return {
        getUsersActiveRoles: async (id) => getRequest(users_roles.USERS_ACTIVE_ROLES_PATH(id)),
        getUsersRoles: async (id) => getRequest(users.ROLES_PATH(id)),
        addUserRole: async (userid, roleid, updater,start_date) => makeRequest(users_roles.USERS_ROLES_PATH, { user: userid, role: roleid, active: 1, updater: updater,start_date:start_date }, 'POST')
            .then(async data=>{
                let res={start_date:data.start_date,end_date:'',active:data.active?1:0,updater:data.updater};
                res['Role.id'] = data.RoleId;
                res['Role.role'] = await rolesService().getRole(data.RoleId).then(role=>role.role);
                return res;
            }),
        deactivateUserRole: async (userid, roleid) => makeRequest(users_roles.USERS_ROLES_PATH, { user: userid, role: roleid, active: 0 }, 'PUT'),
        deleteUserRole: async (userId, RoleId) => makeRequest(users_roles.USERS_ROLES_PATH, { user: userId, role: RoleId }, 'DELETE'),
        editUserRole: async(userId,roleId,date,active)=>makeRequest(users_roles.USERS_ROLES_PATH,{ user: userId, role: roleId,end_date:new Date(date.date + 'T'+date.time), active: active },'PUT')
    }
}

export function sessionService(test) {
    if (test){ //se me apagas isto outra vez vou ai ao barreiro partir-te os cornos
        HOME_PATH=`http://localhost:8082`;
    }
    return {
        getSessions: async () => getRequest(sessions.SESSION_PATH),
        getSession: async (id) => getRequest(sessions.SPECIFIC_SESSION_PATH(id)),
        deleteSession: async (id) => makeRequest(sessions.SESSION_PATH, { sid: id }, 'DELETE'),
        editSession: async (date, sid) => makeRequest(sessions.SPECIFIC_SESSION_PATH(sid), { sid: sid, date:new Date(date.date + 'T'+date.time) }, 'PUT')
    }
}

export function rolePermissionService() {
    return {
        addRolePermission: async (roleId, permissionId) => makeRequest(roles_permissions.ROLES_PERMISSION_PATH, { permissionId: permissionId, roleId: roleId }, 'POST')
            .then(data=>permissionService().getPermission(data[0].PermissionId)).then(permission=>{
                let result ={PermissionId: permission.id};
                result['Permission.action']=permission.action;
                result['Permission.resource']=permission.resource;
                return result;
            }),
        deleteRolePermission: async (roleId, permissionId) => makeRequest(roles_permissions.ROLES_PERMISSION_PATH, { permissionId: permissionId, roleId: roleId }, 'DELETE')
    }
}

export function userListService() {
    return {
        addUserList: async (listId, userId, updater,start_date) => makeRequest(users_lists.USERS_LIST_PATH, { ListId: listId, UserId: userId, active: 1,start_date:start_date, updater: updater }, 'POST'),
        deactivateList: async (listId, userId) => makeRequest(users_lists.USERS_LIST_PATH, { active: 0 }, 'PUT'),
        deleteUserList: async (listId, userId) => makeRequest(users_lists.USERS_LIST_PATH, { ListId: listId, UserId: userId }, 'DELETE'),
        editUserList: async(userId,listId,date,active)=>makeRequest(users_lists.USERS_LIST_PATH,{ user: userId, list: listId,end_date:new Date(date.date + 'T'+date.time), active: active },'PUT')
    }
}

export function historyService(test) {
    if (test){ //se me apagas isto outra vez vou ai ao barreiro partir-te os cornos
                //aia cum crl calma matias
        HOME_PATH=`http://localhost:8082`;
    }
    return {
        getUserHistory: async (userId) => getRequest(users.HISTORY_PATH(userId))
    }
}


export function configService() {
    return {
        changeDatabaseOptions: async (database_opts) => makeRequest(configs.DATABASE_CONFIG_PATH, { database_opts: database_opts }, 'POST'),
        changeDatabaseType: async (dbType) => makeRequest(configs.DATABASE_CONFIG_PATH, { type: dbType }, 'PUT'),
        changeGoogleAuthenticationOptions: async (google_opts) => makeRequest(configs.GOOGLE_CONFIG_PATH, { google_opts: google_opts }, 'PUT'), //recebe os mesmos parametros que estao no config file NOTA: esses mesmos parametros devem vir tb no getAuthTypesInfo do authService
        changeAzureADAuthenticationOptions: async (azure_opts) => makeRequest(configs.AZUREAD_CONFIG_PATH, { azure_opts: azure_opts }, 'PUT'),
        changeSamlAuthenticationOptions: async (saml_opts) => makeRequest(configs.SAML_CONFIG_PATH, { saml_opts: saml_opts }, 'PUT'), //recebe os mesmos parametros que estao no config file NOTA: esses mesmos parametros devem vir tb no getAuthTypesInfo do authService
        getGoogleOptions:async()=>getRequest(configs.GOOGLE_CONFIG_PATH+'/options'),
        getAzureOptions:async()=>getRequest(configs.AZUREAD_CONFIG_PATH+'/options'),
        getSamlOptions:async()=>getRequest(configs.SAML_CONFIG_PATH+'/options'),
        getOptions:async(protocol)=>getRequest(configs.SPECIFIC_PATH(protocol)+'/options')
    }
}




