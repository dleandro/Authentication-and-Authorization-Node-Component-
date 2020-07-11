import React, {useContext, useEffect, useState} from 'react'
import UpdatableInput from "../BackOfficeFunctionalities";
import {listService, userListService, userService} from "../../service";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import {Link, useParams} from "react-router-dom";
import UserContext from "../../UserContext";
import GenericFunctionality from "../../common/html-elements-utils/generics/GenericFunctionality";


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
        <td><UpdatableInput initialValue={listUser['Users.UserList.end_date']} submitListener={val =>console.log('Service of edit endDate still notdone value:',val)}/></td>
        <td>{listUser['Users.UserList.updater']}</td>
    </React.Fragment>;
    return (

        <React.Fragment>
            <GenericFunctionality fetchCB={fetchData} deleteDataCB={removeUserFromList} postNewDataCB={(arr)=>addUserToList(arr[0])}
                                  postNewDataFieldLabels={['Id of User to add to list']} tableLabels={labels} valueToLineCB={listUserToLine} />
        </React.Fragment>
    )
}

const components = {
    0: <ListUsers/>,
}
const labels = ['Users'];
export default function ListInfo() {
    const [componentToBeShown, setComponentToBeShown] = useState(0)
    const [otherLists,setLists] = useState(['']);
    useEffect(()=>{listService().getLists().then(lists=>setLists(lists.map(list=>list.id)));},[]);
    return (
        <React.Fragment>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Navbar.Brand>List Info</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                        {labels.map((comp,idx)=><Nav.Link onClick={()=>setComponentToBeShown(idx)}>{comp}</Nav.Link>)}

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
