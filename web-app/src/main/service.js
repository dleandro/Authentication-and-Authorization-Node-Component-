var { users_lists, sessions, users, roles, permissions, users_roles, lists, roles_permissions, auth_types, history, configs, WEB_API_HOME_PATH } = require('./common/links').webApiLinks;
const {request,makeRequest,getRequest,DEFAULT_OPTIONS} =require('./common/Requests').requests;
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
        get: async () => getRequest(users.USER_PATH),
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
        WEB_API_HOME_PATH = `http://localhost:8080`;
    }
    return {
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
        get: async () => getRequest(permissions.PERMISSION_PATH),
        post: async (arr) => makeRequest(permissions.PERMISSION_PATH, { action: arr[0], resource: arr[1] }, 'POST'),
        update: async (oldObject, arr) => makeRequest(permissions.SPECIFIC_PERMISSION_PATH(oldObject.id), { action: arr[0], resource: arr[1] }, 'PUT'),
        destroy: async (oldObject) => makeRequest(permissions.SPECIFIC_PERMISSION_PATH(oldObject.id), {}, 'DELETE'),
        getPermission: async (id) => getRequest(permissions.SPECIFIC_PERMISSION_PATH(id))
    }
}

const userRolePost = (user, role, updater, start_date, end_datetime) => makeRequest(users_roles.USERS_ROLES_PATH, { user, role, active: 1,
    updater, start_date, end_date: dateify(end_datetime) }, 'POST');
const userRolePut = (user, start_date, role, updater, arr) => makeRequest(users_roles.USERS_ROLES_PATH,
    {user, start_date, role, updater, end_date: new Date(`${arr[0].date}T${arr[0].time}`), active: arr[1] }, 'PUT');


export function userRoleService() {
    return {
        get: userId => getRequest(users_roles.BY_USER(userId))
            .then(results => results.map(({RoleId, active, end_date, role, start_date, updater}) => ({
                RoleId, role,active,updater,
                start_date: `${new Date(start_date)}`,
                end_date: end_date ? `${new Date(end_date)}` : undefined,
            }))),
        post: (arr,userId,updtr)=> userRolePost(userId,arr[0].value,updtr,new Date(),arr[1])
            .then(({RoleId, active, end_date, start_date, updater}) => ({RoleId,updater,
                    role: arr[0].label,
                    start_date: `${new Date(start_date)}`,
                    end_date: end_date ? `${new Date(end_date)}` : undefined,
                    active: active == true ? 1 : 0,
                })
            ),
        update: (oldObj,newVals,userId,updtr)=>userRolePut(userId,oldObj.start_date,oldObj.RoleId,updtr,newVals)
            .then(result => ({
                RoleId: oldObj.RoleId,
                role: oldObj.role,
                start_date: `${new Date(oldObj.start_date)}`,
                end_date: result.end_date ? `${new Date(result.end_date)}` : undefined,
                active: result.active == true ? 1 : 0,
                updater: result.updater,
            })),
        destroy: (oldObj,UserId) => makeRequest(users_roles.USERS_ROLES_PATH, { user: UserId, role: oldObj.RoleId }, 'DELETE'),
        getUsersActiveRoles: async (id) => getRequest(users_roles.USERS_ACTIVE_ROLES_PATH(id)),
        deactivateUserRole: async (userid, roleid) => makeRequest(users_roles.USERS_ROLES_PATH, { user: userid, role: roleid, active: 0 }, 'PUT')
    }
}

export function roleUserService() {
    return {
        get: roleId => getRequest(users_roles.BY_ROLE(roleId))
            .then(results => results.map(result => ({
                UserId: result.UserId,
                username: result['User.username'],
                start_date: `${new Date(result.start_date)}`,
                end_date: result.end_date ? `${new Date(result.end_date)}` : undefined,
                active: result.active,
                updater: result.updater}))),
        post: (arr, role, updtr) => userRolePost(arr[0].value, role, updtr, new Date(), arr[1])
            .then(({UserId, active, end_date, start_date, updater}) => ({
                UserId,updater,
                username: arr[0].label,
                start_date: `${new Date(start_date)}`,
                end_date: end_date ? `${new Date(end_date)}` : undefined,
                active: active === true ? 1 : 0,
            })),
        update: (oldObj, arr, role, updtr) => userRolePut(oldObj.UserId, oldObj.start_date, role, updtr, arr)
            .then(({active, end_date, updater}) => ({
                UserId: oldObj.UserId,
                username: oldObj.username,
                start_date: `${new Date(oldObj.start_date)}`,
                end_date: end_date ? `${new Date(end_date)}` : undefined,
                active: active == true ? 1 : 0,
                updater,
            })),
        destroy: (oldObj, role) => makeRequest(users_roles.USERS_ROLES_PATH, { user: oldObj.UserId, role }, 'DELETE')
    }
}
export function UsersessionService(test) {
    if (test) {
        WEB_API_HOME_PATH = `http://localhost:8082`;
    }
    return {
        get: async (id) => getRequest(sessions.USER_SESSIONS_PATH(id))
            .then(results => results.map(({createdAt, end_date, sid}) =>
                ({sid, start_date: `${new Date(createdAt)}`, end_date: `${new Date(end_date)}`,}))),
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
        get: async (id) => getRequest(roles_permissions.BY_ROLE(id)).then(results => results.map(result => ({
            PermissionId: result.PermissionId,
            action: result['Permission.action'],
            resource: result['Permission.resource']
        }))),
        post: async (arr,roleId) => makeRequest(roles_permissions.ROLES_PERMISSION_PATH, { permissionId: arr[0].value, roleId}, 'POST')
            .then(data => permissionService().getPermission(data.PermissionId))
            .then(result => ({PermissionId: result.id, action: result.action, resource: result.resource})),
        destroy: async (oldObj,roleId) => makeRequest(roles_permissions.ROLES_PERMISSION_PATH, { permissionId: oldObj.PermissionId, roleId}, 'DELETE')
    }
}
export function permissionRoleService() {
    return {
        get: id => getRequest(roles_permissions.BY_PERMISSION(id))
            .then(results => results.map(result => ({RoleId: result.RoleId, role: result['Role.role']}))),
        post: (arr,permissionId) => makeRequest(roles_permissions.ROLES_PERMISSION_PATH, {permissionId, roleId: arr[0].value }, 'POST')
            .then(({RoleId}) => ({RoleId, role: arr[0].label})),
        destroy: (oldObj,permissionId)=>makeRequest(roles_permissions.ROLES_PERMISSION_PATH, { permissionId: permissionId, roleId: oldObj.RoleId }, 'DELETE')
    }
}

