
import React,{useEffect, useContext,useState} from 'react'
import {Redirect, Route, useParams} from 'react-router-dom'
import {Button, Dropdown} from "react-bootstrap";
import {listService,permissionService,userRoleService, rolesService} from "../service";
import UserContext from "../../Context"
import CustomTable from "../html-elements-utils/Table/CustomTable";

export default function ListInfo() {
    let { id } = useParams();
    const listLabels=["User Id","Username","Start Date","End Date","Updater"]
    const [list,setList]=React.useState([])
    const [users,setUsers]=React.useState([])
    useEffect( async ()=>{
        setList(await listService().getList(id))
        setUsers(await listService().getUsersInThisList(id))
    },[id])
    return (
        <div>
        <h3>{list.list} List</h3>
        <h3>Current Users in this List</h3>
        <CustomTable labels={listLabels} rows={users.map(user=>[ user["Users.id"],user["Users.username"],user["Users.UserList.start_date"],user["Users.UserList.end_date"],user["Users.UserList.updater"]])}/>          

                         
        </div>
    )
}