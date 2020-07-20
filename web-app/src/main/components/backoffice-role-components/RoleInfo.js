import React, {useContext, useEffect, useState} from 'react';
import UpdatableInput from  '../BackOfficeFunctionalities';
import {permissionService, rolePermissionService, rolesService, userRoleService} from "../../service";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import {Link, useParams} from "react-router-dom";
import GenericFunctionality from "../../common/html-elements-utils/generics/GenericFunctionality";
import UserContext from "../../UserContext";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import {SubmitValuesModal} from "../../common/html-elements-utils/generics/GenericModal";
import Jumbotron from "react-bootstrap/Jumbotron";
import DatePicker from "../../common/html-elements-utils/DatePicker";

function SpecificRoleInfo(){
    const {id} = useParams();
    const [role, setRole] = useState({ username: undefined, password: undefined })
    useEffect(()=>{rolesService().getRole(id).then(setRole)},[id])

    return  (
        <Jumbotron style={{
            backgroundImage: `url(https://cdn.hipwallpaper.com/i/83/34/LEHn4v.jpg)`, backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            height: '90vh'
        }}>
            <div className="col-4 pt-5 align-content-center mx-auto align-items-center ceform-input" id={id}>
                <Card border="primary" bg={'dark'} key={'userspecificinfocard'} text={'light'} className="mb-2">
                    <Card.Body>
                        <Card.Title>{`Details of Role num: ${role.id}`}</Card.Title>
                        <Card.Text>
                            This page and all his sections displays all information relative to this Role.
                        </Card.Text>
                        <Form.Group>
                            {Object.keys(role).map(key=><React.Fragment>
                                <br />
                                <Form.Row>
                                    <Form.Label column lg={2}>{key}</Form.Label>
                                    <Col><Form.Control type="text" value={role[key]} /></Col>
                                </Form.Row>
                            </React.Fragment>)}
                        </Form.Group>


                    </Card.Body>
                </Card>
            </div>
        </Jumbotron>
    );
}

function RolePermission() {

    const labels = ['Role id', 'role','Parent Role','Permission Id','Action','Resource'];
    const {id}=useParams();
    const fetchData = ()=> rolesService().getPermissionsWithThisRole(id).then(t=>{
        console.log(t);
        return t;
    });
    const postData = (arr)=> rolePermissionService().addRolePermission(id,arr[0],arr[1],arr[2])


    const rolePermissionToLine = (rolePermission) => <React.Fragment>
        <td>{id}</td>
        <td>{rolePermission.role}</td>
        <td>{rolePermission.parent_role}</td>
        <td><Link to={`/permissions/${rolePermission['Permissions.id']}`}>{`Details of Permission: ${rolePermission['Permissions.id']}`}</Link></td>
        <td>{rolePermission['Permissions.action']}</td>
        <td>{rolePermission['Permissions.resource']}</td>
    </React.Fragment>;

    return (
        <GenericFunctionality fetchCB={fetchData} postNewDataFieldLabels={['Permission Id','Action','Resource']} postNewDataCB={postData}
                              tableLabels={labels} valueToLineCB={rolePermissionToLine} />
    );
}

export function RoleUsers() {
    let {id}=useParams()
    const fetchData = () => rolesService().getUsersWithThisRole(id)
    const ctx = useContext(UserContext)
    const labels = ["User id", "username",'Role Assignment date','Role expiration date','Updater']
    const postUserRole = (userId)=>userRoleService().addUserRole(userId,id,ctx.user.id)
    const removeUserFromRole = ()=> console.log('Still not implemented');


    const roleUserToLine = (roleUser) => <React.Fragment>
        <td><Link to={`/users/${roleUser['Users.id']}`}>{`Details of user: ${roleUser['Users.id']}`}</Link></td>
        <td >{roleUser['Users.username']}</td>
        <td >{roleUser['Users.UserRoles.start_date']}</td>
        <td>{roleUser['Users.UserRoles.end_date']}</td>
        <td>{roleUser['Users.UserRoles.updater']}</td>
        <td><SubmitValuesModal openButtonIcon={'fa fa-edit'} buttonTooltipText={'Edit End date'}
                               child={<DatePicker text={'New date'} onChange={val =>console.log('Service not Done yet',val)}/>} /> </td>
    </React.Fragment>;
    return (

        <React.Fragment>
            <GenericFunctionality fetchCB={fetchData} deleteDataCB={removeUserFromRole} postNewDataCB={(arr)=>postUserRole(arr[0])}
                                  postNewDataFieldLabels={['Id of User to be assign']} tableLabels={labels} valueToLineCB={roleUserToLine} />
        </React.Fragment>
    )
}

const components = {
    0: <SpecificRoleInfo />,
    1: <RolePermission/>,
    2:<RoleUsers/>,
};
const labels = ['Permissions','Users'];
export default function RoleInfo() {
    const [componentToBeShown, setComponentToBeShown] = useState(0);
    const [otherRoles,setRoles] = useState(['']);
    useEffect(()=>{rolesService().getRoles().then(values=>setRoles(values.map(value=>value.id)));},[]);
    return (
        <React.Fragment>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Navbar.Brand onClick={()=>setComponentToBeShown(0)} >Role Info</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                        {labels.map((comp,idx)=><Nav.Link onClick={()=>setComponentToBeShown(idx+1)}>{comp}</Nav.Link>)}
                    </Nav>
                    <Nav>
                        <NavDropdown title="Change Roles" id="collasible-nav-dropdown">
                            <NavDropdown.Item href={'/backoffice'}>Home</NavDropdown.Item>
                            <NavDropdown.Divider />
                            {otherRoles.map(id=><NavDropdown.Item href={`/roles/${id}`}>{`View Roles: ${id}`}</NavDropdown.Item>)}
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            {components[componentToBeShown]}
       </React.Fragment>
    )
}