const userListPost = ([ListId, UserId, start_date, datetime, updater]) => makeRequest(users_lists.USERS_LIST_PATH,
    { ListId, UserId, start_date, updater, active: 1,  end_date: dateify(datetime) }, 'POST');
const userListPut = (user, start_date, list, updater, arr) => makeRequest(users_lists.USERS_LIST_PATH,
    { user, start_date, updater, list, end_date: dateify(arr[0]), active: arr[1] }, 'PUT');
export function userListService() {
    return {
        //TODO: get not working, problem in api
        get: id => getRequest(users_lists.BY_USER(id)).then(results => results.map(result => ({
            ListId: result.ListId,
            list: result['List.list'],
            start_date: `${new Date(result.start_date)}`,
            end_date: result.end_date ? `${new Date(result.end_date)}` : undefined,
            active: result.active,
            updater: result.updater,
        }))),
        post: (newVals,userId,updtr)=>userListPost([newVals[0].value, userId, new Date(), newVals[1], updtr])
            .then(({ListId, active, end_date, start_date, updater}) => ({
                ListId,updater,
                list: newVals[0].label,
                start_date: `${new Date(start_date)}`,
                end_date: end_date ? `${new Date(end_date)}` : undefined,
                active: active == true ? 1 : 0,
            })),
        update: (oldObj,newVals,userId,updtr)=>userListPut(userId,oldObj.start_date, oldObj.ListId,updtr,newVals)
            .then(result => ({
                ListId: oldObj.ListId,
                list: oldObj.list,
                start_date: `${new Date(oldObj.start_date)}`,
                end_date: result.end_date ? `${new Date(result.end_date)}` : undefined,
                active: result.active == true ? 1 : 0,
                updater: result.updater,
            })) ,
        destroy: (oldObj, UserId) => makeRequest(users_lists.USERS_LIST_PATH, {ListId:oldObj.ListId, UserId}, 'DELETE')
    }
}

export function listUserService() {
    return {
        get: id => getRequest(users_lists.BY_LIST(id)).then(results => results.map(result => ({
            UserId: result.UserId,
            username: result['User.username'],
            start_date: `${new Date(result.start_date)}`,
            end_date: result.end_date ? `${new Date(result.end_date)}` : undefined,
            active: result.active,
            updater: result.updater,
        }))),
        post: (arr,listId,userId)=> userListPost([listId,arr[0].value,new Date(),arr[1],userId])
            .then(({UserId, active, end_date, start_date, updater}) => ({
                    UserId,updater,
                    username: arr[0].label,
                    start_date: `${new Date(start_date)}`,
                    end_date: end_date ? `${new Date(end_date)}` : undefined,
                    active: active == true ? 1 : 0,
                })
            ),
        update: (oldObj,arr,listId,updtr)=>userListPut(oldObj.UserId, oldObj.start_date, listId,updtr, arr)
            .then(({active, end_date, updater}) => ({
                UserId: oldObj.UserId, username: oldObj.username,
                start_date: `${new Date(oldObj.start_date)}`, end_date: end_date ? `${new Date(end_date)}` : undefined,
                active: active == true ? 1 : 0, updater,
            })),
        destroy: (oldObj, ListId) => makeRequest(users_lists.USERS_LIST_PATH, {ListId, UserId:oldObj.UserId}, 'DELETE')
    }
}

// TODO: USERHISTORY
export function userHistoryService() {
    return {
        get: async id => getRequest(history.USER_HITORY_PATH(id)).then(results => results.map(result => {
            delete result.user_id;
            return result;
        })),
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