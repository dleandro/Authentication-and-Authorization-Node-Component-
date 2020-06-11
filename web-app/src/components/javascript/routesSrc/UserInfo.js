
import React,{useEffect, useContext,useState} from 'react'
import {Button, Dropdown} from "react-bootstrap";
import {listService,permissionService,userRoleService} from "../service";
import UserContext from "../../Context"
import CustomTable from "../html-elements-utils/Table/CustomTable";

export default function UserInfo() {
    const labels = ["Id"]
    const userctx=useContext(UserContext)
    const {user}=userctx
    const [userRoles,setRoles]=React.useState([])
    useEffect( async ()=>{const aux=await userRoleService().getUserRoles(user.id)
    setRoles(aux)
    },[user.id])
    return (
        <div>
        <h3>Current Roles</h3>
        <CustomTable labels={labels}
                         rows={userRoles.map(userRole=>[userRole.UserId])}/>
        </div>
    )
}

