import React, { useContext, useEffect, useState } from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { listService, userRoleService, userService, logsService, rolesService, userListService, sessionService, UsersessionService, userHistoryService } from '../../service';
import Button from 'react-bootstrap/Button';
import UserContext from "../../UserContext";
import GenericInfoCard from "../../common/html-elements-utils/GenericInfoCard";
import TablePage from "../../common/html-elements-utils/TablePage";

const SpecificUserInfo = () => <GenericInfoCard label={'User'} fetchValueById={userService().getUserById} />;

function UserRoles() {
    const postOptionsFetcher = () => rolesService().get().then(data => data.map(value => ({ eventKey: value.id, text: value.role })));
    const { id } = useParams();
    const ctx = useContext(UserContext);
    const fetchData = () => userRoleService().get(id)
        .then(results => results.map(result => {
            return {
                RoleId: result.RoleId,
                role: result.role,
                start_date: `${new Date(result.start_date)}`,
                end_date: result.end_date ? `${new Date(result.end_date)}` : undefined,
                active: result.active,
                updater: result.updater

            }
        }));

    const customService = {
        ...userRoleService(), editFields: [{ text: 'New Date (date)' }, { text: 'New Active state (check)' }],
        postFields: [{ text: 'Id of Role to be assigned (dropdown)', DropdownOptionsFetcher: postOptionsFetcher }, { text: 'New End Date (date)'}],
    };
    customService.get = fetchData;
    customService.post = arr => {
        console.log(arr); return userRoleService().post(id, arr[0].value, ctx.user.id, new Date(), arr[1]).then(
            result => {
                console.log(result)
                return {
                    RoleId: result.RoleId,
                    role: arr[0].label,
                    start_date: `${new Date(result.start_date)}`,
                    end_date: result.end_date ? `${new Date(result.end_date)}` : undefined,
                    active: result.active == true ? 1 : 0,
                    updater: result.updater
                }
            }
        )
    }
    customService.update = (oldObj, arr) => userRoleService().update(id, oldObj.start_date, oldObj.RoleId, ctx.user.id, arr)
        .then(result => {
            console.log(result)
            return {
                RoleId: oldObj.RoleId,
                role: oldObj.role,
                start_date: `${new Date(oldObj.start_date)}`,
                end_date: result.end_date ? `${new Date(result.end_date)}` : undefined,
                active: result.active == true ? 1 : 0,
                updater: result.updater
            }
        })

    customService.destroy = oldObj => userRoleService().destroy(id, oldObj.RoleId)
    return (
        <TablePage resource={'user-role'} service={customService} />
    );
}

export function UserSessions() {
    let { id } = useParams()
    const ctx = useContext(UserContext);
    if (!id) {
        id = ctx.user.id
    }
    const serv = {
        ...UsersessionService(),
        get: () => UsersessionService().get(id).then(results => results.map(result => {
            return {
                sid: result.sid,
                start_date: `${new Date(result.createdAt)}`,
                end_date: `${new Date(result.expires)}`,

            }
        }))
    }

    return (
        <TablePage service={serv} resource={'listuser'} />
    )
};

function UserLists() {
    let { id } = useParams()
    const postOptionsFetcher = () => listService().get().then(data => data.map(value => ({ eventKey: value.id, text: value.list })));
    const ctx = useContext(UserContext);

    const serv = {
        ...userListService(),
        editFields: [{ text: 'New End date (date)' }, { text: 'New Active state (check)' }],
        postFields: [{ text: 'Id of List to be assigned (dropdown)', DropdownOptionsFetcher: postOptionsFetcher }, { text: 'New Date (date)'}],
    };
    serv.get = () => userListService().get(id)
        .then(results => results.map(result => {
            return {
                ListId: result.ListId,
                list: result['List.list'],
                start_date: `${new Date(result.start_date)}`,
                end_date: result.end_date ? `${new Date(result.end_date)}` : undefined,
                active: result.active,
                updater: result.updater
            }
        }));
    serv.post = arr => userListService().post([arr[0].value, id, new Date(), arr[1], ctx.user.id]).then(
        result => {
            console.log(result)
            return {
                ListId: result.ListId,
                list: arr[0].label,
                start_date: `${new Date(result.start_date)}`,
                end_date: result.end_date ? `${new Date(result.end_date)}` : undefined,
                active: result.active == true ? 1 : 0,
                updater: result.updater
            }
        })
    serv.update = (oldObj, arr) => userListService().update(id, oldObj.start_date, oldObj.ListId, ctx.user.id, arr).then(
        result => {
            console.log(result, oldObj, arr)

            return {
                ListId: oldObj.ListId,
                list: oldObj.list,
                start_date: `${new Date(oldObj.start_date)}`,
                end_date: result.end_date ? `${new Date(result.end_date)}` : undefined,
                active: result.active == true ? 1 : 0,
                updater: result.updater
            }
        })
    serv.destroy = (oldObj) => userListService().destroy(oldObj.ListId, id)
    return (
        <TablePage service={serv} resource={'users-lists'} />
    )
}
function UserHistory() {
    let { id } = useParams();

    const serv = { ...userHistoryService() };
    serv.get = () => userHistoryService().get(id)
        .then(results => results.map(result => {
            delete result.user_id
            return result
        }));

    return (
        <TablePage service={serv} resource={'listuser'} />
    )
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