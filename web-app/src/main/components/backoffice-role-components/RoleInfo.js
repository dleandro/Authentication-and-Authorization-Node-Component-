import React, { useContext, useEffect, useState } from 'react';
import {permissionService, rolePermissionService, rolesService, roleUserService, userListService, userService} from "../../service";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useParams } from 'react-router-dom';
import UserContext from "../../UserContext";
import GenericInfoCard from "../../common/html-elements-utils/generics/GenericInfoCard";
import TablePage from "../../common/html-elements-utils/Tables/TablePage";
import GenericInfo from "../../common/html-elements-utils/generics/GenericInfo";

const SpecificRoleInfo = () => <GenericInfoCard label={'Role'} fetchValueById={rolesService().getRole} />;

function RolePermission() {
    const postOptionsFetcher = () => permissionService().get().then(data => data.map(value => ({ eventKey: value.id, text: `${value.action} ${value.resource}`})));

    const serv = {
        ...rolePermissionService(),
        postFields: [{ text: 'Id of Permission to be assigned (dropdown)', DropdownOptionsFetcher: postOptionsFetcher }],
    };

    return <GenericInfo service={serv} resource={'rolepermission'} />;
}

export function RoleUsers() {
    const postOptionsFetcher = () => userService().get().then(data => data.map(value => ({ eventKey: value.id, text: value.username })));

    const serv = {
        ...roleUserService(),
        editFields: [{ text: 'New End date (date)' }, { text: 'New Active (check)' }],
        postFields: [{ text: 'Id of User to be assigned (dropdown)', DropdownOptionsFetcher: postOptionsFetcher }, { text: 'New End Date (date)'}],
    }
    return <GenericInfo service={serv} resource={'roleuser'}/>;
}

const components = {
    0: <SpecificRoleInfo />,
    1: <RolePermission />,
    2: <RoleUsers />,
};
const labels = ['Permissions', 'Users'];
export default function RoleInfo() {
    const [componentToBeShown, setComponentToBeShown] = useState(0);
    const [otherRoles, setRoles] = useState(['']);
    useEffect(() => { rolesService().get().then(values => setRoles(values.map(value => value.id))); }, []);
    return (
        <React.Fragment>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Navbar.Brand onClick={() => setComponentToBeShown(0)} >Role Info</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                        {labels.map((comp, idx) => <Nav.Link onClick={() => setComponentToBeShown(idx + 1)}>{comp}</Nav.Link>)}
                    </Nav>
                    <Nav>
                        <NavDropdown title="Change Roles" id="collasible-nav-dropdown">
                            <NavDropdown.Item href={'/backoffice'}>Home</NavDropdown.Item>
                            <NavDropdown.Divider />
                            {otherRoles.map(id => <NavDropdown.Item href={`/roles/${id}`}>{`View Roles: ${id}`}</NavDropdown.Item>)}
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            {components[componentToBeShown]}
        </React.Fragment>
    )
}
