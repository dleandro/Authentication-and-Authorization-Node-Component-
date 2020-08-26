const
    { RBAC } = require('rbac'),
    config = require('./config/config'),
    { User, Role, UserRoles, Permission } = require('../resources/sequelize-model'),
    moment = require('moment');

let
    roleDal,
    permissionsDal,
    rolesPermissionsDal,
    usersRolesDal;


module.exports = async function (rbacOpts) {

    if (config.isModuleSetUp) {
        return config.rbac;
    }

    const rbac = new RBAC();
    config.rbac = rbac;

    // variables are only initialized here because they need rbac to be placed on the config file before dal's are called
    roleDal = require('../resources/dals/roles-dal');
    permissionsDal = require('../resources/dals/permissions-dal');
    rolesPermissionsDal = require('../resources/dals/roles-permissions-dal');
    usersRolesDal = require('../resources/dals/users-roles-dal');

    const setGuestRole = async user => {
        const {id} = await roleDal.getByName('guest');
        usersRolesDal.create(user.dataValues.id, id, new Date(), null, user.dataValues.id, 1);
    };

    User.afterCreate(setGuestRole);


    if (rbacOpts) {
        await createRoles(rbacOpts.roles);
        await setupSuperuser();
        const admin = await roleDal.getByName('admin');

        const insertOnAdmin = async permission => {
            rolesPermissionsDal.create(admin.id, permission.dataValues.id);
        };

        Permission.afterCreate(insertOnAdmin);

        await createPermissions(rbacOpts.permissions);
        await createGrants(rbacOpts.grants);
    } else {
        const promiseArr2 = [
            setupSuperuser(),
            createRbacRoles(),
            createRbacPermissions()];

        await Promise.all(promiseArr2);
        await createRbacGrants();
        await createParentGrants();
    }

    // Using promise.all to parallelize queries
    // we need to await this line below because we need
    //the database to have all roles and permissions values before creating Grants


    return Promise.resolve(rbac.init());
};

const createRoles= roles=>Promise.all(roles.map(role => roleDal.create(role)));

const createPermissions= permissions=> Promise.all(permissions.map(permission => permissionsDal.create(permission.action, permission.resource)));

const createRbacPermissions = () => permissionsDal.get()
    .then(permissions=> permissions.map(({action, resource}) => config.rbac.createPermission(action, resource, true)));

const createGrants = grants => Promise.all(Object.keys(grants).map(key =>
    roleDal.getByName(key)
        .then(role =>
            grants[key].map(permission =>
                ('role' in permission) ?
                    roleDal.getByName(permission.role).then(childRole => roleDal.addParentRole(childRole, role)) :
                    permissionsDal.getSpecific(permission.action, permission.resource).then(({id}) => rolesPermissionsDal.create(role.id, id))))
));

const createRbacGrants= async ()=> {
    const rolepermissions = await rolesPermissionsDal.get();
    return Promise.all(rolepermissions.map(async ({action, resource, role}) => {
        const fetchedRole = await config.rbac.getRole(role);
        const permission = await config.rbac.getPermission(action, resource);
        config.rbac.grant(fetchedRole, permission);
    }));
}

const setupSuperuser = async () => {
    // server admin should change superuser's password
    // this should use our own dals to make sure rbac object is always consistent with our database
    const role = Role.findOrCreate({ where: { "role": "admin" } });
    Role.findOrCreate({ where: { "role": "guest" } });
    const [{id}] = await User.findOrCreate({where: {"username": "superuser"}, defaults: {"password": "Superuser123"}});
    return UserRoles.findOrCreate({
        where: { "UserId": id, "RoleId": (await role)[0].id },
        defaults: { "updater": id, "active": 1, "start_date": moment().format() }});
};



const createRbacRoles = async () => {
    const rolesNames = roleDal.get().then(roles=>roles.map(role => role.role));
    config.rbac.createRoles(await rolesNames, true);
};


const createParentGrants = async () => {
    const {getRole, grant} = config.rbac;
    const roles=await roleDal.getWithParents();
    return Promise.all(roles.map(async ({parent_role, role})=>
        roleDal.getSpecificById(parent_role)
            .then(async parentRole=>grant(await getRole(parentRole.role),await getRole(role)))));
};
