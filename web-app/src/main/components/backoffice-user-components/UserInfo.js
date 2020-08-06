import React, {useContext, useEffect, useState} from 'react';
import {Link, useParams,useHistory} from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import {listService, userRoleService, userService, logsService, rolesService, userListService} from '../../service';
import Button from 'react-bootstrap/Button';
import UserContext from "../../UserContext";
import GenericInfoCard from "../../common/html-elements-utils/GenericInfoCard";
import TablePage from "../../common/html-elements-utils/TablePage";

const SpecificUserInfo=()=><GenericInfoCard label={'User'} fetchValueById={userService().getUserById} />;

function UserRoles() {
    const postOptionsFetcher = () => rolesService().get().then(data=>data.map(value=>({eventKey:value.id,text:value.role})));
    const {id}=useParams();
    const ctx = useContext(UserContext);
    const fetchData = ()=> userRoleService().get(id);

    const customService = {...userRoleService(),editFields:[{text:'New Date (date)'},{text:'New Active state (check)'}],
        postFields:[{text:'Id of Role to be assign (dropdown)', DropdownOptionsFetcher:postOptionsFetcher}], detailsUrl:role=>`/roles/${role.id}`};
    customService.get = fetchData;
    customService.post= arr =>userRoleService().post([id,arr[0],ctx.user.id,new Date()]);

    return (
        <TablePage resource={'user-role'} service={customService}/>
    );
}

export function UserSessions(){
    let {id}=useParams()
    const postOptionsFetcher = () => userService().get().then(data=>data.map(value=>({eventKey:value.id,text:value.username})));
    const ctx = useContext(UserContext);

    const serv = {...listService(),
        detailsUrl: (listUser) => `/lists/${id}`,
        editFields: [{text:'New End date (date)'},'Active'],
        postFields: [{text:'Id of User to be assign (dropdown)', DropdownOptionsFetcher:postOptionsFetcher}],
        get:()=>listService().getUsersInThisList(id),
        update: (listUser,arr)=>userListService().editUserList(listUser.UserId,id,arr[0],arr[1]),
        post: (arr) => userListService().addUserList(id,arr[0],ctx.user.id,new Date()),
        destroy: obj=>userListService().deleteUserList(id,obj.UserId)
    }

    return (
        <TablePage service={serv} resource={'listuser'} />
    )
};

function UserLists() {
    let {id}=useParams()
    const postOptionsFetcher = () => userService().get().then(data=>data.map(value=>({eventKey:value.id,text:value.username})));
    const ctx = useContext(UserContext);

    const serv = {...userListService(),
        detailsUrl: (listUser) => `/lists/${id}`,
        editFields: [{text:'New End date (date)'},{text:'New Active state (check)'}],
        postFields: [{text:'Id of User to be assign (dropdown)', DropdownOptionsFetcher:postOptionsFetcher}],
    };
    serv.get= ()=>userListService().get(id);
    serv.post = arr => userListService().post([arr[0],id,new Date(),ctx.user.id]);

    return (
        <TablePage service={serv} resource={'users-lists'} />
    )
}

function UserLogs(){
    let {id}=useParams();

    const serv = {...logsService()};
    serv.get=()=>logsService().get(id);

    return (
        <TablePage service={serv} resource={'listuser'} />
    )
}

const components = {
    0: <SpecificUserInfo />,
    1: <UserRoles />,
    2: <UserSessions/>,
    3: <UserLists />,
    4:<UserLogs/>
};
const labels = ['Roles','Sessions','Lists','Logs'];

export default function UserInfo() {
    const [componentToBeShown, setComponentToBeShown] = useState(0);
    const [otherUsers,setUsers] = useState(['']);
    useEffect(()=>{userService().get().then(users=>setUsers(users.map(user=>user.id)));},[]);
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