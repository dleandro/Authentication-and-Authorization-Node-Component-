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
import DatePicker from "../../common/html-elements-utils/DatePicker";
import GenericInfoCard from "../../common/html-elements-utils/GenericInfoCard";


const SpecificListInfo = () => <GenericInfoCard label={'User'} fetchValueById={listService().getList} />;

function ListUsers() {

    const labels = ["User Id", "Username", "Start Date", "End Date","Active", "Updater"]
    let {id}=useParams()
    const fetchData = ()=>listService().getUsersInThisList(id)
    const ctx = useContext(UserContext);
    const addUserToList =(userId)=>userListService().addUserList(id,userId,ctx.user.id,new Date())
    const removeUserFromList = () => console.log('Still not implemented removeUserFromList')
    const postOptionsFetcher = () => userService().get().then(data=>data.map(value=>({eventKey:value.id,text:value.username})));
    let date = '';

    const listUserToLine = listUser=> <React.Fragment>
        <td><Link to={`/users/${listUser.UserId}`}>{`Details of User: ${listUser.UserId}`}</Link></td>
        <td >{listUser['User.username']}</td>
        <td >{listUser.start_date}</td>
        <td>{listUser.end_date}</td>
        <td>{listUser.active}</td>
        <td>{listUser.updater}</td>
        <td><SubmitValuesModal child={<DatePicker text={'New date'} onChange={val =>date=val}/>}
                               openButtonIcon={'fa fa-edit'} submitListener={val=>console.log('Service not done: ',date)} buttonTooltipText={'Edit End date'} /> </td>
    </React.Fragment>;
    return (

        <React.Fragment>
            <GenericFunctionality fetchCB={fetchData} deleteDataCB={removeUserFromList} postNewDataCB={(arr)=>addUserToList(arr[0])} tableLabels={labels}
                                  postNewDataFieldLabels={[{text:'Id of User to be assign', DropdownOptionsFetcher:postOptionsFetcher}]}  valueToLineCB={listUserToLine} />
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
    useEffect(()=>{listService().get().then(lists=>setLists(lists.map(list=>list.id)));},[]);
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
