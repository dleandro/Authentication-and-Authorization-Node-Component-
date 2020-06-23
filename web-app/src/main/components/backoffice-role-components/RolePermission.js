import React, { useEffect, useState, useContext } from 'react'
import { userService } from "../../service";
import CustomTable from "../../common/html-elements-utils/Table/CustomTable";
import UserContext from '../../UserContext'
import { useParams } from 'react-router-dom';
import {permissionService} from "../../service"


export default function RolePermission() {

    const [rolePermissions, setRolePermissions] = useState([])
    const permissionLabels = ["Id", "Action", "Resource"]
    const ctx = useContext(UserContext)
    let {id}=useParams()
    const addRole = (arr) => this.service.addRole(arr)
    const editRole = (arr) => this.service.editRole(arr)
    const deleteRole = (arr) => this.service.deleteRole(arr[0])

    useEffect(() => {

        const setState = async () => setRolePermissions(await permissionService().getRolesWithThisPermission(id));
        
        setState()
    
    }, [])

    return (

        <React.Fragment>

<CustomTable labels={permissionLabels}
                        addRequest={addRole} editRequest={editRole} deleteRequest={deleteRole}
                        redirectPage="permissions" rows={rolePermissions.map(permission => [permission.id, permission.action,permission.resource])} />
        </React.Fragment>
    )
}
