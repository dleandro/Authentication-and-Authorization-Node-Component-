
import React,{useEffect, useContext,useState} from 'react'
import {Redirect, Route, useParams} from 'react-router-dom'
import {Button, Dropdown} from "react-bootstrap";
import {listService,permissionService,userRoleService, rolesService, userService} from "../service";
import CustomTable from "../html-elements-utils/Table/CustomTable";

export default function UserInfo() {
    let { id } = useParams();
    const userRoleLabels = ["role","Start Date","End Date","Updater"]
    const listLabels=["Id","Start Date","End Date","Updater"]
    const [userRoles,setRoles]=React.useState([])
    const [lists,setList]=React.useState([])
    const [user,setUser]=React.useState([])
    useEffect( async ()=>{
        setUser(await userService().getUserById(id))
        setRoles(await userService().getUserRoles(id))
        setList(await listService().getUserActiveLists(id))
    },[id])
    return (
        <div>
            <h3>Username:{user.username}</h3>
        <h3>Current Roles</h3>
        <CustomTable labels={userRoleLabels} rows={userRoles.map(userRole=>[userRole["Roles.role"],userRole["Roles.UserRoles.start_date"],userRole["Roles.UserRoles.end_date"],userRole["Roles.UserRoles.updater"]])}/>
        <h3>Current Lists</h3>
        <CustomTable labels={listLabels} redirectPage="lists" rows={lists.map(list=>[list.ListId,list.start_date,list.end_date,list.updater])}/>
                         
        </div>
    )
}

