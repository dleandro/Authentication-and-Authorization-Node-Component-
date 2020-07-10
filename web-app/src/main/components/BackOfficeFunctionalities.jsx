import {
    listService,
    permissionService,
    rolePermissionService,
    rolesService,
    sessionService,
    userListService,
    userRoleService,
    userService
} from '../service'
import React, {useEffect, useState, useContext, Component} from 'react';
import { useHistory } from "react-router-dom";
import Table from 'react-bootstrap/Table';
import {Link, useParams} from "react-router-dom";
import Button from "react-bootstrap/Button";
import FormControl from "react-bootstrap/FormControl";
import InputGroup from "react-bootstrap/InputGroup";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import Modal from "react-bootstrap/Modal";
import 'bootstrap/dist/css/bootstrap.min.css';
import UserContext from "../UserContext";


/**
 * This is not supposed to be changed, instead make a new component which implements this
 * @param tooltipText
 * @param childButton
 * @returns {JSX.Element}
 * @constructor
 */
export const ToolTipButtonConstructor = ({tooltipText,childButton}) => (
    <OverlayTrigger overlay={<Tooltip id="tooltipbutton">{tooltipText}</Tooltip>}>
            {childButton}
    </OverlayTrigger>
);

export const GenericTooltipButton = ({icon='fa fa-table',onClick,tooltipText='Open',bootstrapColor='primary'}) => (
    <ToolTipButtonConstructor tooltipText={tooltipText} childButton={
        <button className={`btn btn-outline-${bootstrapColor} btn-sm rounded-0`} type="button" onClick={onClick}><i className={icon}/></button>
    }/>
);

/**
 * This is not supposed to be changed, instead make a new component which implements this
 * @param submitListener
 * @param buttonTooltipText
 * @param child
 * @returns {JSX.Element}
 * @constructor
 */
function GenericModal({submitListener,buttonTooltipText,child,openButtonIcon='fa fa-table'}){
    const [showModal,setModal] = useState(false);

    const submit = ()=>{
        submitListener();
        setModal(false);
    };

    return(<React.Fragment>
        <GenericTooltipButton onClick={()=>setModal(true)} tooltipText={buttonTooltipText} icon={openButtonIcon}/>
        <Modal show={showModal} onHide={()=>setModal(false)}>
            <Modal.Header closeButton>
                <Modal.Title>{buttonTooltipText}</Modal.Title>
            </Modal.Header>
            <Modal.Body>{child}</Modal.Body>
            <Modal.Footer>
                <Button variant="outline-secondary" onClick={()=>setModal(false)}>
                    Close
                </Button>
                {child?<Button variant="outline-primary" onClick={submit}>Save Changes</Button>:undefined}
            </Modal.Footer>
        </Modal>
    </React.Fragment>);
}

function SubmitValuesModal({submitListener,labels,child,openButtonIcon='fa fa-table',buttonTooltipText='Add new Value'}){
    const [value,setValue] = useState(labels?labels.map(t=>''):undefined);

    const changeValue = (i,newValue)=> setValue(value.map((elem, index) => index===i?newValue:elem));
    const body = () => <React.Fragment>
        {labels?labels.map((currElement, index) => <FormControl placeholder={currElement} onChange={e=>changeValue(index,e.target.value)}/>):undefined}
        {child}
    </React.Fragment>;

    return(<GenericModal buttonTooltipText={buttonTooltipText} openButtonIcon={openButtonIcon} submitListener={()=>submitListener(value)} child={body()} />);
}

function UpdatableInput({initialValue,submitListener}){
    const [value,setValue] = useState(initialValue);
    useEffect(()=>{setValue(initialValue)},[initialValue])
    return(<InputGroup className="mb-3">
        <FormControl placeholder={value} onChange={e=>setValue(e.target.value)}/>
        <InputGroup.Append>
            <GenericTooltipButton icon={'fa fa-edit'} tooltipText={'Edit!'} bootstrapColor={'success'} onClick={e=>submitListener(value)} />
        </InputGroup.Append>
    </InputGroup>);
}
export function RoleUsers() {
    let {id}=useParams()
    const fetchData = () => rolesService().getUsersWithThisRole(id)
    const ctx = useContext(UserContext)
    const labels = ["User id", "username",'Role Assignment date','Role expiration date','Updater']
    const postUserRole = (userId)=>userRoleService().addUserRole(userId,id,ctx.user.id)
    const removeUserFromRole = ()=> console.log('Still not implemented');

    const roleUserToLine = (roleUser) => <React.Fragment>
        <td><Link to={`/users/${roleUser['Users.id']}`}>{`Details of user: ${roleUser['Users.id']}`}</Link></td>
        <td >{roleUser['Users.username']}</td>
        <td >{roleUser['Users.UserRoles.start_date']}</td>
        <td><UpdatableInput initialValue={roleUser['Users.UserRoles.end_date']} submitListener={val =>console.log('Service of edit endDate still notdone value:',val)}/></td>
        <td>{roleUser['Users.UserRoles.updater']}</td>
    </React.Fragment>;
    return (

        <React.Fragment>
            <GenericFunctionality fetchCB={fetchData} deleteDataCB={removeUserFromRole} postNewDataCB={(arr)=>postUserRole(arr[0])}
                                  postNewDataFieldLabels={['Id of User to be assign']} tableLabels={labels} valueToLineCB={roleUserToLine} />
        </React.Fragment>
    )
}

