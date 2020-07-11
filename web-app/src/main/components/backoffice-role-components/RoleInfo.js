import React, {useContext, useEffect, useState} from 'react';
import UpdatableInput from  '../BackOfficeFunctionalities';
import {permissionService, rolePermissionService, rolesService, userRoleService} from "../../service";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import {Link, useParams} from "react-router-dom";
import GenericFunctionality from "../../common/html-elements-utils/generics/GenericFunctionality";
import UserContext from "../../UserContext";

function RolePermission() {

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

const components = {
    0: <RolePermission/>,
    1:<RoleUsers/>,
};
const labels = ['Permissions','Users'];
export default function RoleInfo() {
    const [componentToBeShown, setComponentToBeShown] = useState(0);
    const [otherRoles,setRoles] = useState(['']);
    useEffect(()=>{rolesService().getRoles().then(values=>setRoles(values.map(value=>value.id)));},[]);
    return (
        <React.Fragment>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Navbar.Brand>Role Info</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                        {labels.map((comp,idx)=><Nav.Link onClick={()=>setComponentToBeShown(idx)}>{comp}</Nav.Link>)}
                    </Nav>
                    <Nav>
                        <NavDropdown title="Change Roles" id="collasible-nav-dropdown">
                            <NavDropdown.Item href={'/backoffice'}>Home</NavDropdown.Item>
                            <NavDropdown.Divider />
                            {otherRoles.map(id=><NavDropdown.Item href={`/roles/${id}`}>{`View Roles: ${id}`}</NavDropdown.Item>)}
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            {components[componentToBeShown]}
       </React.Fragment>
    )
}
