'use strict'


// This file returns a json variable containing all enpoints in URI formats to facilitate uri management


const
    USER_PATH = "/api/users",
    LIST_PATH = "/api/lists",
    PERMISSION_PATH = "/api/permissions",
    ROLE_PATH = "/api/roles",
    USERS_ROLES_PATH = "/api/users_roles",
    USER_HITORY_PATH = "/api/users_history",
    ROLES_PERMISSION_PATH = "/api/roles_permissions",
    AUTHENTICATION_PATH = "/api/authentications",
    CONFIG_PATH = "/api/configs"

const links =
    {
        users: {
            USER_PATH,
            USERNAME_UPDATE_PATH: userId => `${USER_PATH}/${userId}/username`,
            PASSWORD_UPDATE_PATH: userId => `${USER_PATH}/${userId}/password`,
            SPECIFIC_USER_PATH: userId => `${USER_PATH}/${userId}`,
            SPECIFIC_USER_PATH_BY_USERNAME: userName => `${USER_PATH}/byUsername/${userName}`,
            GOOGLE_LOGIN_PATH: `${AUTHENTICATION_PATH}/google`,
            SAML_LOGIN_PATH: `${AUTHENTICATION_PATH}/saml`,
            AZUREAD_LOGIN_PATH: `${AUTHENTICATION_PATH}/azureAD`,
            LOCAL_LOGIN_PATH: `${AUTHENTICATION_PATH}/local`,
            LOGOUT_PATH: `${AUTHENTICATION_PATH}/logout`,
        },

        roles: {
            ROLE_PATH,
            SPECIFIC_ROLE_PATH: roleId => `${ROLE_PATH}/${roleId}`
        },

        permissions: {
            PERMISSION_PATH,
            SPECIFIC_PERMISSION_PATH: permissionId => `${PERMISSION_PATH}/${permissionId}`
        },

        users_history: {
            USER_HITORY_PATH,
            SPECIFIC_USER_HISTORY_PATH: userId => `${USER_HITORY_PATH}/${userId}`
        },

        users_roles: {
            USERS_ROLES_PATH,
            ACTIVE_USERS_ROLES_PATH: `${USERS_ROLES_PATH}/active`,
            USER_ACTIVE_ROLES_PATH: userId => `${USERS_ROLES_PATH}/active/user/${userId}`,
            USERS_ACTIVE_ROLES_PATH: `${USERS_ROLES_PATH}/active/user`,
            USER_ROLES_DEACTIVATION_PATH: userRoleId => `${USERS_ROLES_PATH}/deactivate/${userRoleId}`
        },

        lists: {
            LIST_PATH,
            SPECIFIC_LIST_PATH: listId => `${LIST_PATH}/${listId}`,
            ACTIVE_LISTS_PATH: `${LIST_PATH}/active`,
            USERS_ACTIVE_LISTS_PATH: userId => `${LIST_PATH}/active/user/${userId}`,
            LIST_DEACTIVATION_PATH: listId => `${LIST_PATH}/deactivate/${listId}`
        },

        roles_permissions: {
            ROLES_PERMISSION_PATH
        },

        configs: {
            CONFIG_PATH,
            GOOGLE_CONFIG_PATH: `${CONFIG_PATH}/google`,
            AZUREAD_CONFIG_PATH: `${CONFIG_PATH}/azureAD`,
            DATABASE_CONFIG_PATH: `${CONFIG_PATH}/database`
        }

    }

module.exports = links
