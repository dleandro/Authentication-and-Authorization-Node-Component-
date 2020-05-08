var {users,roles,permissions,users_history,users_roles,lists,roles_permissions,configs} = require('../links')

const HOMEPAGE = "http://localhost:8082";

let handleResponse = (resp) => resp.headers.get("content-type").includes("application/json")?resp.json():resp.text()
let getRequest = async (url) => await fetch(HOMEPAGE+url,{credentials:"include"})
    .then(resp=> handleResponse(resp))
let makeRequest =  (url,body,met) => fetch(HOMEPAGE+url, {credentials:"include",method: met, headers: { "Content-Type": "application/json"}, body: JSON.stringify(body),json:true})
    .then(resp=>handleResponse(resp))

/**
 * Function used to make login logout
 */
export function authenticationService() {
    return {
        login: async (user,pass) => await makeRequest(users.LOCAL_LOGIN_PATH,{username: user, password: pass},'POST'),

        logout: async (redirect)=> makeRequest(users.LOGOUT_PATH,{},'POST')
                .then(json=>console.log(json))
                .then(resp=>{redirect()})
    }
}

export function userService() {
    return {
        getUser: async(id) =>await getRequest(users.USER_PATH + id),
        getUsers: async () =>await getRequest(users.USER_PATH),
        addUser: async (arr) => await makeRequest(users.USER_PATH,{username: arr[1], password: arr[2]},'POST'),
        editUsername: async (arr)=> makeRequest(users.USERNAME_UPDATE_PATH(arr[0]),{username: arr[1]},'PUT'),
        deleteUser:async(arr)=>{
            makeRequest(users.SPECIFIC_USER_PATH(arr[0]),'','DELETE')}
    }
}

export function listService() {
    return {
        getLists: async () =>await getRequest(lists.LIST_PATH),
        getActiveLists:async()=>await getRequest(lists.ACTIVE_LISTS_PATH)
       //TODO: ,addList: async (arr) => await makeRequest(USER_ROUTER,{username: arr[1], password: arr[2]},'POST'),
        //TODO: editList: async (arr)=> makeRequest(UPDATE_USERNAME(arr[0]),{username: arr[1]},'PUT')
    }
}

export function rolesService() {
    return {
        getRoles: async () =>await getRequest(roles.ROLE_PATH)
        //TODO: ,addList: async (arr) => await makeRequest(USER_ROUTER,{username: arr[1], password: arr[2]},'POST'),
        //TODO: editList: async (arr)=> makeRequest(UPDATE_USERNAME(arr[0]),{username: arr[1]},'PUT')
    }
}

    export function permissionService() {
        return {
            getPermissions: async () =>await getRequest(permissions.PERMISSION_PATH)
            //TODO: ,addList: async (arr) => await makeRequest(USER_ROUTER,{username: arr[1], password: arr[2]},'POST'),
            //TODO: editList: async (arr)=> makeRequest(UPDATE_USERNAME(arr[0]),{username: arr[1]},'PUT')
        }
}


