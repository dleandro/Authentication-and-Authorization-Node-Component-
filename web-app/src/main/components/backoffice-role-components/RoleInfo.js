import React, { useEffect, useContext, useState } from 'react'
import { Redirect, Route, useParams } from 'react-router-dom'
import { Button, Dropdown } from "react-bootstrap";
import { listService, permissionService, userRoleService, rolesService } from "../../service";
import UserContext from "../../UserContext"
import CustomTable from "../../common/html-elements-utils/Table/CustomTable";

export default function RoleInfo() {
    const service = userRoleService()
    let { id } = useParams();
    const userRoleLabels = ["User id ", "Username", "Start Date", "End Date", "Updater"]
    const permissionLabels = ["Id", "Action", "Resource"]
    const [role, setRole] = useState([])
    const [users, setUsers] = useState([])
    const [error, setError] = useState(undefined)
    const [permissions, setPermissions] = useState([])
    const addRole = (arr) => this.service.addRole(arr)
    const editRole = (arr) => this.service.editRole(arr)
    const deleteRole = (arr) => this.service.deleteRole(arr[0])

    useEffect(() => {

        async function fetchData () {
            setRole(await rolesService().getRole(id))
            setUsers(await rolesService().getUsersWithThisRole(id))
            setPermissions(await rolesService().getPermissionsWithThisRole(id))
        }
        
        fetchData()
        
    }, [id])

    return (

        <React.Fragment>
            {!error ?
                <React.Fragment>
                    <h3>Role {role.role}</h3>
                    <h3>Users with this Role</h3>
                    <CustomTable labels={userRoleLabels}
                        addRequest={addRole} editRequest={editRole} deleteRequest={deleteRole}
                        redirectPage="users" rows={users.map(user => [user["Users.id"], user["Users.username"], user["Users.UserRoles.start_date"], user["Users.UserRoles.end_date"], user["Users.UserRoles.updater"]])} />
                    <h3>Permissions associated to this role</h3>
                    <CustomTable labels={permissionLabels}
                        addRequest={addRole} editRequest={editRole} deleteRequest={deleteRole}
                        redirectPage="permissions" rows={permissions.map(permission => [permission["Permissions.id"], permission["Permissions.action"], permission["Permissions.resource"]])} />
                </React.Fragment>
                :
                <p>{this.state.error.status} {this.state.error.err}</p>}
        </React.Fragment>
    )
}