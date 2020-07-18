import React, {useContext, useEffect, useState} from 'react'
import UpdatableInput from "../BackOfficeFunctionalities";
import {listService, rolesService, userListService, userService} from "../../service";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import {Link, useParams} from "react-router-dom";
import UserContext from "../../UserContext";
import GenericFunctionality from "../../common/html-elements-utils/generics/GenericFunctionality";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import {SubmitValuesModal} from "../../common/html-elements-utils/generics/GenericModal";
import Jumbotron from "react-bootstrap/Jumbotron";

function SpecificListInfo(){
    const {id} = useParams();
    const [list, setList] = useState({ username: undefined, password: undefined })
    useEffect(()=>{listService().getList(id).then(setList)},[id])

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
                        <Card.Title>{`Details of List num: ${list.id}`}</Card.Title>
                        <Card.Text>
                            This page and all his sections displays all information relative to this List.
                        </Card.Text>
                        <Form.Group>
                            {Object.keys(list).map(key=><React.Fragment>
                                <br />
                                <Form.Row>
                                    <Form.Label column lg={2}>{key}</Form.Label>
                                    <Col><Form.Control type="text" value={list[key]} /></Col>
                                </Form.Row>
                            </React.Fragment>)}
                        </Form.Group>


                    </Card.Body>
                </Card>
            </div>
        </Jumbotron>
    );
}

function ListUsers() {

    const labels = ["User Id", "Username", "Start Date", "End Date", "Updater"]
    let {id}=useParams()
    const fetchData = ()=>listService().getUsersInThisList(id)
    const ctx = useContext(UserContext);
    const addUserToList = (userId)=> userListService().addUserList(id,userId,ctx.user.id)
    const removeUserFromList = () => console.log('Still not implemented removeUserFromList')
    const listUserToLine = listUser=> <React.Fragment>
        <td><Link to={`/users/${listUser['Users.id']}`}>{`Details of User: ${listUser['Users.id']}`}</Link></td>
        <td >{listUser['Users.username']}</td>
        <td >{listUser['Users.UserList.start_date']}</td>
        <td>{listUser['Users.UserList.end_date']}</td>
        <td>{listUser['Users.UserList.updater']}</td>
        <td><SubmitValuesModal submitListener={val =>console.log('Service not Done yet',val)} openButtonIcon={'fa fa-edit'}
                               buttonTooltipText={'Edit End date'} labels={['New End Date']} /> </td>
    </React.Fragment>;
    return (

        <React.Fragment>
            <GenericFunctionality fetchCB={fetchData} deleteDataCB={removeUserFromList} postNewDataCB={(arr)=>addUserToList(arr[0])}
                                  postNewDataFieldLabels={['Id of User to add to list']} tableLabels={labels} valueToLineCB={listUserToLine} />
        </React.Fragment>
    )
}

const components = {
    0: <SpecificListInfo />,
    1: <ListUsers/>,
}
const labels = ['Users'];
export default function ListInfo() {
    const [componentToBeShown, setComponentToBeShown] = useState(0)
    const [otherLists,setLists] = useState(['']);
    useEffect(()=>{listService().getLists().then(lists=>setLists(lists.map(list=>list.id)));},[]);
    return (
        <React.Fragment>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Navbar.Brand onClick={()=>setComponentToBeShown(0)}>List Info</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                        {labels.map((comp,idx)=><Nav.Link onClick={()=>setComponentToBeShown(idx+1)}>{comp}</Nav.Link>)}

                    </Nav>
                    <Nav>
                        <NavDropdown title="Change List" id="collasible-nav-dropdown">
                            <NavDropdown.Item href={'/backoffice'}>Home</NavDropdown.Item>
                            <NavDropdown.Divider />
                            {otherLists.map(listId=><NavDropdown.Item href={`/lists/${listId}`}>{`View list: ${listId}`}</NavDropdown.Item>)}
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            {components[componentToBeShown]}
       </React.Fragment>
    )
}