export function UserRoles() {
    const {id}=useParams();
    const fetchData = ()=> userService().getUserRoles(id);
    const labels = ['Role id', 'role', 'Start Date', 'End Date', 'Updater'];
    const postUserRole = (roleId,updater)=>userRoleService().addUserRole(id,roleId,updater)
    const removeRoleFromUser = (roleId) => console.log('Remove Role from user still needs service')

    const userRoleToLine = userRole=> <React.Fragment>
        <td><Link to={`/roles/${userRole['Roles.id']}`}>{`Details of Role: ${userRole['Roles.id']}`}</Link></td>
        <td >{userRole['Roles.role']}</td>
        <td >{userRole['Roles.UserRoles.start_date']}</td>
        <td><UpdatableInput initialValue={userRole['Roles.UserRoles.end_date']} submitListener={val =>console.log('Service of edit endDate still notdone value:',val)}/></td>
        <td>{userRole['Roles.UserRoles.updater']}</td>
    </React.Fragment>;
    return (
        <React.Fragment>
            <GenericFunctionality fetchCB={fetchData} deleteDataCB={removeRoleFromUser} postNewDataCB={(arr)=>postUserRole(arr[0],arr[1])}
                                  postNewDataFieldLabels={['Id of Role to be assign','Updater']} tableLabels={labels} valueToLineCB={userRoleToLine} />
        </React.Fragment>
    );
}

export function UserLists() {

    const labels = ['Id', 'Start Date', 'End Date', 'Updater'];
    const ctx = useContext(UserContext);
    const fetchData = ()=> listService().getUserActiveLists(ctx.user.id);


    const listToLine=(list)=><React.Fragment>
        <td><Link to={`/lists/${list.ListId}`}>{`Details of List: ${list.ListId}`}</Link></td>
        <td>{list.start_date}</td>
        <td><UpdatableInput initialValue={list.end_date} submitListener={val =>console.log('Service still in development but inserted value=',val)}/></td>
        <td>{list.updater}</td>
    </React.Fragment>;
    return (
        <GenericFunctionality fetchCB={fetchData} tableLabels={labels} valueToLineCB={listToLine} />
    );
}
export function ListUsers() {

    const labels = ["User Id", "Username", "Start Date", "End Date", "Updater"]
    let {id}=useParams()
    const fetchData = ()=>listService().getUsersInThisList(id)
    const ctx = useContext(UserContext);
    const addUserToList = (userId)=> userListService().addUserList(id,userId,ctx.user.id)
    const removeUserFromList = () => console.log('Still not implemented removeUserFromList')
    const listUserToLine = listUser=> <React.Fragment>
        <td><Link to={`/users/${listUser['Users.id']}`}>{`Details of User: ${listUser['Users.id']}`}</Link></td>
        <td >{listUser['Users.username']}</td>
        <td >{listUser['Users.UserList.start_date']}</td>
        <td><UpdatableInput initialValue={listUser['Users.UserList.end_date']} submitListener={val =>console.log('Service of edit endDate still notdone value:',val)}/></td>
        <td>{listUser['Users.UserList.updater']}</td>
    </React.Fragment>;
    return (

        <React.Fragment>
            <GenericFunctionality fetchCB={fetchData} deleteDataCB={removeUserFromList} postNewDataCB={(arr)=>addUserToList(arr[0])}
                                  postNewDataFieldLabels={['Id of User to add to list']} tableLabels={labels} valueToLineCB={listUserToLine} />
        </React.Fragment>
    )
}
export function RolePermission() {

    const labels = ['Role id', 'role','Parent Role','Permission Id','Action','Resource'];
    const {id}=useParams();
    const fetchData = ()=> rolesService().getPermissionsWithThisRole(id).then(t=>{
        console.log(t);
        return t;
    });
    const postData = (arr)=> rolePermissionService().addRolePermission(id,arr[0],arr[1],arr[2])


    const rolePermissionToLine = (rolePermission) => <React.Fragment>
        <td>{id}</td>
        <td>{rolePermission.role}</td>
        <td>{rolePermission.parent_role}</td>
        <td><Link to={`/permissions/${rolePermission['Permissions.id']}`}>{`Details of Permission: ${rolePermission['Permissions.id']}`}</Link></td>
        <td>{rolePermission['Permissions.action']}</td>
        <td>{rolePermission['Permissions.resource']}</td>
    </React.Fragment>;

    return (
        <GenericFunctionality fetchCB={fetchData} postNewDataFieldLabels={['Permission Id','Action','Resource']} postNewDataCB={postData}
                              tableLabels={labels} valueToLineCB={rolePermissionToLine} />
    );
}

