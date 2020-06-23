import React, { useEffect, useState, useContext } from 'react'
import { rolesService } from "../../service";
import CustomTable from "../../common/html-elements-utils/Table/CustomTable";
import UserContext from '../../UserContext'
import { useParams } from 'react-router-dom';


export default function UserRoles() {
    let {id}=useParams()
    const userRoleLabels = ["User id", "username"]
    const [users, setUsers] = useState([])
    const ctx = useContext(UserContext)
    const addRole = (arr) => this.service.addRole(arr)
    const editRole = (arr) => this.service.editRole(arr)
    const deleteRole = (arr) => this.service.deleteRole(arr[0])

    useEffect(() => {

        const setState = async () =>  setUsers(await rolesService().getUsersWithThisRole(id))
        
        setState()
    
    }, [])

    return (

        <React.Fragment>

<CustomTable labels={userRoleLabels}
                        addRequest={addRole} editRequest={editRole} deleteRequest={deleteRole}
                        redirectPage="users" rows={users.map(user => [user["Users.id"], user["Users.username"], user["Users.UserRoles.start_date"], user["Users.UserRoles.end_date"], user["Users.UserRoles.updater"]])} />
        </React.Fragment>
    )
}
