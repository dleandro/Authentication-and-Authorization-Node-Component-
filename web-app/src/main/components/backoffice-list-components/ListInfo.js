import React, {useContext, useEffect, useState} from 'react'
import {listService, listUserService, rolesService, userListService, userService} from "../../service";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import {useParams} from "react-router-dom";
import UserContext from "../../UserContext";
import GenericInfoCard from "../../common/html-elements-utils/GenericInfoCard";
import TablePage from "../../common/html-elements-utils/TablePage";


const SpecificListInfo = () => <GenericInfoCard label={'User'} fetchValueById={listService().getList} />;

function ListUsers() {
    let {id}=useParams()
    const postOptionsFetcher = () => userService().get().then(data=>data.map(value=>({eventKey:value.id,text:value.username})));
    const ctx = useContext(UserContext);
    const serv = {...listUserService(),
        detailsUrl: (listUser) => `/lists/${id}`,
        editFields: [{text:'New End date (date)'},'Active'],
        postFields: [{text:'Id of User to be assign (dropdown)', DropdownOptionsFetcher:postOptionsFetcher}],
    }
    serv.get =()=> listUserService().get(id);
    serv.post = arr=> listUserService().post([id,arr[0],new Date(),ctx.user.id])
    return (
         <TablePage service={serv} resource={'listuser'} />
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
