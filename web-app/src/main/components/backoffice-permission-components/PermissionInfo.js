import React, { useEffect,useState } from 'react'
import {Link, useParams} from 'react-router-dom'
import {listService, permissionService, rolePermissionService, rolesService, userService} from "../../service";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import GenericFunctionality from "../../common/html-elements-utils/generics/GenericFunctionality";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Jumbotron from "react-bootstrap/Jumbotron";
import GenericInfoCard from "../../common/html-elements-utils/GenericInfoCard";

const SpecificPermissionInfo=()=><GenericInfoCard label={'Permission'} fetchValueById={permissionService().getPermission}/>;

function PermissionRoles() {

    const labels = ['Permission Id','Action','Resource','Role id', 'role','Parent Role'];
    const {id}=useParams();
    const fetchData = ()=> permissionService().getRolesWithThisPermission(id).then(t=>{
        console.log(t);
        return t;
    });
    const postData = (arr)=> rolePermissionService().addRolePermission(arr[0],id,arr[1],arr[2])
    const postOptionsFetcher = () => rolesService().getRoles().then(data=>data.map(value=>({eventKey:value.id,text:value.role})));


    const rolePermissionToLine = (rolePermission) => <React.Fragment>
        <td>{id}</td>
        <td>{rolePermission.action}</td>
        <td>{rolePermission.resource}</td>
        <td><Link to={`/roles/${rolePermission['Roles.id']}`}>{`Details of Roles: ${rolePermission['Roles.id']}`}</Link></td>
        <td>{rolePermission['Roles.role']}</td>
        <td>{rolePermission['Roles.parent_role']}</td>
    </React.Fragment>;

    return (
        <GenericFunctionality fetchCB={fetchData} postNewDataFieldLabels={[{text:'Id of Role to be assign', DropdownOptionsFetcher:postOptionsFetcher}]}
                              postNewDataCB={postData} tableLabels={labels} valueToLineCB={rolePermissionToLine}
                              deleteDataCB={val =>console.log('Service not Done yet',val)}/>
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
