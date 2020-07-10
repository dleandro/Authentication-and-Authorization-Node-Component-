import React, {useContext, useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {UserRoles,UserSessions,UserLists} from "../BackOfficeFunctionalities";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import {authenticationService, userService} from "../../service";
import Button from "react-bootstrap/Button";
import {useHistory} from "react-router-dom";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import GoogleButton from "react-google-button";
import AuthTypeContext from "../login-components/AuthTypeContext";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";

function SpecificUserInfo(){
    const {id} = useParams();
    const [user, setUser] = useState({ username: undefined, password: undefined })
    useEffect(()=>{userService().getUserById(id).then(setUser)},[id])

    return  (
        <div className="col-4 pt-5 align-content-center mx-auto align-items-center ceform-input" id={id}>
        <Card border="primary" bg={'dark'} key={'userspecificinfocard'} text={'light'} className="mb-2">
            <Card.Header>{`Profile:  ${user.username}`}</Card.Header>
            <Card.Body>
                <Card.Title>{`Details of user num: ${user.id}`}</Card.Title>
                <Card.Text>
                   This page and all his sections displays all information relative to this User.
                </Card.Text>
                <Form.Group>
                    {Object.keys(user).map(key=><React.Fragment>
                        <br />
                        <Form.Row>
                            <Form.Label column lg={2}>{key}</Form.Label>
                            <Col><Form.Control type="text" value={user[key]} /></Col>
                        </Form.Row>
                    </React.Fragment>)}
                </Form.Group>


            </Card.Body>
        </Card>
        </div>
    );
}

const components = {
    0: <SpecificUserInfo />,
    1: <UserRoles />,
    2: <UserSessions/>,
    3: <UserLists />,
};
const labels = ['Roles','Sessions','Lists'];

export default function UserInfo() {
    const [componentToBeShown, setComponentToBeShown] = useState(0);
    const [otherUsers,setUsers] = useState(['']);
    useEffect(()=>{userService().getUsers().then(users=>setUsers(users.map(user=>user.id)));},[]);
    const history = useHistory();

    return (
        <React.Fragment>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Navbar.Brand onClick={()=>setComponentToBeShown(0)}>User Info</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                        {labels.map((comp,idx)=><Nav.Link onClick={()=>setComponentToBeShown(idx+1)}>{comp}</Nav.Link>)}
                    </Nav>
                    <Nav>
                        <NavDropdown title="Change User" id="collasible-nav-dropdown">
                            <NavDropdown.Item href={'/backoffice'}>Home</NavDropdown.Item>
                            <NavDropdown.Divider />
                            {otherUsers.map(userId=><NavDropdown.Item href={`/users/${userId}`}>{`View user: ${userId}`}</NavDropdown.Item>)}
                        </NavDropdown>
                        <Button variant="outline-secondary" onClick={()=>history.push('/users')}>View All</Button>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            {components[componentToBeShown]}
        </React.Fragment>

    )
}