import {listService, permissionService, rolesService, userService} from "./basicServices";

var { users_lists, sessions, users_roles, roles_permissions, history, WEB_API_HOME_PATH } = require('../links').webApiLinks;
const {makeRequest,getRequest} =require('../Requests').requests;
const dateify = date => new Date(`${date.date}T${date.time}`);


const arrayToObject = (valuesArr, fieldsArr) => {
    let obj = {};
    fieldsArr.forEach((field, idx) => obj[field] = valuesArr[idx]);
    return obj;
}

const userRolePost = (user, role, updater, start_date, end_datetime) => makeRequest(users_roles.USERS_ROLES_PATH,
    { user, role, updater, start_date, active: true, end_date: dateify(end_datetime) }, 'POST')
    
    
const userRolePut = (user, start_date, role, updater, arr) => makeRequest(users_roles.USERS_ROLES_PATH,
    {user, start_date, role, updater, end_date: dateify(arr[0]), active: arr[1] }, 'PUT')

const userRoleDestroy = (user,role)=> makeRequest(users_roles.USERS_ROLES_PATH, { user,role }, 'DELETE');

export function userRoleService() {
    const postOptionsFetcher = () => rolesService().get().then(data =>data.map(value => ({ eventKey: value.id, text: value.role })));

    return {
        editFields: [{ text: 'New Date (date)' }, { text: 'New Active state (check)' }],
        postFields: [{ text: 'Id of Role to be assigned (dropdown)', DropdownOptionsFetcher: postOptionsFetcher }, { text: 'New End Date (date)'}],
        get: userId => getRequest(users_roles.BY_USER(userId))
            .then(results => results.map(({RoleId, active, end_date, role, start_date, updater}) => ({
                RoleId,
                role,
                start_date: `${new Date(start_date)}`,
                end_date: end_date ? `${new Date(end_date)}` : undefined,
                active:active==true?'true':'false',
                updater,
            }))),
        post: (arr,userId,updtr)=> userRolePost(userId,arr[0].value,updtr,new Date(),arr[1])
            .then(({RoleId,start_date,end_date,active,updater} )=>({
                RoleId,
                role:arr[0].label,
                start_date:`${new Date(start_date)}`,
                end_date: end_date ? `${new Date(end_date)}` : undefined,
                active:active.toString(),
                updater
        })),
        update: (oldObj,newVals,userId,updtr)=>userRolePut(userId,oldObj.start_date,oldObj.RoleId,updtr,newVals)
            .then(({RoleId,start_date,end_date,active,updater} )=>({
                RoleId,
                role:oldObj.role,
                start_date,
                end_date: end_date ? `${new Date(end_date)}` : undefined,
                active:active.toString(),
                updater
        })),
        destroy: (oldObj,UserId) => userRoleDestroy(UserId,oldObj.RoleId),
        getUsersActiveRoles: async (id) => getRequest(users_roles.USERS_ACTIVE_ROLES_PATH(id)),
        deactivateUserRole: async (userid, roleid) => makeRequest(users_roles.USERS_ROLES_PATH, { user: userid, role: roleid, active: false }, 'PUT')
    }
}

export function roleUserService() {
    const postOptionsFetcher = () => userService().get().then(data => data.map(value => ({ eventKey: value.id, text: value.username })));

    return {
        editFields: [{ text: 'New End date (date)' }, { text: 'New Active (check)' }],
        postFields: [{ text: 'Id of User to be assigned (dropdown)', DropdownOptionsFetcher: postOptionsFetcher }, { text: 'New End Date (date)'}],
        get: roleId => getRequest(users_roles.BY_ROLE(roleId))
            .then(results => results.map(result => ({
                UserId: result.UserId,
                username: result['User.username'],
                start_date: `${new Date(result.start_date)}`,
                end_date: result.end_date ? `${new Date(result.end_date)}` : undefined,
                active: result.active==true?'true':'false',
                updater: result.updater}))),
        post: (arr, role, updtr) => userRolePost(arr[0].value, role, updtr, new Date(), arr[1])
            .then(({UserId,start_date,end_date,active,updater} )=>({
            UserId,
            username:arr[0].label,
            start_date:`${new Date(start_date)}`,
            end_date: end_date ? `${new Date(end_date)}` : undefined,
            active:active.toString(),
            updater
    })),
        update: (oldObj, arr, role, updtr) => userRolePut(oldObj.UserId, oldObj.start_date, role, updtr, arr)
        .then(({UserId,start_date,end_date,active,updater} )=>({
            UserId,
            username:oldObj.username,
            start_date,
            end_date: end_date ? `${new Date(end_date)}` : undefined,
            active:active.toString(),
            updater
    })),
        destroy: (oldObj, role) => userRoleDestroy(oldObj.UserId,role)
    }
}

export function UsersessionService(test) {
    if (test) {
        WEB_API_HOME_PATH = `http://localhost:8082`;
    }
    return {
        get: async (id) => getRequest(sessions.USER_SESSIONS_PATH(id))
            .then(results => results.map(({createdAt, expires, sid}) =>
                ({sid, start_date: `${new Date(createdAt)}`, end_date: `${new Date(expires)}`,}))),
        update: async (oldObject, arr) => makeRequest(sessions.SPECIFIC_SESSION_PATH(oldObject.sid), { sid: oldObject.sid, date: new Date(arr[0].date + 'T' + arr[0].time) }, 'PUT'),
        destroy: async (oldObject) => makeRequest(sessions.SESSION_PATH, { sid: oldObject.sid }, 'DELETE'),
        getSession: async (id) => getRequest(sessions.SPECIFIC_SESSION_PATH(id))
    }
}

