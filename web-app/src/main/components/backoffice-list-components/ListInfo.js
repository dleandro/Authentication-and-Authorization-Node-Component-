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
        editFields: [{text:'New End date (date)'},{ text: 'New Active state (check)' }],
        postFields: [{text:'Id of User to be assigned (dropdown)', DropdownOptionsFetcher:postOptionsFetcher}],
    }
    serv.get =()=> listUserService().get(id)
    .then(results=>results.map(result=>{
        return {
            UserId:result.UserId,
            username:result['User.username'],
            start_date:result.start_date,
            end_date:result.end_date,
            active:result.active,
            updater:result.updater
        }
    }));
    serv.post = arr=> listUserService().post([id,arr[0].value,new Date(),ctx.user.id]).then(
        result=>{
            console.log(result)
            return{
               UserId:result.UserId,
               username:arr[0].label,
                start_date: result.start_date,
                end_date: result.end_date,
                active: result.active==true?1:0,
                updater: result.updater
            }
        }
    )
    serv.update = (oldObj,arr)=>listUserService().update(oldObj.UserId,id,ctx.user.id,arr).then(
        result=>{
            console.log(result,oldObj,arr)
            
            return{
               UserId: oldObj.UserId,
               username: oldObj.username,
                start_date: oldObj.start_date,
                end_date: result.end_date,
                active: result.active==true?1:0,
                updater: result.updater
            }
        })
    serv.destroy= oldObj=>listUserService().destroy(id,oldObj.UserId)
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
