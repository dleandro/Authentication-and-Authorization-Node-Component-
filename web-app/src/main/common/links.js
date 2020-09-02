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
    AUTH_TYPES_PATH = "/api/auth-types",
    USERS_LIST_PATH = "/api/users-lists",
    HISTORY_PATH = "/api/users-history",
    PROFILE_PATH= "/api/profile"

const WEB_API_HOME_PATH = process.env.REACT_APP_ENV === 'production' ? process.env.REACT_APP_DEPLOYED_WEB_API_HOME_PATH : process.env.REACT_APP_LOCAL_WEB_API_HOME_PATH

export const webApiLinks =
{
    WEB_API_HOME_PATH,
    profile:{
        PASSWORD_UPDATE_PATH:`${PROFILE_PATH}/password`,
        SESSION_PATH:`${PROFILE_PATH}/sessions`
    },
    users: {
        USER_PATH,
        ROLES_PATH:`${AUTHENTICATION_PATH}/authenticated-user-roles`,
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
        LIST_PATH: id => `${USER_PATH}/${id}/lists`,
        HISTORY_PATH: id => `${USER_PATH}/${id}/history`,
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
        BY_USER: userId=>`${USERS_ROLES_PATH}/users/${userId}`,
        BY_ROLE: roleId=>`${USERS_ROLES_PATH}/roles/${roleId}`,
        ACTIVE_USERS_ROLES_PATH: `${USERS_ROLES_PATH}/active`,
        USERS_ACTIVE_ROLES_PATH: userId => `${USERS_ROLES_PATH}/active/user/${userId}`,
        USER_ROLES_ACTIVE_FLAG_PATH: (userId, roleId) => `${USERS_ROLES_PATH}/users/${userId}/roles/${roleId}/active`
    },

    users_lists: {
        USERS_LIST_PATH,
        BY_USER: userId=>`${USERS_LIST_PATH}/users/${userId}`,
        BY_LIST: listId=>`${USERS_LIST_PATH}/lists/${listId}`,
        USER_LISTS_ACTIVE_FLAG_PATH: (userId, listId) => `${USERS_LIST_PATH}/users/${userId}/lists/${listId}/active`
    },

    lists: {
        LIST_PATH,
        SPECIFIC_LIST_PATH: listId => `${LIST_PATH}/${listId}`,
        ACTIVE_LISTS_PATH: `${LIST_PATH}/active`,
        LIST_DEACTIVATION_PATH: listId => `${LIST_PATH}/deactivate/${listId}`
    },

    roles_permissions: {
        ROLES_PERMISSION_PATH,
        BY_ROLE: roleId=>`${ROLES_PERMISSION_PATH}/roles/${roleId}`,
        BY_PERMISSION : permissionId=>`${ROLES_PERMISSION_PATH}/permissions/${permissionId}`,
    },

    configs: {
        CONFIG_PATH,
        GOOGLE_CONFIG_PATH: `${CONFIG_PATH}/oauth2/google`,
        AZUREAD_CONFIG_PATH: `${CONFIG_PATH}/oauth2/office365`,
        DATABASE_CONFIG_PATH: `${CONFIG_PATH}/database`,
        SAML_CONFIG_PATH: `${CONFIG_PATH}/saml/office365`,
        SPECIFIC_PATH: (protocol, idp) => `${CONFIG_PATH}/${protocol}/${idp}`,
        RBAC_OPTS_PATH: `${CONFIG_PATH}/rbac-opts`
    },

    auth_types: {
        AUTH_TYPES_PATH,
        ACTIVATE_PATH: `${AUTH_TYPES_PATH}/active`,
    },
    sessions: {
        SESSION_PATH,
        USER_SESSIONS_PATH: id => `${SESSION_PATH}/${id}`
    },
    history: {
        HISTORY_PATH,
        USER_HITORY_PATH: userId=> `${HISTORY_PATH}/${userId}`
    }
}