import {listService, permissionService, rolesService, userService} from '../service'
import React, {useEffect, useState, useContext, Component} from 'react';
import CustomTable from "../common/html-elements-utils/Table/CustomTable";
import Table from "react-bootstrap/Table";
import {Link, useParams} from "react-router-dom";
import Button from "react-bootstrap/Button";
import FormControl from "react-bootstrap/FormControl";
import InputGroup from "react-bootstrap/InputGroup";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import Modal from "react-bootstrap/Modal";
import 'bootstrap/dist/css/bootstrap.min.css';

function UserModal({submitListener,labels,child}){
    const [showModal,setModal] = useState(false);
    const [value,setValue] = useState(labels?labels.map(t=>''):undefined);

    const changeValue = (i,newValue)=> setValue(value.map((elem, index) => index===i?newValue:elem));
    const submit = ()=>{
        submitListener(value);
        setModal(false);
    };

    return(<React.Fragment>
        <OverlayTrigger overlay={<Tooltip id="add">Add new User</Tooltip>}>
            <li className="list-inline-item">
                <button className="btn btn-outline-primary btn-sm rounded-0" type="button" onClick={()=>setModal(true)} ><i className="fa fa-table"/></button>
            </li>
        </OverlayTrigger>

        <Modal show={showModal} onHide={()=>setModal(false)}>
            <Modal.Header closeButton>
                <Modal.Title>Add new User</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {labels?labels.map((currElement, index) => <FormControl placeholder={currElement} onChange={e=>changeValue(index,e.target.value)}/>):undefined}
                {child}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-secondary" onClick={()=>setModal(false)}>
                    Close
                </Button>
                {labels?<Button variant="outline-primary" onClick={submit}>Save Changes</Button>:undefined}
            </Modal.Footer>
        </Modal>
    </React.Fragment>);
}

//remover li pa verde ficar com mesmo tamanho que o input
function UpdatableInput({initialValue,submitListener}){
    const [value,setValue] = useState(initialValue);

    return(<InputGroup className="mb-3">
        <FormControl placeholder={value} onChange={e=>setValue(e.target.value)}/>
        <InputGroup.Append>

            <OverlayTrigger overlay={<Tooltip id="edit">Edit!</Tooltip>}>
                <li className="list-inline-item">
                    <button className="btn btn-outline-success btn-sm rounded-0" type="button" onClick={e=>submitListener(value)} ><i className="fa fa-edit"/></button>
                </li>
            </OverlayTrigger>
            <Button variant="outline-secondary" onClick={e=>submitListener(value)}>Submit</Button>
        </InputGroup.Append>
    </InputGroup>);
}

export function UserRoles({id}) {

    const userRoleLabels = ['Role id', 'role', 'Start Date', 'End Date', 'Updater'];
    const [userRoles, setRoles] = useState([]);
    const [error,setError]=useState(undefined);
    const userRolesToArray= userRole => [userRole['Roles.id'], userRole['Roles.role'], userRole['Roles.UserRoles.start_date'],
        userRole['Roles.UserRoles.end_date'], userRole['Roles.UserRoles.updater']];

    useEffect(() => {
        userService().getUserRoles(id)
            .then(data=>{
                if('err' in data){
                    console.error(data.err);
                    setError(data);
                }else{
                    setRoles(data);
                }
            });
    }, [id]);

    return (
        <UserModal child={<React.Fragment>
            {error?<p>{error.status} {error.err}</p>: <CustomTable labels={userRoleLabels} rows={userRoles.map(userRolesToArray)} />}
        </React.Fragment>} />
    );
}



export function Users(props){
    const labels = ['Id', 'Username', 'Password'];
    const service = userService();
    const [users, setUsers] = useState([]);
    const [error,setError] = useState(undefined);
    const addUser = (arr) =>  service.addUser(arr).then(data=>setUsers([...users,data]));
    const removeUser = id => service.deleteUser([id]).then(data=>setUsers(users.filter(item => item.id !== id)));
    useEffect(()=>{
        service.getUsers().then(data=>'err' in data?setError(data):setUsers(data));
    },[]);
    useEffect(()=>{if (error)console.error('An error ocurred: ',error);},[error]);
    const userToLine = user=> <tr>
        <td><Link to={`/users/${user.id}`}>{`Details of User: ${user.id}`}</Link></td>
        <td><UpdatableInput initialValue={user.username} submitListener={val =>service.editUsername([user.id,val])}/></td>
        <td><input className="form-control border-0 text-white bg-transparent" type="text" value={'****'}/></td>
        <td><UserRoles id={user.id} /> </td>
        <td>
            <OverlayTrigger overlay={<Tooltip id="delete">Delete!</Tooltip>}>
                <li className="list-inline-item">
                    <button className="btn btn-outline-danger btn-sm rounded-0" type="button" onClick={()=>removeUser(user.id)}><i className="fa fa-trash"/></button>
                </li>
            </OverlayTrigger>
        </td>
    </tr>;


    return (
        <React.Fragment>
            {error?<p>{error.status} {error.err}</p>:

                <Table striped bordered hover variant="dark">
                    <thead>
                    <tr>
                        {labels.map(label => <th>{label}</th>)}
                        <th>
                            <UserModal submitListener={addUser} labels={['New Username','New Password']}/>
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                        {users.map(userToLine)}
                    </tbody>
                </Table>
            }
        </React.Fragment>
    );
}



