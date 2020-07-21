import {listService,userService,rolesService} from "./main/service";

const PORT = 8082;
const listServ = listService(true);
const userServ = userService(true);
const roleServ = rolesService(true);

/**
 * @jest-environment node
 */
describe('List Service tests', () => {
    test('Create/Get/Delete list:', async ()=>{
        const inserted=await listServ.addList('testingList');
        await listServ.getLists().then(lists=>expect(lists).toContainEqual(inserted));
        const deleted = await listServ.deleteList(inserted.id);
        console.log('Inserted: ',inserted,'\tDeleted: ',deleted);
        await listServ.getLists().then(lists=>expect(lists).not.toContainEqual(inserted));
    });

    test('Create and check list:', async ()=>{
        const inserted=await listServ.addList('testingList2');
        await listServ.getActiveLists().then(lists=>expect(lists).toContainEqual(inserted));
        await listServ.getList(inserted.id).then(list=>expect(list).toEqual(inserted));
        const deactivated = await listServ.deactivateList(inserted.id);
        await listServ.getActiveLists().then(lists=>expect(lists).not.toContainEqual(inserted));
        await listServ.getList(inserted.id).then(list=>expect(list).toEqual(inserted));
        const deleted = await listServ.deleteList(inserted.id);
        console.log('Inserted: ',inserted,'\tDeactivated: ',deactivated,'\tDeleted: ',deleted);
        await listServ.getLists().then(lists=>expect(lists).not.toContainEqual(inserted));
    });

});

describe('Role Service tests',()=>{
    test('Create/Get/Update/GetByID/Delete/GetById Role:', async ()=>{
        const inserted=await roleServ.addRole(['testRoleName','Testparentrole']);
        await roleServ.getRoles().then(roles=>expect(roles).toContainEqual(inserted));
        const updated= await roleServ.editRole([inserted.id,'changedTestingName','changedTestingParentName'])
        await roleServ.getRole(updated.id).then(role=>expect(role.role).toEqual(updated.role));
        const deleted = await roleServ.deleteRole(inserted.id);
        console.log('Inserted: ',inserted,'Updated: ',updated,'Deleted: ',deleted);
        inserted.role=updated.role;
        //checking role was deleted
        await roleServ.getRole(inserted.id).then(role=>expect(role).not.toEqual(inserted));
        await roleServ.getRoles().then(role=>expect(role).not.toContainEqual(inserted));
    });
});

describe('User Service tests',()=>{
    test('Create/Get/Update/GetByName/Delete/GetById User:', async ()=>{
        const inserted=await userServ.addUser(['testUsername','testPassword']);
        await userServ.getUsers().then(users=>expect(users).toContainEqual(inserted));
        const updated= await  userServ.editUsername([inserted.id,'changedTestingName']);
        await userServ.getUser('changedTestingName').then(user=>expect(user.username).toEqual(updated.username));
        const deleted = await userServ.deleteUser([inserted.id]);
        console.log('Inserted: ',inserted,'Updated: ',updated,'Deleted: ',deleted);
        inserted.username=updated.username;
        await userServ.getUserById(inserted.id).then(user=>expect(user).not.toEqual(inserted));
        await userServ.getUsers().then(users=>expect(users).not.toContainEqual(inserted));
    });
});