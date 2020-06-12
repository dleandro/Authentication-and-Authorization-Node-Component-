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
    useEffect( async ()=>{
        setRole(await rolesService().getRole(id))
    },[id])
    return (
        <div>
        <h3>Role {role.role}</h3>
                         
        </div>
    )
}