export function PermissionRoles() {

    const labels = ['Permission Id','Action','Resource','Role id', 'role','Parent Role'];
    const {id}=useParams();
    const fetchData = ()=> permissionService().getRolesWithThisPermission(id).then(t=>{
        console.log(t);
        return t;
    });
    const postData = (arr)=> rolePermissionService().addRolePermission(arr[0],id,arr[1],arr[2])


    const rolePermissionToLine = (rolePermission) => <React.Fragment>
        <td>{id}</td>
        <td>{rolePermission.action}</td>
        <td>{rolePermission.resource}</td>
        <td><Link to={`/roles/${rolePermission['Roles.id']}`}>{`Details of Roles: ${rolePermission['Roles.id']}`}</Link></td>
        <td>{rolePermission['Roles.role']}</td>
        <td>{rolePermission['Roles.parent_role']}</td>
    </React.Fragment>;

    return (
        <GenericFunctionality fetchCB={fetchData} postNewDataFieldLabels={['Role Id','Action','Resource']} postNewDataCB={postData}
                              tableLabels={labels} valueToLineCB={rolePermissionToLine} />
    );
}
export function Sessions(){

    const labels = ['User id','Session Id','Expires'];
    const fetchData = ()=> sessionService().getSessions();

    const sessionToLine = (session)=> <React.Fragment>
        <td><Link to={`/users/${session.UserId}`}>{`Details of User: ${session.UserId}`}</Link></td>
        <td>{session.sid}</td>
        <td>{session.expires}</td>
    </React.Fragment>;
    return (
        <React.Fragment>
            <GenericFunctionality fetchCB={fetchData} tableLabels={labels} valueToLineCB={sessionToLine} />
        </React.Fragment>
    );
}
export function UserSessions(){

    const labels = ['User id','Session Id','Expires'];
    const ctx = useContext(UserContext);
    const id=ctx.user.id;
    const fetchData = ()=> sessionService().getSession(id);

    const sessionToLine = (session)=> <React.Fragment>
        <td>{session.UserId}</td>
        <td>{session.sid}</td>
        <td>{session.expires}</td>
    </React.Fragment>;
    return (
        <GenericFunctionality fetchCB={fetchData} tableLabels={labels} valueToLineCB={sessionToLine} />
    );
};


export function Users(props){
    const labels = ['Id', 'Username', 'Password'];
    const {getUsers,addUser,deleteUser,editUsername,} = userService();
    let history = useHistory();
    const postUser = (arr) =>  addUser(arr)
    const removeUser = user => deleteUser([user.id]);
    const userToLine = user=> <React.Fragment>
        <td><Link to={`/users/${user.id}`}>{`Details of User: ${user.id}`}</Link></td>
        <td>{user.username}</td>
        <td>{'****'}</td>
        <td><SubmitValuesModal submitListener={val =>editUsername([user.id,val[0]]).then(t=>history.push(`/users/${user.id}`))} openButtonIcon={'fa fa-edit'}
                               buttonTooltipText={'Edit Username'} labels={['New Username']} /> </td>
    </React.Fragment>;

    return (
        <GenericFunctionality fetchCB={getUsers} deleteDataCB={removeUser} postNewDataCB={postUser}
                              postNewDataFieldLabels={['New Username','New Password']} tableLabels={labels} valueToLineCB={userToLine} />
    );
}

export function Lists(props){
    const labels = ["Id", "List"];
    const {getLists,addList,editList,deleteList} = listService();

    const postList = (arr) => addList(['',arr[0]]);
    const removeList = (list) => deleteList(list.id);

    const listsToLine=(list)=> <React.Fragment>
        <td><Link to={`/lists/${list.id}`}>{`Details of List: ${list.id}`}</Link></td>
        <td><UpdatableInput initialValue={list.list} submitListener={val =>editList([list.id,val])}/></td>
    </React.Fragment>;

    return (
        <GenericFunctionality fetchCB={getLists} deleteDataCB={removeList} postNewDataCB={postList}
                              postNewDataFieldLabels={['New List']} valueToLineCB={listsToLine} tableLabels={labels} />
    );
}