export function Lists(props){
    const labels = ["Id", "List"];
    const service = listService();
    const [lists, setLists] = useState([]);
    const [error,setError] = useState(undefined);
    useEffect(()=>{
        service.getLists().then(data=>'err' in data?setError(data):setLists(data));
    },[]);
    useEffect(()=>{if (error)console.error('An error ocurred: ',error);},[error]);

    const addList = (arr) => service.addList(['',arr[0]]).then(data=>setLists([...lists,data]));
    const removeList = (id) => service.deleteList(id).then(data=>setLists(lists.filter(item=>item.id !== id)));

    const listsToLine=(list)=> <tr>
        <td><Link to={`/lists/${list.id}`}>{`Details of List: ${list.id}`}</Link></td>
        <td><UpdatableInput initialValue={list.list} submitListener={val =>service.editList([list.id,val])}/></td>
        <td>
            <OverlayTrigger overlay={<Tooltip id="delete">Delete!</Tooltip>}>
                <li className="list-inline-item">
                    <button className="btn btn-outline-danger btn-sm rounded-0" type="button" onClick={()=>removeList(list.id)}><i className="fa fa-trash"/></button>
                </li>
            </OverlayTrigger>
        </td>
    </tr>;

    return (
        <React.Fragment>
            {error?<p>{error.status} {error.err}</p>:

                <Table striped bordered hover variant="dark">
                    <thead>
                    <tr>
                        {labels.map(label => <th>{label}</th>)}
                        <th>
                            <UserModal submitListener={addList} labels={['New List']}/>
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {lists.map(listsToLine)}
                    </tbody>
                </Table>
            }
        </React.Fragment>
    );
}



export function Roles(props){
    const labels = ["Id", "Role", "Parent Role"];
    const service = rolesService();
    const [roles, setRoles] = useState([]);
    const [error,setError] = useState(undefined);
    useEffect(()=>{
        service.getRoles().then(data=>'err' in data?setError(data):setRoles(data));
    },[]);
    useEffect(()=>{if (error)console.error('An error ocurred: ',error);},[error]);
    const addRole = async (arr) => service.addRole(['',arr[0],arr[1]]).then(data=>setRoles([...roles,data]));
    const deleteRole = (id) => service.deleteRole(id).then(data=>setRoles(roles.filter(item=>item.id !== id)));


    const rolesToLine=(role)=> <tr>
        <td><Link to={`/roles/${role.id}`}>{`Details of Role: ${role.id}`}</Link></td>
        <td><UpdatableInput initialValue={role.role} submitListener={val =>service.editRole([role.id,val,role.parent_role])}/></td>
        <td><UpdatableInput initialValue={role.parent_role == null ? 'null' : role.parent_role} submitListener={val =>service.editRole([role.id,role.role,val])}/></td>
        <td>
            <OverlayTrigger overlay={<Tooltip id="delete">Delete!</Tooltip>}>
                <li className="list-inline-item">
                    <button className="btn btn-outline-danger btn-sm rounded-0" type="button" onClick={()=>deleteRole(role.id)}><i className="fa fa-trash"/></button>
                </li>
            </OverlayTrigger>
        </td>
    </tr>;

    return (
        <React.Fragment>
            {error?<p>{error.status} {error.err}</p>:

                <Table striped bordered hover variant="dark">
                    <thead>
                    <tr>
                        {labels.map(label => <th>{label}</th>)}
                        <th>
                            <UserModal submitListener={addRole} labels={['New Role','Parent Role']}/>
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {roles.map(rolesToLine)}
                    </tbody>
                </Table>
            }
        </React.Fragment>
    );
}

export function Permissions(props){
    const labels = ["Id", "Action", "Resource"];
    const service = permissionService();
    const [permissions, setPermissions] = useState([]);
    const [error,setError] = useState(undefined);
    useEffect(()=>{
        service.getPermissions().then(data=>'err' in data?setError(data):setPermissions(data));
    },[]);
    useEffect(()=>{if (error)console.error('An error ocurred: ',error);},[error]);
    const addPermission = async (arr) => service.addPermission(['',arr[0],arr[1]]).then(data=>setPermissions([...permissions,data]));
    const deletePermission = (id) => service.deletePermission([id]).then(data=>setPermissions(permissions.filter(item=>item.id !== id)));


    const permissionToLine=(permission)=> <tr>
        <td><Link to={`/permissions/${permission.id}`}>{`Details of Permission: ${permission.id}`}</Link></td>
        <td><UpdatableInput initialValue={permission.action} submitListener={val =>service.editPermission([permission.id,val,permission.resource])}/></td>
        <td><UpdatableInput initialValue={permission.resource} submitListener={val =>service.editPermission([permission.id,permission.action,val])}/></td>
        <td>
            <OverlayTrigger overlay={<Tooltip id="delete">Delete!</Tooltip>}>
                <li className="list-inline-item">
                    <button className="btn btn-outline-danger btn-sm rounded-0" type="button" onClick={()=>deletePermission(permission.id)}><i className="fa fa-trash"/></button>
                </li>
            </OverlayTrigger>
        </td>
    </tr>;

    return (
        <React.Fragment>
            {error?<p>{error.status} {error.err}</p>:

                <Table striped bordered hover variant="dark">
                    <thead>
                    <tr>
                        {labels.map(label => <th>{label}</th>)}
                        <th>
                            <UserModal submitListener={addPermission} labels={['New Action','New Resource']}/>
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {permissions.map(permissionToLine)}
                    </tbody>
                </Table>
            }
        </React.Fragment>
    );
}


export default UserModal
