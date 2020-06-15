import React,{useEffect, useContext,useState} from 'react'
import {Redirect, Route, useParams} from 'react-router-dom'
import {Button, Dropdown} from "react-bootstrap";
import {listService,permissionService,userRoleService, rolesService} from "../service";
import UserContext from "../../Context"
import CustomTable from "../html-elements-utils/Table/CustomTable";

export default function PermissionInfo() {
    let { id } = useParams();
    const userRoleLabels = ["Id","Start Date","End Date","Updater"]
    const listLabels=["Id","Start Date","End Date","Updater"]
    const [permission,setPermission]=React.useState([])
    useEffect( async ()=>{
        setPermission(await permissionService().getPermission(id))
    },[id])
    return (
        <div>
        <h3>Permission {permission.action} {permission.resource} </h3>
         <h3>Roles associated with this permission</h3>               
        </div>
    )
}