export function Permissions(props){
    const labels = ["Id", "Action", "Resource"];
    const {getPermissions,addPermission,deletePermission,editPermission} = permissionService();
    const postPermission = (arr) => addPermission(['',arr[0],arr[1]]);
    const deletePermissionCB = (perm) => deletePermission([perm.id]);
    const permissionToLine=(permission)=> <React.Fragment>
        <td><Link to={`/permissions/${permission.id}`}>{`Details of Permission: ${permission.id}`}</Link></td>
        <td><UpdatableInput initialValue={permission.action} submitListener={val =>editPermission([permission.id,val,permission.resource])}/></td>
        <td><UpdatableInput initialValue={permission.resource} submitListener={val =>editPermission([permission.id,permission.action,val])}/></td>
    </React.Fragment>;

    return (
        <GenericFunctionality fetchCB={getPermissions} postNewDataCB={postPermission}
                              postNewDataFieldLabels={['New Action','New Resource']} deleteDataCB={deletePermissionCB}
                              tableLabels={labels} valueToLineCB={permissionToLine} />
    );
}
export function Roles(props){
    const labels = ["Id", "Role", "Parent Role"];
    const {getRoles,addRole,deleteRole,editRole} = rolesService();
    const postRole = (arr) => addRole(['',arr[0],arr[1]]);
    const deleteRoleCB = (role) => deleteRole(role.id);
    const rolesToLine=(role)=> <React.Fragment>
        <td><Link to={`/roles/${role.id}`}>{`Details of Role: ${role.id}`}</Link></td>
        <td><UpdatableInput initialValue={role.role} submitListener={val =>editRole([role.id,val,role.parent_role])}/></td>
        <td><UpdatableInput initialValue={role.parent_role == null ? 'null' : role.parent_role} submitListener={val =>editRole([role.id,role.role,val])}/></td>
    </React.Fragment>;

    return (
        <GenericFunctionality fetchCB={getRoles} deleteDataCB={deleteRoleCB} postNewDataCB={postRole}
                              postNewDataFieldLabels={['New Role','Parent Role']} valueToLineCB={rolesToLine} tableLabels={labels} />
    );
}

/**
 * if you're changing something here that's probably wrong
 * @param fetchCB -should contain an err atribute if an error occured
 * @param postNewDataCB -should return a promise with an object identical to the returned in fetchCB and should receive an array
 * @param postNewDataFieldLabels -labels that describe the array values of the postNewDataCB aka the parameters of postNewDataCB
 * @param deleteDataCB - should receive one of the objects returned by fetchCB which you want to delete
 * @param valueToLineCB -should convert one of the objects returned by fetchCB into a table line
 * @param tableLabels -main table headers
 * @returns {JSX.Element}
 * @constructor
 */
function GenericFunctionality({fetchCB,postNewDataCB,postNewDataFieldLabels,deleteDataCB,valueToLineCB,tableLabels}){
    const [values, setValues] = useState([]);
    const [error,setError] = useState(undefined);
    useEffect(()=>{
        fetchCB().then(data=>'err' in data?setError(data):setValues(data));
    },[]);
    useEffect(()=>{if (error)console.error('An error ocurred: ',error);},[error]);

    const deleteValue = (val) => deleteDataCB(val).then(()=>{
        let newValues = [...values].filter(item=>item.id !==val.id);
        setValues(newValues);
    });

    const valueToLine = (val) => <tr>
        {valueToLineCB(val)}
        <td>
            <GenericTooltipButton icon={'fa fa-trash'} tooltipText={'Delete!'} bootstrapColor={'danger'} onClick={()=>deleteValue(val)} />
        </td>
    </tr>;
    return (
        <React.Fragment>
            {error?<p>{error.status} {error.err}</p>:

                <Table striped bordered hover variant="dark">
                    <thead>
                    <tr>
                        {tableLabels.map(label => <th>{label}</th>)}
                        <th>
                            <SubmitValuesModal submitListener={(arr)=>postNewDataCB(arr).then(d=>setValues([...values,d]))} labels={postNewDataFieldLabels}/>
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {values.map(valueToLine)}
                    </tbody>
                </Table>
            }
        </React.Fragment>
    );
}



export default SubmitValuesModal
