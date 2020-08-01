import React, { useEffect,useState } from 'react'
import {Link, useParams} from 'react-router-dom'
import {listService, permissionService, rolePermissionService, rolesService, userService} from "../../service";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import GenericFunctionality from "../../common/html-elements-utils/generics/GenericFunctionality";
import GenericInfoCard from "../../common/html-elements-utils/GenericInfoCard";

const SpecificPermissionInfo=()=><GenericInfoCard label={'Permission'} fetchValueById={permissionService().getPermission}/>;

function PermissionRoles() {

    const labels = ['Role id', 'role','Parent Role'];
    const {id}=useParams();
    const fetchData = ()=> permissionService().getRolesWithThisPermission(id).then(t=>{
        console.log(t);
        return t;
    });
    const postData = (arr)=> rolePermissionService().addRolePermission(arr[0],id,arr[1],arr[2])
    const postOptionsFetcher = () => rolesService().get().then(data=>data.map(value=>({eventKey:value.id,text:value.role})));
    const deleteRolePermission= (roleId)=>rolePermissionService().deleteRolePermission(roleId,id)

    const rolePermissionToLine = (rolePermission) => <React.Fragment>
        <td><Link to={`/roles/${rolePermission.RoleId}`}>{`Details of Roles: ${rolePermission.RoleId}`}</Link></td>
        <td>{rolePermission['Role.role']}</td>
        <td>{rolePermission['Role.parent_role']}</td>
    </React.Fragment>;

    return (
        <GenericFunctionality fetchCB={fetchData} postNewDataFieldLabels={[{text:'Id of Role to be assign', DropdownOptionsFetcher:postOptionsFetcher}]}
                              postNewDataCB={postData} tableLabels={labels} valueToLineCB={rolePermissionToLine}
                              deleteDataCB={val =>deleteRolePermission(val.RoleId)}/>
    );
}

const components = {
    0: <SpecificPermissionInfo/>,
    1: <PermissionRoles/>
}
const labels = ['Roles'];
export default function PermissionInfo() {
    const [componentToBeShown, setComponentToBeShown] = useState(0)
    const [otherPermissions,setPermissions] = useState(['']);
    useEffect(()=>{permissionService().getPermissions().then(values=>setPermissions(values.map(value=>value.id)));},[]);
    return (
        <React.Fragment>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Navbar.Brand onClick={()=>setComponentToBeShown(0)}>Permission Info</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                        {labels.map((comp,idx)=><Nav.Link onClick={()=>setComponentToBeShown(idx+1)}>{comp}</Nav.Link>)}
                    </Nav>
                    <Nav>
                        <NavDropdown title="Change Permission" id="collasible-nav-dropdown">
                            <NavDropdown.Item href={'/backoffice'}>Home</NavDropdown.Item>
                            <NavDropdown.Divider />
                            {otherPermissions.map(id=><NavDropdown.Item href={`/permissions/${id}`}>{`View Permission: ${id}`}</NavDropdown.Item>)}
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            {components[componentToBeShown]}
       </React.Fragment>
    )
}
