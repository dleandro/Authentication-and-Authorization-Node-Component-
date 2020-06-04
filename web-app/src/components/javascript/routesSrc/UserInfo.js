import React from 'react'
import {userService} from '../service'
import {Button, Dropdown} from "react-bootstrap";
import DropdownButton from "react-bootstrap/DropdownButton";
import {listService,permissionService} from "../service";

export default function UserInfo({user}) {
    const [userList, setList] = React.useState('')
    const [userRoles, setRoles] = React.useState('')
    const [userPermission, setPermission] = React.useState('')
    const [request,setRequest] = React.useState({serviceFunc:()=>listService().getUserActiveLists(user.id), dataSetter:setList})

    const fetchData = () => {
        request.serviceFunc().then(data=>request.dataSetter(data))
    };


    React.useEffect(()=> fetchData(),[request])

    let prinUserValues= ()=> {
        console.log(`User= ${JSON.stringify(user)}`)
        console.log(`User List= ${JSON.stringify(userList)}`)
        console.log(`User Roles= ${JSON.stringify(userRoles)}`)
        console.log(`User Permissions= ${JSON.stringify(userPermission)}`)

    };


    return (
        <React.Fragment>
            <Button onClick={()=>setRequest({serviceFunc:()=>permissionService().getUserPermission(user.id), dataSetter:setRoles})} > Fetch User Roles</Button>
            <Button onClick={prinUserValues} > Print Info </Button>
        </React.Fragment>

    )
}
