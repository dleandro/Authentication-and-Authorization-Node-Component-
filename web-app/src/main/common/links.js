// This file returns a json variable containing all enpoints in URI formats to facilitate uri management


const
    USER_PATH = "/api/users",
    LIST_PATH = "/api/lists",
    PERMISSION_PATH = "/api/permissions",
    ROLE_PATH = "/api/roles",
    USERS_ROLES_PATH = "/api/users-roles",
    USER_HITORY_PATH = "/api/users-history",
    ROLES_PERMISSION_PATH = "/api/roles-permissions",
    AUTHENTICATION_PATH = "/api/authentications",
    CONFIG_PATH = "/api/configs",
    SESSION_PATH = "/api/sessions",
    PROTOCOLS_PATH = "/api/protocols",
    USERS_LIST_PATH = "/api/users-lists",
    HISTORY_PATH = "/api/users-history"

console.log(process.env.REACT_APP_WEB_API_PORT)

const WEB_API_HOME_PATH = process.env.REACT_APP_WEB_API_PORT ? `http://localhost:${process.env.REACT_APP_WEB_API_PORT}` : 'https://webapi-dot-auth-authorization.ew.r.appspot.com';
const WEB_APP_HOME_PATH = process.env.REACT_APP_WEB_APP_PORT ? `http://localhost:${process.env.REACT_APP_WEB_APP_PORT}` : 'https://webapp-dot-auth-authorization.ew.r.appspot.com';

export const webApiLinks =
{
    WEB_API_HOME_PATH,
    users: {
        USER_PATH,
        USERNAME_UPDATE_PATH: userId => `${USER_PATH}/${userId}/username`,
        PASSWORD_UPDATE_PATH: userId => `${USER_PATH}/${userId}/password`,
        SPECIFIC_USER_PATH: userId => `${USER_PATH}/${userId}`,
        SPECIFIC_USER_PATH_BY_USERNAME: name => `${USER_PATH}/byUsername/${name}`,
        AUTHENTICATION_PATH,
        GOOGLE_LOGIN_PATH: `${AUTHENTICATION_PATH}/google`,
        SAML_LOGIN_PATH: `${AUTHENTICATION_PATH}/saml`,
        AZUREAD_LOGIN_PATH: `${AUTHENTICATION_PATH}/azureAD`,
        LOCAL_LOGIN_PATH: `${AUTHENTICATION_PATH}/local`,
        LOGOUT_PATH: `${AUTHENTICATION_PATH}/logout`,
        GET_AUTHENTICATED_USER_PATH: `${AUTHENTICATION_PATH}/authenticated-user`,
        ROLES_PATH: id => `${USER_PATH}/${id}/roles`,
        LIST_PATH: id => `${USER_PATH}/${id}/lists`,
        HISTORY_PATH: id => `${USER_PATH}/${id}/history`,
        SESSION_PATH: id => `${USER_PATH}/${id}/sessions`,
        CURRENT_USER_PERMISSIONS_PATH: `${USER_PATH}/CurrentUser/permissions`
    },

    roles: {
        ROLE_PATH,
        SPECIFIC_ROLE_PATH: roleId => `${ROLE_PATH}/${roleId}`,
        ROLE_USERS_PATH: roleId => `${ROLE_PATH}/${roleId}/users`,
        ROLES_PERMISSION_PATH: roleId => `${ROLE_PATH}/${roleId}/permissions`
    },

    permissions: {
        PERMISSION_PATH,
        SPECIFIC_PERMISSION_PATH: permissionId => `${PERMISSION_PATH}/${permissionId}`,
        PERMISSION_ROLES_PATH: permissionId => `${PERMISSION_PATH}/${permissionId}/roles`
    },

    users_history: {
        USER_HITORY_PATH,
        SPECIFIC_USER_HISTORY_PATH: userId => `${USER_HITORY_PATH}/${userId}`
    },

    users_roles: {
        USERS_ROLES_PATH,
        ACTIVE_USERS_ROLES_PATH: `${USERS_ROLES_PATH}/active`,
        USERS_ACTIVE_ROLES_PATH: userId => `${USERS_ROLES_PATH}/active/user/${userId}`,
        USER_ROLES_DEACTIVATION_PATH: userRoleId => `${USERS_ROLES_PATH}/deactivate/${userRoleId}`
    },

    users_lists: {
        USERS_LIST_PATH
    },

    lists: {
        LIST_PATH,
        SPECIFIC_LIST_PATH: listId => `${LIST_PATH}/${listId}`,
        ACTIVE_LISTS_PATH: `${LIST_PATH}/active`,
        USERS_LISTS_PATH: userId => `${LIST_PATH}/user/${userId}`,
        LIST_DEACTIVATION_PATH: listId => `${LIST_PATH}/deactivate/${listId}`
    },

    roles_permissions: {
        ROLES_PERMISSION_PATH
    },

    configs: {
        CONFIG_PATH,
        GOOGLE_CONFIG_PATH: `${CONFIG_PATH}/google`,
        AZUREAD_CONFIG_PATH: `${CONFIG_PATH}/azureAD`,
        DATABASE_CONFIG_PATH: `${CONFIG_PATH}/database`,
        SAML_CONFIG_PATH: `${CONFIG_PATH}/Saml`,
        SPECIFIC_PATH: protocol => `${CONFIG_PATH}/${protocol}`,
        RBAC_OPTS_PATH: `${CONFIG_PATH}/rbac-opts`
    },

    protocols: {
        PROTOCOLS_PATH,
        ACTIVATE_PATH: `${PROTOCOLS_PATH}/active`,
    },
    sessions: {
        SESSION_PATH,
        SPECIFIC_SESSION_PATH: id => `${SESSION_PATH}/${id}`
    },
    history: {
        HISTORY_PATH
    }
}

export const webAppLinks = {

    WEB_APP_HOME_PATH,

    USER_PROFILE_PATH: `/${WEB_APP_HOME_PATH}/user/profile`

}