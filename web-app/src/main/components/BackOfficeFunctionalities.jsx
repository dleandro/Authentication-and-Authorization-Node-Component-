import {listService, permissionService, rolesService, sessionService, userService} from '../service'
import React, {useEffect, useState} from 'react';
import { useHistory } from "react-router-dom";
import {Link} from "react-router-dom";
import FormControl from "react-bootstrap/FormControl";
import InputGroup from "react-bootstrap/InputGroup";
import 'bootstrap/dist/css/bootstrap.min.css';
import {SubmitValuesModal} from "../common/html-elements-utils/generics/GenericModal";
import GenericTooltipButton from "../common/html-elements-utils/generics/GenericTooltipButton";
import GenericFunctionality from "../common/html-elements-utils/generics/GenericFunctionality";

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

export function Sessions(){

    const labels = ['User id','Session Id','Expires'];
    const fetchData = ()=> sessionService().getSessions();

    const sessionToLine = (session)=> <React.Fragment>
        <td><Link to={`/users/${session.UserId}`}>{`Details of User: ${session.UserId}`}</Link></td>
        <td>{session.sid}</td>
        <td>{session.expires}</td>
        <td><SubmitValuesModal submitListener={val =>console.log('Service not done yet',val)} openButtonIcon={'fa fa-edit'}
                               buttonTooltipText={'Edit Expiration Date'} labels={['New Expiration Date']} /> </td>
    </React.Fragment>;
    return (
        <React.Fragment>
            <GenericFunctionality fetchCB={fetchData} tableLabels={labels} valueToLineCB={sessionToLine} />
        </React.Fragment>
    );
}

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
    let history = useHistory();

    const postList = (arr) => addList(['',arr[0]]);
    const removeList = (list) => deleteList(list.id);

    const currentValues=(permission)=><InputGroup>
            {['list'].map(field=><React.Fragment>
                <InputGroup.Prepend>
                    <InputGroup.Text>{`Current ${field}:`}</InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl value={permission[field]} />
            </React.Fragment>)}
        </InputGroup>

    const listsToLine=(list)=> <React.Fragment>
        <td><Link to={`/lists/${list.id}`}>{`Details of List: ${list.id}`}</Link></td>
        <td>{list.list}</td>
        <td><SubmitValuesModal submitListener={val =>editList([list.id,val[0]]).then(t=>history.push(`/lists/${list.id}`))} openButtonIcon={'fa fa-edit'}
                               child={currentValues(list)} buttonTooltipText={'Edit List'} labels={['New List Name']} /> </td>
    </React.Fragment>;

    return (
        <GenericFunctionality fetchCB={getLists} deleteDataCB={removeList} postNewDataCB={postList}
                              postNewDataFieldLabels={['New List']} valueToLineCB={listsToLine} tableLabels={labels} />
    );
}

export function Permissions(props){
    const labels = ["Id", "Action", "Resource"];
    let history = useHistory();

    const {getPermissions,addPermission,deletePermission,editPermission} = permissionService();
    const postPermission = (arr) => addPermission(['',arr[0],arr[1]]);
    const deletePermissionCB = (perm) => deletePermission([perm.id]);

    const currentValues=(permission)=><React.Fragment>
        <InputGroup>
            {['action','resource'].map(field=><React.Fragment>
                <InputGroup.Prepend>
                    <InputGroup.Text>{`Current ${field}:`}</InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl value={permission[field]} />
            </React.Fragment>)}
        </InputGroup>
        </React.Fragment>

    const permissionToLine=(permission)=> <React.Fragment>
        <td><Link to={`/permissions/${permission.id}`}>{`Details of Permission: ${permission.id}`}</Link></td>
        <td>{permission.action}</td>
        <td>{permission.resource}</td>
        <td><SubmitValuesModal submitListener={val =>editPermission([permission.id,val[0],val[1]]).then(t=>history.push(`/permissions/${permission.id}`))} openButtonIcon={'fa fa-edit'}
                               child={currentValues(permission)} buttonTooltipText={'Edit Permission'} labels={['New Action','New Resource']} /> </td>
    </React.Fragment>;

    return (
        <GenericFunctionality fetchCB={getPermissions} postNewDataCB={postPermission}
                              postNewDataFieldLabels={['New Action','New Resource']} deleteDataCB={deletePermissionCB}
                              tableLabels={labels} valueToLineCB={permissionToLine} />
    );
}

export function Roles(props){
    const labels = ["Id", "Role", "Parent Role"];
    let history = useHistory();
    const {getRoles,addRole,deleteRole,editRole} = rolesService();
    const postRole = (arr) => addRole(['',arr[0],arr[1]]);
    const deleteRoleCB = (role) => deleteRole(role.id);


    const currentValues=(role)=><React.Fragment>
        <InputGroup>
            {['role','parent_role'].map(field=><React.Fragment>
                <InputGroup.Prepend>
                    <InputGroup.Text>{`Current ${field}:`}</InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl value={role[field]} />
            </React.Fragment>)}
        </InputGroup>
    </React.Fragment>;

    const rolesToLine=(role)=> <React.Fragment>
        <td><Link to={`/roles/${role.id}`}>{`Details of Role: ${role.id}`}</Link></td>
        <td>{role.role}</td>
        <td>{role.parent_role == null ? 'null' : role.parent_role}</td>
        <td><SubmitValuesModal submitListener={val =>editRole([role.id,val[0],val[1]]).then(t=>history.push(`/roles/${role.id}`))} openButtonIcon={'fa fa-edit'}
                               child={currentValues(role)} buttonTooltipText={'Edit Role'} labels={['New Role','New Parent Role']} /> </td>
    </React.Fragment>;

    return (
        <GenericFunctionality fetchCB={getRoles} deleteDataCB={deleteRoleCB} postNewDataCB={postRole}
                              postNewDataFieldLabels={['New Role','Parent Role']} valueToLineCB={rolesToLine} tableLabels={labels} />
    );
}

export default UpdatableInput
