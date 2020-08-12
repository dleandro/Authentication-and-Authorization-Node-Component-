

const { Sequelize,Op} = require('sequelize'),
    config = require('../common/config/config'),
    sequelize = config.sequelize,
    bcrypt = require('bcrypt')

const { STRING, DATE, BOOLEAN, INTEGER, TEXT} = Sequelize


/**
 * @param modelName
 * @param attributes
 * @returns {Model}
 */
const defineTable = (modelName, attributes, timestamps) => sequelize.define(modelName, attributes, { timestamps: timestamps, freezeTableName: true });

/**
 * Permission(
 * - method: NonNullString,
 * - path: DefaultString,
 * - description: DefaultString)
 * @type {Model}
 */
const Permission = defineTable('Permission', { action: { type: STRING, validate: { notEmpty: true }, allowNull: false }, resource: { type: STRING, validate: { notEmpty: true }, allowNull: false } }, false);
/**
 * AuthenticationType(
 * - protocol: NonNullStringPK,
 * - active:DefaultBool)
 * @type {Model}
 */
const AuthenticationTypes = defineTable('AuthenticationTypes', { protocol: { type: STRING, primaryKey: true, validate: { notEmpty: true }, allowNull: false }, idp: { type: STRING, primaryKey: true, validate: { notEmpty: true }, allowNull: false }, active: BOOLEAN }, false);
/**
 Role(
 * - role: NonNullString,
 * - parent_role: DefaultInt)
 * @type {Model}
 */
const Role = defineTable('Role', { role: { type: STRING, validate: { notEmpty: true }, allowNull: false, unique: true }, parent_role: INTEGER }, false);
/**
 * RolePermission(
 * - role: NonNullAutoIncIntPK,
 * - permission: NonNullIntPK)
 * @type {Model}
 */
Role.belongsToMany(Permission, { through: 'RolePermission', timestamps: false }, false);
Permission.belongsToMany(Role, { through: 'RolePermission', timestamps: false }, false);

const RolePermission = defineTable('RolePermission', {}, false)
RolePermission.removeAttribute('id');

RolePermission.belongsTo(Role, {onDelete: 'CASCADE'} )
Role.hasMany(RolePermission)

RolePermission.belongsTo(Permission,{ onDelete: 'CASCADE'} )
Permission.hasMany(RolePermission)

/**
 * User(
 * - username: NonNullString,
 * - password: DefaultString)
 * @type {Model}
 */
const User = defineTable('User', {
    username: { type: STRING, validate: { notEmpty: true}, allowNull: false, unique: true },
    password: { type: STRING,validate: {
         minLength(password){
            if (password.length < 9) {
                throw new Error('Password needs to have atleast 9 characters')
            }
            let idx=0
            if(password.match(/.*[a-z]/))
                idx++
            if(password.match(/.*[A-Z]/))
                idx++
            if(password.match(/\d/))
                idx++
            if(password.match(/.*\W/))
                idx++
            if(idx<3){
                throw new Error('The Password must meet 3 of these requirements:Atleast One UpperCase letter,One LowerCase letter,one special char and one digit')
            }    
        }
        }
     , get() { return () => this.getDataValue('password') } },
    updater: { type: INTEGER }
}, false);

User.belongsTo(User, { foreignKey: 'updater' })

User.encryptPassword = async (password) => await bcrypt.hash(password, await bcrypt.genSalt(10))

User.correctPassword = async (enteredPassword, user) => await bcrypt.compare(enteredPassword, user.password)

const setSaltHashAndPassword = async user => {
    if (user.changed('password')) {
        user.password = await User.encryptPassword(user.password())
    }
}

const updateSaltHashAndPassword = async user => {
    if (user.attributes.password) {
        user.attributes.password = await User.encryptPassword(user.attributes.password)
    }
}



User.beforeCreate(setSaltHashAndPassword)
User.beforeBulkUpdate(updateSaltHashAndPassword)

/**
 * User_History(
 * - user_id: NonNullAutoIncIntPK,
 * - date: NonNullDate,
 * - description: DefaultString)
 * @type {Model}
 */
const UserHistory = defineTable('User_History', { date: { type: DATE, allowNull: false }, description: STRING, updater: INTEGER, user_id: { type: INTEGER } }, false);
//User.hasMany(UserHistory, { foreignKey: 'user_id' })
//UserHistory.belongsTo(User, { foreignKey: 'updater' })

/**
 * List(
 * - user_id: DefaultString,
 * - list: DefaultString)
 * @type {Model}
 * 
 */
const List = defineTable('List', { list: { type: STRING, validate: { notEmpty: true }, allowNull: false, unique: true } }, false);

const UserAssociation = (associationName) => defineTable(associationName, {
    start_date: { type: DATE, allowNull: false }, end_date: {
        type: DATE, validate: {
            isDateAndTimeAfter(end_date) {
                const endDateFormatted = new Date(end_date)
                const startDateFormatted = new Date(this.start_date)

                if (endDateFormatted < startDateFormatted) {
                    throw new Error('end_date needs to be after start_date')
                }
            }
        }
    },
    updater: { model: 'User', key: 'id', type: INTEGER, allowNull: false }, active: BOOLEAN
}, false);

