var {users, roles, permissions, users_history, users_roles, lists, roles_permissions, configs,protocols,userRoles} = require('../links')

const HOMEPAGE = "http://localhost:8082";
const DEFAULT_OPTIONS = (met)=> {return {method: met, credentials: "include",headers: {'Content-Type': "application/json"}}}
function produceInit(body, met){
    return {...DEFAULT_OPTIONS(met), body: JSON.stringify(body), json: true}
}
 function handleResponse(resp) {
    if (resp.ok) {
        return  resp.json()
    }
    throw new Error('Network response was not ok');
}


const request = (url,init) => fetch(url,init).then(resp=>handleResponse(resp)).catch(err => {console.error(`failed to fetch: ${init.method} ${url}`);return [err]})

const getRequest = (url) => request(HOMEPAGE + url,DEFAULT_OPTIONS('GET'))
const makeRequest = (url, body, met) => request(HOMEPAGE + url,produceInit(body,met))


/**
 * Function used to make login logout
 */
export function authenticationService() {
    return {
        login: async (user, pass) => makeRequest(users.LOCAL_LOGIN_PATH, {username: user, password: pass}, 'POST'),

        logout: async (redirect) => makeRequest(users.LOGOUT_PATH, {}, 'POST')
            .then(json => console.log(json))
            .then(resp => {
                redirect()
            })
    }
}

export function protocolService() {
    return {
        changeActive: async (protocolName,active) => makeRequest(protocols.ACTIVATE_PATH, {protocol:protocolName,active:active}, 'PUT'),
    }
}

export function userService() {
    return {
        getUser: async (name) => getRequest(users.SPECIFIC_USER_PATH_BY_USERNAME(name)),
        getUserById:async(id)=>getRequest(users.SPECIFIC_USER_PATH(id)),
        getUsers: async () => getRequest(users.USER_PATH),
        getUserRoles:async(id)=>getRequest(users.ROLES_PATH(id)),
        addUser: async (arr) => makeRequest(users.USER_PATH, {username: arr[0], password: arr[1]}, 'POST'),
        editUsername: async (arr) => makeRequest(users.USERNAME_UPDATE_PATH(arr[0]), {username: arr[1]}, 'PUT'),
        deleteUser: async (arr) => {
            makeRequest(users.SPECIFIC_USER_PATH(arr[0]), '', 'DELETE')
        }
    }
}

export function listService() {
    return {
        getLists: async () => getRequest(lists.LIST_PATH),
        getList:async (id)=> getRequest(lists.SPECIFIC_LIST_PATH(id)),
        addList: async (arr) => makeRequest(lists.LIST_PATH, {
            user: arr[0],
            list: [2],
            start_date: arr[3],
            end_date: arr[4],
            updater: arr[5],
            active: arr[6]
        }, 'POST'),
        deactivateList: async (id) => makeRequest(lists.LIST_DEACTIVATION_PATH(id), {}, 'PUT'),
        deleteList: async (id) => makeRequest(lists.SPECIFIC_LIST_PATH(id), {}, 'DELETE'),
        getActiveLists: async () => getRequest(lists.ACTIVE_LISTS_PATH),
        getUserActiveLists: async (id) => getRequest(lists.USERS_ACTIVE_LISTS_PATH(id))
    }
}

export function rolesService() {
    return {
        getRoles: async () => getRequest(roles.ROLE_PATH),
        getRole: async(id) => getRequest(roles.SPECIFIC_ROLE_PATH(id)),
        getUsersWithThisRole: async (id)=>getRequest(roles.ROLE_USERS_PATH(id))
    }
}

export function permissionService() {
    return {
        getPermissions: async () => getRequest(permissions.PERMISSION_PATH),
        getPermission:async(id)=>getRequest(permissions.SPECIFIC_PERMISSION_PATH(id)),
        getUserPermission: async (userId) => {console.log('getUserPermission needs to be done'); return {action:'mock',resource:'all'} }

    }
}

    export function userRoleService(){
        return{
            getUserRoles:async(id)=>getRequest(users_roles.USERS_ACTIVE_ROLES_PATH(id))
        }
    }


