const Sequelize = require('sequelize'),
    sequelize = require('../common/util/db')
/**
 * allowNull defaults to true
 * @type {{type: StringDataTypeConstructor}}
 */
const DefaultString = {type: Sequelize.STRING}
const DefaultDate = {type: Sequelize.DATE}
const DefaultInt = {type: Sequelize.INTEGER}
const DefaultBool = {type: Sequelize.BOOLEAN}
const NonNullDate = {...DefaultDate, allowNull: false} //only used 1 time considering remove this const
const NonNullString = {...DefaultString, allowNull: false}
const NonNullUniqueString = {...NonNullString, unique: true} //only used 1 time considering remove this const
const NonNullStringPK = {...NonNullString, primaryKey: true} //only used 1 time considering remove this const
const NonNullIntPK = {...DefaultInt, allowNull: false, primaryKey: true}
const NonNullAutoIncIntPK = {type: Sequelize.INTEGER, autoIncrement: true, allowNull: false, primaryKey: true}
const foreignKey = (Model, Key, dataConstraints) => {
    return {...dataConstraints, references: {model: Model, key: Key}}
}
/**
 * @param modelName
 * @param attributes
 * @returns {Model}
 */
const defineTable = (modelName, attributes) => sequelize.define(modelName, attributes, {timestamps: false,freezeTableName: true});

/**
 * Permission(
 * - id: NonNullAutoIncIntPK,
 * - method: NonNullString,
 * - path: DefaultString,
 * - description: DefaultString)
 * @type {Model}
 */
const Permission = defineTable('Permission', {
    id: NonNullAutoIncIntPK,
    method: NonNullString,
    path: DefaultString,
    description: DefaultString
});
/**
 * Protocols(
 * - protocol: NonNullStringPK,
 * - active:DefaultBool)
 * @type {Model}
 */
const Protocols = defineTable('Protocols', {protocol: NonNullStringPK, active: DefaultBool});
/**
 Role(
 * - id: NonNullAutoIncIntPK,
 * - role: NonNullString,
 * - parent_role: DefaultInt)
 * @type {Model}
 */
const Role = defineTable('Role', {id: NonNullAutoIncIntPK, role: NonNullUniqueString, parent_role: DefaultInt});
/**
 * RolePermission(
 * - role: NonNullAutoIncIntPK,
 * - permission: NonNullIntPK)
 * @type {Model}
 */
const RolePermission = defineTable('RolePermission', {
    role: foreignKey(Role, 'id', NonNullAutoIncIntPK),
    permission: foreignKey(Permission, 'id', NonNullIntPK)
});
/**
 * User_History(
 * - user_id: NonNullAutoIncIntPK,
 * - date: NonNullDate,
 * - description: DefaultString)
 * @type {Model}
 */
const UserHistory = defineTable('User_History', {
    user_id: NonNullAutoIncIntPK,
    date: NonNullDate,
    description: DefaultString
});
/**
 * User(
 * - id: NonNullAutoIncIntPK,
 * - username: NonNullString,
 * - password: DefaultString)
 * @type {Model}
 */
const User = defineTable('User', {
    id: NonNullAutoIncIntPK,
    username: NonNullUniqueString,
    password: DefaultString
});
/**
 * UserSession(
 * - user_id: NonNullAutoIncIntPK,
 * - session_id: NonNullStringPK)
 * @type {Model}
 */
const UserSession = defineTable('User_Session', {
    user_id: foreignKey(User, 'id', NonNullAutoIncIntPK),
    session_id: NonNullStringPK
});
/**
 * List(
 * - id: NonNullAutoIncIntPK,
 * - user_id: DefaultString,
 * - list: DefaultString,
 * - start_date: DefaultDate,
 * - end_date: DefaultDate,
 * - updater: DefaultInt,
 * - active: DefaultBool)
 * @type {Model}
 */
const List = defineTable('List', {
    id: NonNullAutoIncIntPK,
    user_id: foreignKey(User, 'id', DefaultInt),
    list: DefaultString,
    start_date: DefaultDate,
    end_date: DefaultDate,
    updater: DefaultInt,
    active: DefaultBool
});
/**
 * Idp(
 * - user_id: NonNullIntPK,
 * - idp_id: DefaultString,
 * - idpname: DefaultString)
 * @type {Model}
 */
const Idp = defineTable('Idp', {
    user_id: foreignKey(User, 'id', NonNullIntPK),
    idp_id: DefaultString,
    idpname: DefaultString
});
/**
 * UserRoles(
 * - id: NonNullAutoIncIntPK,
 * - user_id: DefaultInt,
 * - role_id: DefaultInt,
 * - start_date: DefaultDate,
 * - end_date: DefaultDate,
 * - updater: DefaultInt,
 * - active: DefaultBool)
 * @type {Model}
 */
const UserRoles = defineTable('UserRoles', {
    id: NonNullAutoIncIntPK,
    user_id: foreignKey(User, 'id', DefaultInt),
    role_id: foreignKey(Role, 'id', DefaultInt),
    start_date: DefaultDate,
    end_date: DefaultDate,
    updater: DefaultInt,
    active: DefaultBool
});

exports.Permission =Permission
exports.Protocols = Protocols
exports.Role = Role
exports.RolePermission = RolePermission
exports.UserHistory = UserHistory
exports.User = User
exports.UserSession = UserSession
exports.List = List
exports.Idp = Idp
exports.UserRoles = UserRoles
