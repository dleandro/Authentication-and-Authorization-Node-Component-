import React, { useContext, useEffect, useState } from 'react';
import {
    listService, permissionRoleService,
    permissionService,
    rolePermissionService,
    rolesService, roleUserService, userListService,
    userRoleService,
    userService
} from "../../service";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link, useParams } from "react-router-dom";
import GenericFunctionality from "../../common/html-elements-utils/generics/GenericFunctionality";
import UserContext from "../../UserContext";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import { SubmitValuesModal } from "../../common/html-elements-utils/generics/GenericModal";
import Jumbotron from "react-bootstrap/Jumbotron";
import DatePicker from "../../common/html-elements-utils/DatePicker";
import GenericInfoCard from "../../common/html-elements-utils/GenericInfoCard";
import TablePage from "../../common/html-elements-utils/TablePage";

const SpecificRoleInfo = () => <GenericInfoCard label={'Role'} fetchValueById={rolesService().getRole} />;

function RolePermission() {
    let { id } = useParams()
    const postOptionsFetcher = () => permissionService().get().then(data => data.map(value => ({ eventKey: value.id, text: value.action + ' ' + value.resource })));
    const ctx = useContext(UserContext);

    const serv = {
        ...rolePermissionService(),
        postFields: [{ text: 'Id of Permission to be assigned (dropdown)', DropdownOptionsFetcher: postOptionsFetcher }],
    }
    serv.get = () => rolePermissionService().get(id)
        .then(results => results.map(result => ({
            PermissionId: result.PermissionId,
            action: result['Permission.action'],
            resource: result['Permission.resource']
        })));

    serv.post = arr => rolePermissionService().post([arr[0].value, id])
        .then(
            result => {
                console.log(result)
                return {
                    PermissionId: result.id,
                    action: result.action,
                    resource: result.resource
                }
            }
        )
    serv.destroy = oldObj => rolePermissionService().destroy(id, oldObj.PermissionId)

    return (
        <TablePage service={serv} resource={'listuser'} />
    )
}

export function RoleUsers() {
    let { id } = useParams();
    const postOptionsFetcher = () => userService().get().then(data => data.map(value => ({ eventKey: value.id, text: value.username })));
    const ctx = useContext(UserContext);

    const serv = {
        ...roleUserService(),
        detailsUrl: (listUser) => `/role/${id}`,
        editFields: [{ text: 'New End date (date)' }, { text: 'New Active (check)' }],
        postFields: [{ text: 'Id of User to be assigned (dropdown)', DropdownOptionsFetcher: postOptionsFetcher }],
        post: (arr) => userListService().addUserList(id, arr[0], ctx.user.id, new Date()),
    }
    serv.get = () => roleUserService().get(id)
        .then(results => results.map(result => {
            return {
                UserId: result.UserId,
                username: result['User.username'],
                start_date: `${new Date(result.start_date)}`,
                end_date: `${new Date(result.end_date)}`,
                active: result.active,
                updater: result.updater

            }
        }));
    serv.post = arr => roleUserService().post([arr[0].value, id, ctx.user.id, new Date()])
        .then(result => {
            console.log(result)
            return {
                UserId: result.UserId,
                username: arr[0].label,
                start_date: `${new Date(result.start_date)}`,
                end_date: `${new Date(result.end_date)}`,
                active: result.active == true ? 1 : 0,
                updater: result.updater
            }
        })
    serv.destroy = oldObj => roleUserService().destroy(oldObj.UserId, id)
    serv.update = (oldObj, arr) => roleUserService().update(oldObj.UserId, oldObj.start_date, id, ctx.user.id, arr)
        .then(result => {
            console.log(result)
            return {
                UserId: oldObj.UserId,
                username: oldObj.username,
                start_date: `${new Date(oldObj.start_date)}`,
                end_date: `${new Date(result.endDate)}`,
                active: result.active == true ? 1 : 0,
                updater: result.updater,
            }
        })
    return (
        <TablePage service={serv} resource={'listuser'} />
    )
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
