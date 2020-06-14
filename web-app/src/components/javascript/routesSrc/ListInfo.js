
import React,{useEffect, useContext,useState} from 'react'
import {Redirect, Route, useParams} from 'react-router-dom'
import {Button, Dropdown} from "react-bootstrap";
import {listService,permissionService,userRoleService, rolesService} from "../service";
import UserContext from "../../Context"
import CustomTable from "../html-elements-utils/Table/CustomTable";

export default function ListInfo() {
    let { id } = useParams();
    const userRoleLabels = ["Id","Start Date","End Date","Updater"]
    const listLabels=["Id","Start Date","End Date","Updater"]
    const [list,setList]=React.useState([])
    useEffect( async ()=>{
        setList(await listService().getList(id))
    },[id])
    return (
        <div>
        <h3>{list.list} List</h3>
                         
        </div>
    )
}