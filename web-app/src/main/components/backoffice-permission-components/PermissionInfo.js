import React, { useEffect,useState } from 'react'
import { useParams } from 'react-router-dom'
import {listService, permissionService} from "../../service";
import CustomTable from "../../common/html-elements-utils/Table/CustomTable";
import { AppBar, Tabs, Tab } from '@material-ui/core';
import {ListUsers, RolePermission} from '../BackOfficeFunctionalities';
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";

const components = {
    0: <RolePermission/>
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
