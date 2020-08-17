import React, { useContext, useEffect, useState } from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { listService, userRoleService, userService, logsService, rolesService, userListService, sessionService, UsersessionService, userHistoryService } from '../../service';
import Button from 'react-bootstrap/Button';
import UserContext from "../../UserContext";
import GenericInfoCard from "../../common/html-elements-utils/generics/GenericInfoCard";
import TablePage from "../../common/html-elements-utils/Tables/TablePage";
import GenericInfo from "../../common/html-elements-utils/generics/GenericInfo";

const SpecificUserInfo = () => <GenericInfoCard label={'User'} fetchValueById={userService().getUserById} />;

function UserRoles() {
    const postOptionsFetcher = () => rolesService().get().then(data => data.map(value => ({ eventKey: value.id, text: value.role })));

    const customService = {
        ...userRoleService(), editFields: [{ text: 'New Date (date)' }, { text: 'New Active state (check)' }],
        postFields: [{ text: 'Id of Role to be assigned (dropdown)', DropdownOptionsFetcher: postOptionsFetcher }, { text: 'New End Date (date)'}],
    };
    return <GenericInfo resource={'user-role'} service={customService}/>;
}

export function UserSessions() {
    let { id } = useParams()
    const ctx = useContext(UserContext);
    if (!id) {
        id = ctx.user.id
    }
    const serv = {
        ...UsersessionService(),
        get: () => UsersessionService().get(id),
    }

    return (
        <TablePage service={serv} resource={'listuser'} />
    );
};

function UserLists() {
    const postOptionsFetcher = () => listService().get().then(data => data.map(value => ({ eventKey: value.id, text: value.list })));

    const serv = {
        ...userListService(),
        editFields: [{ text: 'New End date (date)' }, { text: 'New Active state (check)' }],
        postFields: [{ text: 'Id of List to be assigned (dropdown)', DropdownOptionsFetcher: postOptionsFetcher }, { text: 'New Date (date)'}],
    };
    return <GenericInfo service={serv} resource={'users-lists'} />;
}
function UserHistory() {

    const serv = { ...userHistoryService() };

    return <GenericInfo service={serv} resource={'user-history'} />;
}

const components = {
    0: <SpecificUserInfo />,
    1: <UserRoles />,
    2: <UserSessions />,
    3: <UserLists />,
    4: <UserHistory />
};
const labels = ['Roles', 'Sessions', 'Lists', 'History'];

export default function UserInfo() {
    const [componentToBeShown, setComponentToBeShown] = useState(0);
    const [otherUsers, setUsers] = useState(['']);
    useEffect(() => { userService().get().then(users => setUsers(users.map(user => user.id))); }, []);
    const history = useHistory();

    return (
        <React.Fragment>

            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Navbar.Brand onClick={() => setComponentToBeShown(0)}>User Info</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                        {labels.map((comp, idx) => <Nav.Link onClick={() => setComponentToBeShown(idx + 1)}>{comp}</Nav.Link>)}
                    </Nav>
                    <Nav>
                        <NavDropdown title="Change User" id="collasible-nav-dropdown">
                            <NavDropdown.Item href={'/backoffice'}>Home</NavDropdown.Item>
                            <NavDropdown.Divider />
                            {otherUsers.map(userId => <NavDropdown.Item href={`/users/${userId}`}>{`View user: ${userId}`}</NavDropdown.Item>)}
                        </NavDropdown>
                        <Button variant="outline-secondary" onClick={() => history.push('/users')}>View All</Button>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>

            {components[componentToBeShown]}
        </React.Fragment>

    )
}