const UserList = UserAssociation('UserList');
List.belongsToMany(User, { through: UserList });
User.belongsToMany(List, { through: UserList });

UserList.belongsTo(User, { foreignKey: 'updater', onDelete: 'CASCADE' })
UserList.belongsTo(User)
User.hasMany(UserList)

UserList.belongsTo(List)
List.hasMany(UserList)

/**
 * Idp(
 * - user_id: NonNullIntPK,
 * - idp_id: DefaultString,
 * - idpname: DefaultString)
 * @type {Model}
 */
const Idp = defineTable('Idp', { idp_id: STRING(1234, false), idpname: STRING }, false);
User.hasOne(Idp, { foreignKey: 'user_id' })
/**
 * UserRoles(
 * - user_id: DefaultInt,
 * - role_id: DefaultInt,
 * - start_date: DefaultDate,
 * - end_date: DefaultDate,
 * - updater: DefaultInt,
 * - active: DefaultBool)
 * @type {Model}
 */

const UserRoles = UserAssociation('UserRoles');
Role.belongsToMany(User, { through: UserRoles });
User.belongsToMany(Role, { through: UserRoles });

UserRoles.belongsTo(User, { foreignKey: 'updater', onDelete: 'CASCADE' })
UserRoles.belongsTo(User)
User.hasMany(UserRoles)

UserRoles.belongsTo(Role)
Role.hasMany(UserRoles)

const Session = defineTable('Sessions', { sid: { type: STRING(36), primaryKey: true }, expires: DATE, data: TEXT }, true)

User.hasMany(Session)
Session.belongsTo(User)


const createHistory = async (date, updater, description, UserId) => {
    UserHistory.create({ date: date, updater: updater, description: description, user_id: UserId })
}

const invalidateSessions = async (userList) => {
    userList = userList.dataValues
    console.log('correu hook 1')
    const list = await List.findOne({ where: { id: userList.ListId } })
    if (list.list === 'BLACK') {
        Session.destroy({ where: { Userid: userList.UserId } })
    }
    createHistory(userList.start_date,userList.updater, `The list with the id:${userList.ListId} was added to the user`,userList.UserId)
}


const createUserRoleHistory = async ({ dataValues }) => {
    createHistory(dataValues.start_date, dataValues.updater, `The role with the id:${dataValues.RoleId} was added to the user`, dataValues.UserId)
}

const createUserHistory = async ({ dataValues }) => {
    createHistory(new Date(), dataValues.updater, `The user was created`,dataValues.id)
}

const deleteUserRoleHistory = async ( dataValues ) => {
    createHistory(dataValues.start_date, dataValues.updater, `The role with the id:${dataValues.RoleId} was deleted from the user`, dataValues.UserId)
}

const deleteUserHistory = async (dataValues) => {
  createHistory(new Date(), dataValues.updater, `The user was deleted`,dataValues.id)
}


const deleteUserListHistory = async ( dataValues ) => {
    createHistory(dataValues.start_date, dataValues.updater, `The list with the id:${dataValues.ListId} was removed from the user`, dataValues.UserId)
}

const updateUserRoleHistory = async (options) => {
    const userRoles= await UserRoles.findAll({where:options.where})
    userRoles.map(userRole=>createHistory(userRole.start_date, userRole.updater, `The association with the Role with the id:${userRole.RoleId} was updated`, userRole.UserId))
}


const updateUserHistory = async (dataValues) => {
   createHistory(new Date(), dataValues.attributes.updater, `The user was updated`,dataValues.where.id)
}


const updateUserListHistory = async ( options ) => {
    const userLists= await UserList.findAll({where:options.where})
    userLists.map(userList=>createHistory(userList.start_date, userList.updater, `The association with the Role with the id:${userList.ListId} was updated`, userList.UserId))
}



UserList.afterCreate(invalidateSessions)
UserRoles.afterCreate(createUserRoleHistory)
User.afterCreate(createUserHistory)

UserList.afterDestroy(deleteUserListHistory)
UserRoles.afterDestroy(deleteUserRoleHistory)
User.afterDestroy(deleteUserHistory)

UserList.beforeBulkUpdate(updateUserListHistory)
UserRoles.beforeBulkUpdate(updateUserRoleHistory)
User.afterBulkUpdate(updateUserHistory)


var cron = require('node-cron');
cron.schedule('*/30 * * * *', async () => {
    console.log('running a task every 1 minute');
    await  UserRoles.update({ active: 0 }, { where: {end_date:{[Op.lt] : new Date()},active:1 }})
    await  UserList.update({ active: 0 }, { where: {end_date:{[Op.lt] : new Date()},active:1 }})
  });




exports.Permission = Permission
exports.AuthenticationTypes = AuthenticationTypes
exports.Role = Role
exports.RolePermission = sequelize.models.RolePermission
exports.UserHistory = UserHistory
exports.User = User
exports.List = List
exports.Idp = Idp
exports.UserList = sequelize.models.UserList
exports.UserRoles = UserRoles
exports.Session = Session
exports.Op=Op