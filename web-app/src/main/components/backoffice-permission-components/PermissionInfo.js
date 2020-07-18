import React, { useEffect,useState } from 'react'
import {Link, useParams} from 'react-router-dom'
import {listService, permissionService, rolePermissionService, userService} from "../../service";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import GenericFunctionality from "../../common/html-elements-utils/generics/GenericFunctionality";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Jumbotron from "react-bootstrap/Jumbotron";

function SpecificPermissionInfo(){
    const {id} = useParams();
    const [permission, setPermission] = useState({ username: undefined, password: undefined })
    useEffect(()=>{permissionService().getPermission(id).then(setPermission)},[id])

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
                        <Card.Title>{`Details of permission num: ${permission.id}`}</Card.Title>
                        <Card.Text>
                            This page and all his sections displays all information relative to this Permission.
                        </Card.Text>
                        <Form.Group>
                            {Object.keys(permission).map(key=><React.Fragment>
                                <br />
                                <Form.Row>
                                    <Form.Label column lg={2}>{key}</Form.Label>
                                    <Col><Form.Control type="text" value={permission[key]} /></Col>
                                </Form.Row>
                            </React.Fragment>)}
                        </Form.Group>


                    </Card.Body>
                </Card>
            </div>
        </Jumbotron>
    );
}

function PermissionRoles() {

    const labels = ['Permission Id','Action','Resource','Role id', 'role','Parent Role'];
    const {id}=useParams();
    const fetchData = ()=> permissionService().getRolesWithThisPermission(id).then(t=>{
        console.log(t);
        return t;
    });
    const postData = (arr)=> rolePermissionService().addRolePermission(arr[0],id,arr[1],arr[2])


    const rolePermissionToLine = (rolePermission) => <React.Fragment>
        <td>{id}</td>
        <td>{rolePermission.action}</td>
        <td>{rolePermission.resource}</td>
        <td><Link to={`/roles/${rolePermission['Roles.id']}`}>{`Details of Roles: ${rolePermission['Roles.id']}`}</Link></td>
        <td>{rolePermission['Roles.role']}</td>
        <td>{rolePermission['Roles.parent_role']}</td>
    </React.Fragment>;

    return (
        <GenericFunctionality fetchCB={fetchData} postNewDataFieldLabels={['Role Id','Action','Resource']} postNewDataCB={postData}
                              tableLabels={labels} valueToLineCB={rolePermissionToLine} />
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
