import React,{useEffect, useContext,useState} from 'react'
import {Redirect, Route, useParams} from 'react-router-dom'
import {Button, Dropdown} from "react-bootstrap";
import {listService,permissionService,userRoleService, rolesService} from "../service";
import UserContext from "../../Context"
import CustomTable from "../html-elements-utils/Table/CustomTable";

export default function RoleInfo() {
    let { id } = useParams();
    const userRoleLabels = ["Id","Start Date","End Date","Updater"]
    const listLabels=["Id","Start Date","End Date","Updater"]
    const [role,setRole]=React.useState([])
    const [users,setUsers]=React.useState([])
    useEffect( async ()=>{
        setRole(await rolesService().getRole(id))
        setUsers(await rolesService().getUsersWithThisRole(id))
        users.map(user=>alert(user["Users.username"]))
    },[id])
    return (
        <div>
        <h3>Role {role.role}</h3>
         <h3>Users with this Role</h3>
         <h3>Permissions associated to this role</h3>                
        </div>
    )
}