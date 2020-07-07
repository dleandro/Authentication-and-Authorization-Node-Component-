import React, {useEffect, useState} from 'react';
import {UserRoles,UserSessions,UserLists} from "../BackOfficeFunctionalities";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import {userService} from "../../service";

const components = {
    0: <UserRoles />,
    1: <UserSessions/>,
    2: <UserLists />,
};
const labels = ['Roles','Sessions','Lists'];

export default function UserInfo() {
    const [componentToBeShown, setComponentToBeShown] = useState(0);
    const [otherUsers,setUsers] = useState(['']);
    useEffect(()=>{userService().getUsers().then(users=>setUsers(users.map(user=>user.id)));},[]);
    return (
        <React.Fragment>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Navbar.Brand>User Info</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                        {labels.map((comp,idx)=><Nav.Link onClick={()=>setComponentToBeShown(idx)}>{comp}</Nav.Link>)}

                    </Nav>
                    <Nav>
                        <NavDropdown title="Change User" id="collasible-nav-dropdown">
                            <NavDropdown.Item href={'/backoffice'}>Home</NavDropdown.Item>
                            <NavDropdown.Divider />
                            {otherUsers.map(userId=><NavDropdown.Item href={`/users/${userId}`}>{`View user: ${userId}`}</NavDropdown.Item>)}
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            {components[componentToBeShown]}
        </React.Fragment>

    )
}