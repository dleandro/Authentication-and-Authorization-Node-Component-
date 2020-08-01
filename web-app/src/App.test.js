import {
    listService,
    userService,
    rolesService,
    permissionService,
    authenticationService,
    sessionService, historyService
} from "./main/service";

const PORT = 8082;
const listServ = listService(true);
const userServ = userService(true);
const roleServ = rolesService(true);
const permServ = permissionService(true);
const authServ = authenticationService(true);
const sessionServ = sessionService(true);
const histServ = historyService(true)

/**
 * @jest-environment node
 */
describe('List Service tests', () => {
    test('Create/Get/Delete list:', async ()=>{
        const inserted=await listServ.post('testingList');
        await listServ.get().then(lists=>expect(lists).toContainEqual(inserted));
        const deleted = await listServ.destroy(inserted.id);
        console.log('Inserted: ',inserted,'\tDeleted: ',deleted);
        await listServ.get().then(lists=>expect(lists).not.toContainEqual(inserted));
    });

    test('Create and check list:', async ()=>{
        const inserted=await listServ.post('testingList2');
        await listServ.getActiveLists().then(lists=>expect(lists).toContainEqual(inserted));
        await listServ.getList(inserted.id).then(list=>expect(list).toEqual(inserted));
        const deactivated = await listServ.deactivateList(inserted.id);
        await listServ.getActiveLists().then(lists=>expect(lists).not.toContainEqual(inserted));
        await listServ.getList(inserted.id).then(list=>expect(list).toEqual(inserted));
        const deleted = await listServ.destroy(inserted.id);
        console.log('Inserted: ',inserted,'\tDeactivated: ',deactivated,'\tDeleted: ',deleted);
        await listServ.get().then(lists=>expect(lists).not.toContainEqual(inserted));
    });

});

describe('Role Service tests',()=>{
    test('Testing :\n post/update/delete role,\n post/update date/delete user from role,\n post/delete permission from role', async ()=>{
        //inserting new role and checking if returned value is correct
        let expected = {id:undefined,role:'testRoleName',parent_role:1};
        let inserted=await roleServ.post(['testRoleName',1]);
        expected.id = inserted.id;
        expect(inserted).toEqual(expected);
        //updating role and checking if returned value is correct and if parameters are being checked
        expected.role = 'updatedRoleName';
        roleServ.editRole([expected.id,expected.role,undefined]).then(role=>expect(role).toEqual(expected))
        expected.parent_role = 'updatedParentRole';
        roleServ.editRole([expected.id,undefined,expected.parent_role]).then(role=>expect(role).toEqual(expected))
        //adding role to user checking if returned value is correct and operation was sucessfull
        let expectedUserRole =  { id: 2,start_date: '2020-07-23 01:52:46',end_date:null,updater:1,active:1 };
        let insertedUserRole= await roleServ.addUserToRole(expected.id,2)
        expectedUserRole.start_date=insertedUserRole.start_date
        expectedUserRole.updater=insertedUserRole.updater
        expect(insertedUserRole).toEqual(expectedUserRole)

        await roleServ.getUsersWithThisRole(expected.id).then(userRoles=>expect(userRoles).toContainEqual(expectedUserRole)).catch(err=>{
            console.error('RolesUser array doesnt contain expected value: ',expectedUserRole);
            throw err
        });
        //changing role end date and checking if operation was sucessfull and returned value is correct
        let expectedDate ={date: "2020-07-10", time: "18:12"};
        let updatedRoleUser= await roleServ.changeUserRoleEndDate(expectedDate,expectedUserRole.id,expected.id);
        expectedUserRole.end_date = updatedRoleUser.end_date;
        expect(updatedRoleUser).toEqual(expectedUserRole)
        await roleServ.getUsersWithThisRole(expected.id).then(userRoles=>expect(userRoles).toContainEqual(expectedUserRole)).catch(err=>{
            console.error('RolesUser array doesnt contain expected value: ',expectedUserRole);
            throw err
        });
        //removing role from user checking if operation was sucessfull
        await roleServ.removeUserFromRole(expectedUserRole.id,expected.id)
        await roleServ.getUsersWithThisRole(expected.id).then(userRoles=>expect(userRoles).not.toContainEqual(expectedUserRole)).catch(err=>{
            console.error('RolesUser array shouldnt contain value: ',expectedUserRole);
            throw err
        });
        //considering add reactivate userrole
        //inserting permission on role and checking if operation was sucessfull and returned value is correct
        let insertedPerm= await roleServ.addPermissionToRole(expected.id,1);
        await roleServ.getPermissionsWithThisRole(expected.id).then(rolePerms=>expect(rolePerms).toContainEqual(insertedPerm)).catch(err=>{
            console.error('RolesPermissions array doesnt contain expected value: ',insertedPerm);
            throw err
        });
        //deleting permission from role and checking if operation was sucessfull
        await roleServ.removePermissionFromRole(expected.id,insertedPerm.id);
        await roleServ.getPermissionsWithThisRole(expected.id).then(rolePerms=>expect(rolePerms).not.toContainEqual(insertedPerm)).catch(err=>{
            console.error('RolesPermissions array shouldnt contain value: ',insertedPerm);
            throw err
        });
        //deleting role and checking if operation was sucessfull
        await roleServ.destroy(expected.id)
        await roleServ.get().then(roles=>expect(roles).not.toContainEqual(expected)).catch(err=>{
            console.error('Roles array shouldnt contain value: ',expected);
            throw err
        });
    });
});

