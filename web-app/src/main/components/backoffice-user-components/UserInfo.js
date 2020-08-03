import React, {useContext, useEffect, useState} from 'react';
import {Link, useParams,useHistory} from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import {listService, sessionService, userRoleService, userService, historyService, rolesService, userListService, permissionService} from '../../service';
import Button from 'react-bootstrap/Button';
import GenericFunctionality from '../../common/html-elements-utils/generics/GenericFunctionality';
import UserContext from "../../UserContext";
import {SubmitValuesModal} from "../../common/html-elements-utils/generics/GenericModal";
import DatePicker from "../../common/html-elements-utils/DatePicker";
import GenericInfoCard from "../../common/html-elements-utils/GenericInfoCard";
import TablePage from "../../common/html-elements-utils/TablePage";

const SpecificUserInfo=()=><GenericInfoCard label={'User'} fetchValueById={userService().getUserById} />;

function UserRoles() {
    const postOptionsFetcher = () => rolesService().get().then(data=>data.map(value=>({eventKey:value.id,text:value.role})));
    const {id}=useParams();
    const ctx = useContext(UserContext)
    const fetchData = ()=> userRoleService().getUsersRoles(id);

    const customService = {...userRoleService()};
    customService.get = fetchData;
    customService.post= (arr)=>userRoleService().addUserRole(id,arr[0],ctx.user.id,new Date());
    customService.destroy = id => userRoleService().deleteUserRole(ctx.user.id,id);
    customService.update= (perm,arr)=>permissionService().editPermission([perm.id,arr[0],arr[1]]);
    customService.editFields = [{text:'New Date (date)'}];
    customService.postFields = [{text:'Id of Role to be assign (dropdown)', DropdownOptionsFetcher:postOptionsFetcher}];
    customService.afterUpdateRedirectUrl = role=>`/roles/${role.id}`;
    customService.detailsUrl = role=>`/roles/${role.id}`;

    return (
        <TablePage resource={'user-role'} service={customService}/>
    );
}

export function UserSessions(){
/*
    const labels = ['User id','Session Id','Expires'];
    const ctx = useContext(UserContext);
    const id=ctx.user.id;
    const fetchData = ()=> sessionService().getSession(id);
    let date=''
    const sessionToLine = (session)=> <React.Fragment>
        <td>{session.UserId}</td>
        <td>{session.sid}</td>
        <td>{session.expires}</td>
        <td><SubmitValuesModal child={<DatePicker text={'New date'} onChange={val=>date=val}/>}  openButtonIcon={'fa fa-calendar'}
                submitListener={_=>sessionService().editSession(date,session.sid)} buttonTooltipText={'Edit End Date'}  /> </td>
    </React.Fragment>;
    return (
        <GenericFunctionality fetchCB={fetchData} deleteDataCB={obj =>sessionService().deleteSession(obj.sid)} tableLabels={labels} valueToLineCB={sessionToLine} />
    );*/
    let {id}=useParams()
    const postOptionsFetcher = () => userService().get().then(data=>data.map(value=>({eventKey:value.id,text:value.username})));
    const ctx = useContext(UserContext);

    const serv = {...listService(),
        afterUpdateRedirectUrl: (listUser) => `/lists/${id}`,
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
    /*const {id}=useParams();
    const labels = ['Id', 'Start Date', 'End Date','Active', 'Updater'];
    const ctx = useContext(UserContext);

    const postOptionsFetcher = () => listService().get().then(data=>data.map(value=>({eventKey:value.id,text:value.list})));
    const fetchData = ()=> listService().getUserLists(ctx.user.id);
    const postUserList = (listId)=>userListService().addUserList(listId,id,ctx.user.id,new Date())
    const removeUserList = (listId) => userListService().deleteUserList(listId,ctx.user.id)
    let date='';
    const listToLine=(list)=><React.Fragment>
        <td><Link to={`/lists/${list.ListId}`}>{`Details of List: ${list.ListId}`}</Link></td>
        <td>{list.start_date}</td>
        <td>{list.end_date}</td>
        <td>{list.active}</td>
        <td>{list.updater}</td>
        <td><SubmitValuesModal child={<DatePicker text={'New date'} onChange={val=>date=val}/>} submitListener={_=>userListService().editUserList(ctx.user.id,list.ListId,date,1)}
                               openButtonIcon={'fa fa-calendar'} buttonTooltipText={'Edit End Date'} /> </td>
    </React.Fragment>;
    return (
        <GenericFunctionality fetchCB={fetchData} postNewDataFieldLabels={[{text:'Id of List to be assign', DropdownOptionsFetcher:postOptionsFetcher}]}
                              tableLabels={labels} deleteDataCB={obj=>removeUserList(obj.ListId)}
                              postNewDataCB={(arr)=>postUserList(arr[0])} valueToLineCB={listToLine} />
    );*/
    let {id}=useParams()
    const postOptionsFetcher = () => userService().get().then(data=>data.map(value=>({eventKey:value.id,text:value.username})));
    const ctx = useContext(UserContext);

    const serv = {...listService(),
        afterUpdateRedirectUrl: (listUser) => `/lists/${id}`,
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
}

function UserHistory(){
    /*const labels = ['Id','UserId', 'Date', 'Success','Action','Resource','IP'];
    const {id}=useParams()
    const fetchData = ()=> historyService().getUserHistory(id);

    const listToLine=(history)=><React.Fragment>
        <td>{history.id}</td>
        <td>{history.user_id}</td>
        <td>{history.date}</td>
        <td>{history.success}</td>
        <td>{history.action}</td>
        <td>{history.resource}</td>
        <td>{history.from}</td>
    </React.Fragment>;
    return (
        <GenericFunctionality fetchCB={fetchData} tableLabels={labels} valueToLineCB={listToLine} />
    );*/
    let {id}=useParams()
    const postOptionsFetcher = () => userService().get().then(data=>data.map(value=>({eventKey:value.id,text:value.username})));
    const ctx = useContext(UserContext);

    const serv = {...listService(),
        afterUpdateRedirectUrl: (listUser) => `/lists/${id}`,
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
}

const components = {
    0: <SpecificUserInfo />,
    1: <UserRoles />,
    2: <UserSessions/>,
    3: <UserLists />,
    4:<UserHistory/>
};
const labels = ['Roles','Sessions','Lists','History'];

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