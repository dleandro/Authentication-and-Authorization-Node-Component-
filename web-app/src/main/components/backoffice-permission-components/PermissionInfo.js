import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { permissionRoleService, permissionService, rolesService } from "../../service";
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import GenericInfoCard from '../../common/html-elements-utils/generics/GenericInfoCard';
import TablePage from '../../common/html-elements-utils/Tables/TablePage';
import GenericInfo from "../../common/html-elements-utils/generics/GenericInfo";

const SpecificPermissionInfo = () => <GenericInfoCard label={'Permission'} fetchValueById={permissionService().getPermission} />;

function PermissionRoles() {
    const postOptionsFetcher = () => rolesService().get().then(data => data.map(value => ({ eventKey: value.id, text: value.role })));

    const serv = {
        ...permissionRoleService(),
        postFields: [{ text: 'Id of Role to be assigned (dropdown)', DropdownOptionsFetcher: postOptionsFetcher }],
    }

    return serv ?<GenericInfo service={serv} resource={'listuser'} /> : undefined;
}

const components = {
    0: <SpecificPermissionInfo />,
    1: <PermissionRoles />
}
const labels = ['Roles'];
export default function PermissionInfo() {
    const [componentToBeShown, setComponentToBeShown] = useState(0)
    const [otherPermissions, setPermissions] = useState(['']);
    useEffect(() => { permissionService().get().then(values => setPermissions(values.map(value => value.id))); }, []);
    return (
        <React.Fragment>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Navbar.Brand onClick={() => setComponentToBeShown(0)}>Permission Info</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                        {labels.map((comp, idx) => <Nav.Link onClick={() => setComponentToBeShown(idx + 1)}>{comp}</Nav.Link>)}
                    </Nav>
                    <Nav>
                        <NavDropdown title="Change Permission" id="collasible-nav-dropdown">
                            <NavDropdown.Item href={'/backoffice'}>Home</NavDropdown.Item>
                            <NavDropdown.Divider />
                            {otherPermissions.map(id => <NavDropdown.Item href={`/permissions/${id}`}>{`View Permission: ${id}`}</NavDropdown.Item>)}
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            {components[componentToBeShown]}
        </React.Fragment>
    )
}
