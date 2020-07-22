import React, {useContext, useEffect, useState} from 'react';
import {Link, useParams,useHistory} from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import {listService, sessionService, userRoleService, userService, historyService, rolesService} from '../../service';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from "react-bootstrap/Col";
import Form from 'react-bootstrap/Form';
import GenericFunctionality from '../../common/html-elements-utils/generics/GenericFunctionality';
import UserContext from "../../UserContext";
import {SubmitValuesModal} from "../../common/html-elements-utils/generics/GenericModal";
import DatePicker from "../../common/html-elements-utils/DatePicker";
import GenericInfoCard from "../../common/html-elements-utils/GenericInfoCard";

const SpecificUserInfo=()=><GenericInfoCard label={'User'} fetchValueById={userService().getUserById} />;

function UserRoles() {
    const {id}=useParams();
    const fetchData = ()=> userRoleService().getUsersRoles(id);
    const postOptionsFetcher = () => rolesService().getRoles().then(data=>data.map(value=>({eventKey:value.id,text:value.role})))
    const labels = ['Role id', 'role', 'Start Date', 'End Date', 'Updater'];
    const postUserRole = (roleId,updater)=>userRoleService().addUserRole(id,roleId,updater)
    const removeRoleFromUser = (roleId) => console.log('Remove Role from user still needs service')

    const userRoleToLine = userRole=> <React.Fragment>
        <td><Link to={`/roles/${userRole['Roles.id']}`}>{`Details of Role: ${userRole['Roles.id']}`}</Link></td>
        <td >{userRole["Role.role"]}</td>
        <td >{userRole.start_date}</td>
        <td>{userRole.end_date}</td>
        <td>{userRole.updater}</td>
        <td><SubmitValuesModal child={<DatePicker text={'New date'} onChange={val =>console.log('Service not Done yet',val)}/>} openButtonIcon={'fa fa-calendar'}
                               buttonTooltipText={'Edit End Date'}  /> </td>
    </React.Fragment>;
    return (
            <GenericFunctionality fetchCB={fetchData} deleteDataCB={removeRoleFromUser} postNewDataCB={(arr)=>postUserRole(arr[0],arr[1])}
                                  postNewDataFieldLabels={[{text:'Id of Role to be assign', DropdownOptionsFetcher:postOptionsFetcher}]}
                                  tableLabels={labels} valueToLineCB={userRoleToLine} />
    );
}

export function UserSessions(){

    const labels = ['User id','Session Id','Expires'];
    const ctx = useContext(UserContext);
    const id=ctx.user.id;
    const fetchData = ()=> sessionService().getSession(id);

    const sessionToLine = (session)=> <React.Fragment>
        <td>{session.UserId}</td>
        <td>{session.sid}</td>
        <td>{session.expires}</td>
        <td><SubmitValuesModal child={<DatePicker text={'New date'} onChange={val =>console.log('Service not Done yet',val)}/>} openButtonIcon={'fa fa-calendar'}
                               buttonTooltipText={'Edit End Date'}  /> </td>
    </React.Fragment>;
    return (
        <GenericFunctionality fetchCB={fetchData} deleteDataCB={val =>console.log('Service not Done yet',val)} tableLabels={labels} valueToLineCB={sessionToLine} />
    );
};

function UserLists() {

    const labels = ['Id', 'Start Date', 'End Date', 'Updater'];
    const ctx = useContext(UserContext);
    const fetchData = ()=> listService().getUserActiveLists(ctx.user.id);
    const postOptionsFetcher = () => listService().getLists().then(data=>data.map(value=>({eventKey:value.id,text:value.list})));

    const listToLine=(list)=><React.Fragment>
        <td><Link to={`/lists/${list.ListId}`}>{`Details of List: ${list.ListId}`}</Link></td>
        <td>{list.start_date}</td>
        <td>{list.end_date}</td>
        <td>{list.updater}</td>
        <td><SubmitValuesModal child={<DatePicker text={'New date'} onChange={val =>console.log('Service not Done yet',val)}/>}
                               openButtonIcon={'fa fa-calendar'} buttonTooltipText={'Edit End Date'} /> </td>
    </React.Fragment>;
    return (
        <GenericFunctionality fetchCB={fetchData} postNewDataFieldLabels={[{text:'Id of List to be assign', DropdownOptionsFetcher:postOptionsFetcher}]}
                              tableLabels={labels} deleteDataCB={val =>console.log('Service not Done yet',val)}
                              postNewDataCB={val =>console.log('Service not Done yet',val)} valueToLineCB={listToLine} />
    );
}

function UserHistory(){
    const labels = ['Id','UserId', 'Date', 'Success','Action','Resource','IP'];
    const ctx = useContext(UserContext);
    const fetchData = ()=> historyService().getUserHistory(ctx.user.id);

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
    );
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