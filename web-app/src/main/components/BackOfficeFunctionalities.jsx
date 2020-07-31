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
import TablePage from "../common/html-elements-utils/TablePage";

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
    const customService = {...userService()};
    customService.editFields = ['New Username','New Password'];
    customService.postFields = ['New Username','New Password'];
    customService.afterUpdateRedirectUrl = id=>`/users/${id}`;
    customService.detailsUrl = id=>`/users/${id}`;

    return (
        <TablePage service={customService} resource={'users'} />
    );
}

export function Lists(props){
    const customService = {...listService()};
    customService.post= arr=>listService().post(['',arr[0]]);
    customService.update= (list,arr)=>listService().editList([list.id,arr[0]]);
    customService.editFields = ['New List'];
    customService.postFields = ['New List'];
    customService.afterUpdateRedirectUrl = id=>`/lists/${id}`;
    customService.detailsUrl = id=>`/lists/${id}`;

    return (
        <TablePage service={customService} resource={'lists'} />
    );
}

export function Permissions(props){
    const customService = {...permissionService()};
    customService.post= (arr) => permissionService().addPermission(['',arr[0],arr[1]]);
    customService.destroy= (id) => permissionService().deletePermission([id]);
    customService.update= (perm,arr)=>permissionService().editPermission([perm.id,arr[0],arr[1]]);
    customService.editFields = ['New Action','New Resource'];
    customService.postFields = ['New Action','New Resource'];
    customService.afterUpdateRedirectUrl = id=>`/permissions/${id}`;
    customService.detailsUrl = id=>`/permissions/${id}`;
    return (
        <TablePage service={customService} resource={'permissions'} />
    );
}

export function Roles(props){
    const postOptionsFetcher = () => rolesService().get().then(data=>data.map(value=>({eventKey:value.id,text:value.role})));
    const customService = {...rolesService()};
    customService.post= (arr) => rolesService().post(['',arr[0],arr[1]]);
    customService.update= (perm,arr)=>permissionService().editPermission([perm.id,arr[0],arr[1]]);
    customService.editFields = ['New Role',{text:'Id of the Parent Role (dropdown) ', DropdownOptionsFetcher:postOptionsFetcher}];
    customService.postFields = customService.editFields;
    customService.afterUpdateRedirectUrl = id=>`/roles/${id}`;
    customService.detailsUrl = id=>`/roles/${id}`;
    return (
        <TablePage service={customService} resource={'roles'} />
    );
}

export default UpdatableInput
