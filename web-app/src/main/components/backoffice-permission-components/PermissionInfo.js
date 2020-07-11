import React, { useEffect,useState } from 'react'
import {Link, useParams} from 'react-router-dom'
import {listService, permissionService, rolePermissionService} from "../../service";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import GenericFunctionality from "../../common/html-elements-utils/generics/GenericFunctionality";

function PermissionRoles() {

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

const components = {
    0: <PermissionRoles/>
}
const labels = ['Roles'];
export default function PermissionInfo() {
    const [componentToBeShown, setComponentToBeShown] = useState(0)
    const [otherPermissions,setPermissions] = useState(['']);
    useEffect(()=>{permissionService().getPermissions().then(values=>setPermissions(values.map(value=>value.id)));},[]);
    return (
        <React.Fragment>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Navbar.Brand>Permission Info</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                        {labels.map((comp,idx)=><Nav.Link onClick={()=>setComponentToBeShown(idx)}>{comp}</Nav.Link>)}
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
