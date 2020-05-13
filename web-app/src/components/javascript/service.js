var {users,roles,permissions,users_history,users_roles,lists,roles_permissions,configs} = require('../links')

const HOMEPAGE = "http://localhost:8082";

const handleResponse = (resp) => resp.headers.get("content-type").includes("application/json")?resp.json():resp.text()
const getRequest = async (url) => fetch(HOMEPAGE+url,{method:"GET",credentials:"include"})
    .then(resp=> handleResponse(resp))
    .catch(err=>{
        console.log(`failed to fetch: GET ${url}`);
        return [err]})
const makeRequest =  (url,body,met) => fetch(HOMEPAGE+url,
    {
        credentials:"include",
        method: met,
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify(body),
        json:true})
    .then(resp=>handleResponse(resp)).catch(err=>console.log(`failed to fetch: ${met} ${url}`))

/**
 * Function used to make login logout
 */
export function authenticationService() {
    return {
        login: async (user,pass) => makeRequest(users.LOCAL_LOGIN_PATH,{username: user, password: pass},'POST'),

        logout: async (redirect)=> makeRequest(users.LOGOUT_PATH,{},'POST')
            .then(json=>console.log(json))
            .then(resp=>{redirect()})
    }
}

export function userService() {
    return {
        getUser: async(id) =>getRequest(users.USER_PATH + id),
        getUsers: async () =>getRequest(users.USER_PATH),
        addUser: async (arr) => makeRequest(users.USER_PATH,{username: arr[1], password: arr[2]},'POST'),
        editUsername: async (arr)=> makeRequest(users.USERNAME_UPDATE_PATH(arr[0]),{username: arr[1]},'PUT'),
        deleteUser:async(arr)=>{
            makeRequest(users.SPECIFIC_USER_PATH(arr[0]),'','DELETE')}
    }
}

export function listService() {
    return {
        getLists: async () =>getRequest(lists.LIST_PATH)
            .then(v=>{
                console.log(v);
                return v}),
        addList: async (arr)=>makeRequest(lists.LIST_PATH,{user:arr[0], list:[2], start_date:arr[3], end_date:arr[4], updater:arr[5], active:arr[6]},'POST'),
        deactivateList: async (id)=>  makeRequest(lists.LIST_DEACTIVATION_PATH(id),{},'PUT'),
        deleteList: async (id) => makeRequest(lists.SPECIFIC_LIST_PATH(id),{},'DELETE'),
        getActiveLists:async()=>getRequest(lists.ACTIVE_LISTS_PATH)
    }
}

export function rolesService() {
    return {
        getRoles: async () =>getRequest(roles.ROLE_PATH)
    }
}

export function permissionService() {
    return {
        getPermissions: async () =>getRequest(permissions.PERMISSION_PATH)

    }
}