describe('User Service tests',()=>{
    test('Getters testing: ', async ()=>{
        //Tests if all getters have the expected output format
        const expected = {id:1,username:'superuser'};
        const expectedSession = {
            sid: 'CMDZ1XKb518RwGsSrfB733r3BInt6gy3',
            expires: '2020-07-25T11:58:09.000Z',
            createdAt: '2020-07-24T11:58:09.000Z',
            updatedAt: '2020-07-24T11:58:09.000Z',
        }
        const expectedHistory ={
            id: 1,
            date: '2020-07-23T17:42:55.000Z',
            success: 1,
            action: 'GET',
            resource: 'authentications',
            from: '::ffff:127.0.0.1'
        }
        const expectedList = { id: 2, list: 'GREY',start_date: '2016-06-03 09:34:00',end_date:'2016-06-03 09:34:00',updater:null,active:0};
        const expectedRole =  { id: 1,start_date: '2020-07-23 01:52:46',end_date:null,updater:1,active:1 };
        const expectedPerm =  { id: 20, action: 'GET', resource: 'authentications' };
        await userServ.getUserPermissions(1).then(permissions=>expect(permissions).toContainEqual(expectedPerm)).catch(err=>{
            console.error('Permissions array doesnt contain expected value: ',expectedPerm);
            throw err
        });
        await userServ.getUserHistory(1).then(history=>expect(history).toEqual(expectedHistory));
        await userServ.getUserLists(1).then(lists=>expect(lists).toContainEqual(expectedList)).catch(err=>{
            console.error('Lists array doesnt contain expected value: ',expectedList);
            throw err
        });
        await userServ.getUserSessions(1).then(sessions=>expect(sessions).toContainEqual(expectedSession)).catch(err=>{
            console.error('Sessions array doesnt contain expected value: ',expectedSession);
            throw err
        });
        await userServ.getUserRoles(1).then(roles=>expect(roles).toContainEqual(expectedRole)).catch(err=>{
            console.error('Roles array doesnt contain expected value: ',expectedRole);
            throw err
        });
        await authServ.login('superuser','superuser');
        await userServ.getAuthenticatedUser().then(user=>expect(user).toEqual(expected));
        await userServ.getUser(expected.username).then(user=>expect(user).toEqual(expected));
        await userServ.get().then(users=>expect(users).toContainEqual(expected)).catch(err=>{
            console.error('User array doesnt contain expected value: ',expected);
            throw err
        });
        await userServ.getUserById(1).then(user=>expect(user).toEqual(expected));
    },)
    test('Testing :\n post/update/delete user,\n post/update/delete role from user,\n post/update/delete list form user,\n update/delete session', async ()=>{
        //inserting new user and checking if returned value is correct
        let inserted=await userServ.post(['testUsername','testPassword']);
        let expected = {id:inserted.id,username:inserted.username};
        expect(inserted).toEqual(expected);
        //updating username and checking if returned value is correct
        expected.username = 'updatedTestUsername';
        await userServ.editUsername([inserted.id,'updatedTestUsername']).then(user=>expect(user).toEqual(expected))
        //adding role to user checking if returned value is correct and operation was sucessfull
        let expectedRole =  { id: 1,start_date: '2020-07-23 01:52:46',end_date:null,updater:1,active:1 };
        let insertedRole= await userServ.addRoleToUser([expected.id,1])
        expectedRole.start_date=insertedRole.start_date
        expect(insertedRole).toEqual(expectedRole)
        await userServ.getUserRoles(expected.id).then(roles=>expect(roles).toContainEqual(expectedRole)).catch(err=>{
            console.error('Roles array doesnt contain expected value: ',expectedRole);
            throw err
        });
        //changing role end date and checking if operation was sucessfull and returned value is correct
        let expectedDate ={date: "2020-07-10", time: "18:12"};
        let updatedRole= await userServ.changeRoleEndDate(expectedDate,expectedRole.id,expected.id);
        insertedRole.end_date = updatedRole.end_date;
        expect(insertedRole).toEqual(expectedRole)
        await userServ.getUserRoles(expected.id).then(roles=>expect(roles).toContainEqual(expectedRole)).catch(err=>{
            console.error('Roles array doesnt contain expected value: ',expectedRole);
            throw err
        });
        //removing role from user checking if operation was sucessfull
        await userServ.deactivateRoleFromUser(expected.id,expectedRole.id)
        await userServ.getUserRoles(expected.id).then(roles=>expect(roles).not.toContainEqual(expectedRole)).catch(err=>{
            console.error('Roles array shouldnt contain value: ',expectedRole);
            throw err
        });
        //considering add reactivate userrole
        //adding list to user checking if returned values are correct and if operation was sucessfull
        let expectedList = { id: 2, list: 'GREY',start_date: '2016-06-03 09:34:00',end_date:'2016-06-03 09:34:00',updater:null,active:1};
        let insertedList= await userServ.addListToUser(expected.id,2,expectedDate);
        expectedList.start_date=insertedList.start_date;
        expectedList.end_date=insertedList.end_date;
        expect(insertedList).toEqual(expectedList);
        await userServ.getUserLists(expected.id).then(lists=>expect(lists).toContainEqual(expectedList)).catch(err=>{
            console.error('List array doesnt contain expected value: ',expectedRole);
            throw err
        });
        //changing list end date and checking if operation was sucessfull and returned value is correct
        let updatedList=await userServ.changeUserListEndDate(expectedDate,expected.id,expectedList.id);
        expectedList.end_date=updatedList.end_date;
        expect(updatedList).toEqual(expectedList);
        await userServ.getUserLists(expected.id).then(lists=>expect(lists).toContainEqual(expectedList)).catch(err=>{
            console.error('List array doesnt contain expected value: ',expectedRole);
            throw err
        });
        //deactivating list and checking operation was sucessfull
        await userServ.deactivateListFromUser(expected.id,expectedList.id)
        await userServ.getUserLists(expected.id).then(lists=>expect(lists).not.toContainEqual(expectedList)).catch(err=>{
            console.error('List array shouldmt contain value: ',expectedList);
            throw err
        });
        //changing session and checking operation was sucessfull
        let expectedSession = await userServ.getUserSessions(1).then(arr=>arr[0])
        let updatedSession=await userServ.changeSessionExpirationDate(1,expectedSession.sid,1)
        expectedSession.expires = updatedSession.expires;
        expectedSession.updatedAt = updatedSession.updatedAt;
        expect(updatedSession).toEqual(expectedSession);
        //deleting session and checking operation was sucessfull
        await userServ.deleteSession(expectedSession.sid);
        await userServ.getUserSessions(1).then(sessions=>expect(sessions).not.toContainEqual(expectedSession)).catch(err=>{
            console.error('Sessions array shouldnt contain value: ',expectedSession);
            throw err
        });
        //deleting user and checking operation was sucessfull
        await userServ.destroy(expected.id)
        await userServ.get().then(users=>expect(user).not.toContainEqual(expected)).catch(err=>{
            console.error('Users array shouldnt contain value: ',expected);
            throw err
        });
    });
});
