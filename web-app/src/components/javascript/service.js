const HOMEPAGE = "http://localhost:8082/api";
const LOGIN = HOMEPAGE + "/authentication/login";
const LOGOUT = HOMEPAGE + "/authentication/logout";
const USER_ROUTER = HOMEPAGE+'/user';
const UPDATE_USERNAME = (id) => `${USER_ROUTER}/${id}/username`

const fetch = require('node-fetch');
let getRequest = async (url) => {
    var data = fetch(url).then(resp=> resp.headers.get("content-type").includes("application/json")?resp.json():resp.text())
    console.log(`fetching.... GET of ${url}`)
    return await data;
}
let makeRequest = async (url,body,method) => {
    var data = fetch(url, {
        method: method,
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify(body)
    }).then(resp=> resp.headers.get("content-type").includes("application/json")?resp.json():resp.text())

    console.log(`fetching.... ${method} of ${url}`)
    return await data;
}

/**
 * Function used to make login logout
 */
export function authenticationService() {
    return {
        login: async (user,pass) => {

            return await makeRequest(LOGIN,{
                username: user,
                password: pass
            },'POST')
        },

        logout: async (redirect)=> makeRequest(LOGOUT,{},'POST')
                .then(json=>console.log(json))
                .then(resp=>{redirect()})
    }
}

/**
 * Function used to obtain a mocked version of the service associated to the temperature resource
 */
export function userService() {
    return {
        getUsers: async () =>await getRequest(USER_ROUTER),
        addUser: async (arr) => await makeRequest(USER_ROUTER,{
                username: arr[1],
                password: arr[2]
            },'POST'),

        editUsername: async (arr)=> makeRequest(UPDATE_USERNAME(arr[0]),{username: arr[1]},'PUT')
    }
}