// TODO: UserSessions
//TODO: User Permissions
export function rolePermissionService() {
    const postOptionsFetcher = () => permissionService().get().then(data => data.map(value => ({ eventKey: value.id, text: `${value.action} ${value.resource}`})));

    return {
        //TODO: get returns object with fields PermissionId and Permission.id chose one and change destroy/update according to the chosen one
        postFields: [{ text: 'Id of Permission to be assigned (dropdown)', DropdownOptionsFetcher: postOptionsFetcher }],
        get: async (id) => getRequest(roles_permissions.BY_ROLE(id))
        .then(results => results.map(result => ({
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
    const postOptionsFetcher = () => rolesService().get().then(data => data.map(value => ({ eventKey: value.id, text: value.role })));

    return {
        postFields: [{ text: 'Id of Role to be assigned (dropdown)', DropdownOptionsFetcher: postOptionsFetcher }],
        get: id => getRequest(roles_permissions.BY_PERMISSION(id))
            .then(results => results.map(result => ({RoleId: result.RoleId, role: result['Role.role']}))),
        post: (arr,permissionId) => makeRequest(roles_permissions.ROLES_PERMISSION_PATH, {permissionId, roleId: arr[0].value }, 'POST')
            .then(({RoleId}) => ({RoleId, role: arr[0].label})),
        destroy: (oldObj,permissionId)=>makeRequest(roles_permissions.ROLES_PERMISSION_PATH, { permissionId: permissionId, roleId: oldObj.RoleId }, 'DELETE')
    }
}

const userListPost = ([ListId, UserId, start_date, datetime, updater]) => makeRequest(users_lists.USERS_LIST_PATH,
    { ListId, UserId, start_date, updater, active: true,  end_date: dateify(datetime) }, 'POST')


const userListPut = (user, start_date, list, updater, arr) => makeRequest(users_lists.USERS_LIST_PATH,
    { user, start_date, updater, list, end_date: dateify(arr[0]), active: arr[1] }, 'PUT')

const userListDestroy = (ListId,UserId)=> makeRequest(users_lists.USERS_LIST_PATH, {ListId, UserId}, 'DELETE');

export function userListService() {
    const postOptionsFetcher = () => listService().get().then(data => data.map(value => ({ eventKey: value.id, text: value.list })));

    return {
        //TODO: get not working, problem in api
        editFields: [{ text: 'New End date (date)' }, { text: 'New Active state (check)' }],
        postFields: [{ text: 'Id of List to be assigned (dropdown)', DropdownOptionsFetcher: postOptionsFetcher }, { text: 'New Date (date)'}],
        get: id => getRequest(users_lists.BY_USER(id))
        .then(results => results.map(result => ({
            ListId: result.ListId,
            list: result['List.list'],
            start_date: `${new Date(result.start_date)}`,
            end_date: result.end_date ? `${new Date(result.end_date)}` : undefined,
            active: result.active==true?'true':'false',
            updater: result.updater,
        }))),

        post: (newVals,userId,updtr)=>userListPost([newVals[0].value, userId, new Date(), newVals[1], updtr])
        .then(({ListId,start_date,end_date,active,updater})=>({
            ListId,
            list: newVals[0].label,
            start_date:`${new Date(start_date)}`,
            end_date: end_date ? `${new Date(end_date)}` : undefined,
            active:active.toString(),
            updater
        })),

        update: (oldObj,newVals,userId,updtr)=>userListPut(userId,oldObj.start_date, oldObj.ListId,updtr,newVals)
        .then(({ListId,start_date,end_date,active,updater})=>({
            ListId,
            list: oldObj.list,
            start_date,
            end_date: end_date ? `${new Date(end_date)}` : undefined,
            active:active.toString(),
            updater
        })),

        destroy: (oldObj, UserId) =>userListDestroy(oldObj.ListId,UserId)
    }
}

export function listUserService() {

    const postOptionsFetcher = () => userService().get().then(data => data.map(value => ({ eventKey: value.id, text: value.username })));
    return {
        editFields: [{ text: 'New End date (date)' }, { text: 'New Active state (check)' }],
        postFields: [{ text: 'Id of User to be assigned (dropdown)', DropdownOptionsFetcher: postOptionsFetcher }, { text: 'New Date (date)'}],
        get: id => getRequest(users_lists.BY_LIST(id)).then(results => results.map(result => ({
            UserId: result.UserId,
            username: result['User.username'],
            start_date: `${new Date(result.start_date)}`,
            end_date: result.end_date ? `${new Date(result.end_date)}` : undefined,
            active: result.active==true?'true':'false',
            updater: result.updater,
        }))),
        post: (arr,listId,userId)=> userListPost([listId,arr[0].value,new Date(),arr[1],userId])
            .then(({UserId,start_date,end_date,active,updater})=>({
                UserId,
                username: arr[0].label,
                start_date:`${new Date(start_date)}`,
                end_date: end_date ? `${new Date(end_date)}` : undefined,
                active:active.toString(),
                updater
        })),
        update: (oldObj,arr,listId,updtr)=>userListPut(oldObj.UserId, oldObj.start_date, listId,updtr, arr)
            .then(({UserId,start_date,end_date,active,updater})=>({
                UserId,
                username: oldObj.username,
                start_date,
                end_date: end_date ? `${new Date(end_date)}` : undefined,
                active:active.toString(),
                updater
        })),
        destroy: (oldObj, ListId) => userListDestroy(ListId,oldObj.UserId),
    }
}

// TODO: USERHISTORY
export function userHistoryService() {
    return {
        get: async id => getRequest(history.USER_HITORY_PATH(id)).then(results => results.map(result => {
            delete result.user_id;
            result.date=`${new Date(result.date)}`
            return result;
        })),
    }
}