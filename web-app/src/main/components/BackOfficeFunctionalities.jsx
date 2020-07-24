import {listService, permissionService, rolesService, sessionService, userService} from '../service'
import React, {useEffect, useState} from 'react';
import { useHistory } from "react-router-dom";
import {Link} from "react-router-dom";
import FormControl from "react-bootstrap/FormControl";
import InputGroup from "react-bootstrap/InputGroup";
import 'bootstrap/dist/css/bootstrap.min.css';
import {SubmitValuesModal} from "../common/html-elements-utils/generics/GenericModal";
import GenericTooltipButton from "../common/html-elements-utils/generics/GenericTooltipButton";
import GenericFunctionality, {BasicFunctionality} from "../common/html-elements-utils/generics/GenericFunctionality";
import DatePicker from "../common/html-elements-utils/DatePicker";

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
        <td><SubmitValuesModal child={<DatePicker text={'New date'} onChange={val =>console.log('Service not Done yet',val)}/>} openButtonIcon={'fa fa-calendar'}
                               buttonTooltipText={'Edit End Date'}  /> </td>
    </React.Fragment>;
    return (
        <React.Fragment>
            <GenericFunctionality fetchCB={fetchData} tableLabels={labels} valueToLineCB={sessionToLine} />
        </React.Fragment>
    );
}

export function Users(props){
    const {get,post,destroy,editUsername,} = userService();
    let history = useHistory();
    const removeUser = user => destroy([user.id]);
    const editUserRenderer = user => <td><SubmitValuesModal
        submitListener={val =>editUsername([user.id,val[0]]).then(t=>history.push(`/users/${user.id}`))} openButtonIcon={'fa fa-edit'}
        buttonTooltipText={'Edit Username'} labels={['New Username']} /> </td>;

    return (
        <BasicFunctionality fetchCB={get} deleteDataCB={removeUser} postNewDataCB={post} editDataRenderer={editUserRenderer}
                            postNewDataFieldLabels={['New Username','New Password']} resource={'users'} />
    );
}

export function Lists(props){
    const {getLists,addList,editList,deleteList} = listService();
    let history = useHistory();
    const postList = (arr) => addList(['',arr[0]]);
    const removeList = (list) => deleteList(list.id);

    const currentValues=(list)=><InputGroup>
            {['list'].map(field=><React.Fragment>
                <InputGroup.Prepend>
                    <InputGroup.Text>{`Current ${field}:`}</InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl value={list[field]} />
            </React.Fragment>)}
        </InputGroup>;
    const editListRenderer = list =>  <td><SubmitValuesModal
        submitListener={val =>editList([list.id,val[0]]).then(t=>history.push(`/lists/${list.id}`))} openButtonIcon={'fa fa-edit'}
        child={currentValues(list)} buttonTooltipText={'Edit List'} labels={['New List Name']} /> </td>;

    return (
        <BasicFunctionality fetchCB={getLists} resource={'lists'} editDataRenderer={editListRenderer} deleteDataCB={removeList} postNewDataCB={postList}
                            postNewDataFieldLabels={['New List']}  />
    );
}

export function Permissions(props){
    let history = useHistory();

    const {getPermissions,addPermission,deletePermission,editPermission} = permissionService();
    const postPermission = (arr) => addPermission(['',arr[0],arr[1]]);
    const deletePermissionCB = (perm) => deletePermission([perm.id]);

    const currentValues=(permission)=> <InputGroup>
            {['action','resource'].map(field=><React.Fragment>
                <InputGroup.Prepend>
                    <InputGroup.Text>{`Current ${field}:`}</InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl value={permission[field]} />
            </React.Fragment>)}
        </InputGroup>;

    const editPermissionRenderer = permission =>  <td><SubmitValuesModal
        submitListener={val =>editPermission([permission.id,val[0],val[1]]).then(t=>history.push(`/permissions/${permission.id}`))} openButtonIcon={'fa fa-edit'}
        child={currentValues(permission)} buttonTooltipText={'Edit Permission'} labels={['New Action','New Resource']} /> </td>;

    return (
        <BasicFunctionality fetchCB={getPermissions} postNewDataCB={postPermission} resource={'permissions'} editDataRenderer={editPermissionRenderer}
                            postNewDataFieldLabels={['New Action','New Resource']} deleteDataCB={deletePermissionCB} />
    );
}

export function Roles(props){
    let history = useHistory();
    const {getRoles,addRole,deleteRole,editRole} = rolesService();
    const postRole = (arr) => addRole(['',arr[0],arr[1]]);
    const deleteRoleCB = (role) => deleteRole(role.id);
    const postOptionsFetcher = () => rolesService().getRoles().then(data=>data.map(value=>({eventKey:value.id,text:value.role})));

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

    const editRoleRenderer = role => <td><SubmitValuesModal labels={['New Role',{text:'Id of the Parent Role', DropdownOptionsFetcher:postOptionsFetcher}]}
        submitListener={val =>editRole([role.id,val[0],val[1]]).then(t=>history.push(`/roles/${role.id}`))}
        openButtonIcon={'fa fa-edit'} child={currentValues(role)} buttonTooltipText={'Edit Role'}/> </td>;

    return (
        <BasicFunctionality fetchCB={getRoles} deleteDataCB={deleteRoleCB} postNewDataCB={postRole} resource={'roles'} editDataRenderer={editRoleRenderer}
                              postNewDataFieldLabels={['New Role',{text:'Id of the Parent Role', DropdownOptionsFetcher:postOptionsFetcher}]}/>
    );
}

export default UpdatableInput
