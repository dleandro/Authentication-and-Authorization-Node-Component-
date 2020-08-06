import React, {useContext, useEffect, useState} from 'react';
import UpdatableInput from  '../BackOfficeFunctionalities';
import {
    listService,
    permissionService,
    rolePermissionService,
    rolesService, userListService,
    userRoleService,
    userService
} from "../../service";
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
import GenericInfoCard from "../../common/html-elements-utils/GenericInfoCard";
import TablePage from "../../common/html-elements-utils/TablePage";

const SpecificRoleInfo=()=><GenericInfoCard label={'Role'} fetchValueById={rolesService().getRole} />;

function RolePermission() {
    let {id}=useParams()
    const postOptionsFetcher = () => userService().get().then(data=>data.map(value=>({eventKey:value.id,text:value.username})));
    const ctx = useContext(UserContext);

    const serv = {...listService(),
        afterUpdateRedirectUrl: (listUser) => `/lists/${id}`,
        editFields: [{text:'New End date (date)'},{text:'New Active (check)'}],
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

export function RoleUsers() {
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
    /*let {id}=useParams()
    const fetchData = () => rolesService().getUsersWithThisRole(id)
    const ctx = useContext(UserContext)
    const labels = ["User id", "username",'Role Assignment date','Role expiration date','Active','Updater']
    const postUserRole = (userId)=>userRoleService().addUserRole(userId,id,ctx.user.id,new Date())
    const removeUserFromRole =(userId) => userRoleService().deleteUserRole(userId,id)
    const postOptionsFetcher = () => userService().get().then(data=>data.map(value=>({eventKey:value.id,text:value.username})));
    let date='';
    const roleUserToLine = (roleUser) => <React.Fragment>
        <td><Link to={`/users/${roleUser.UserId}`}>{`Details of user: ${roleUser.UserId}`}</Link></td>
        <td >{roleUser['User.username']}</td>
        <td >{roleUser.start_date}</td>
        <td>{roleUser.end_date}</td>
        <td>{roleUser.active}</td>
        <td>{roleUser.updater}</td>
        <td><SubmitValuesModal openButtonIcon={'fa fa-edit'} buttonTooltipText={'Edit End date'} submitListener={_=>userRoleService().editUserRole(roleUser.UserId,id,date,1)}
                               child={<DatePicker text={'New date'} onChange={val =>date=val}/>} /> </td>
    </React.Fragment>;
    return (

        <React.Fragment>
            <GenericFunctionality fetchCB={fetchData} deleteDataCB={obj=>removeUserFromRole(obj.UserId)} postNewDataCB={(arr)=>postUserRole(arr[0])} tableLabels={labels}
                                  postNewDataFieldLabels={[{text:'Id of User to be assign', DropdownOptionsFetcher:postOptionsFetcher}]}  valueToLineCB={roleUserToLine} />
        </React.Fragment>
    )*/
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
    useEffect(()=>{rolesService().get().then(values=>setRoles(values.map(value=>value.id)));},[]);
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
