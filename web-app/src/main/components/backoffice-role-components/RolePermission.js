import React, { useEffect, useState, useContext } from 'react'
import { userService, rolesService,rolePermissionService } from "../../service";
import CustomTable from "../../common/html-elements-utils/Table/CustomTable";
import UserContext from '../../UserContext'
import { useParams } from 'react-router-dom';
import {permissionService} from "../../service"
import DropdonwTable from "../../common/html-elements-utils/Table/DropdownTable"


export default function RolePermission() {

    const [rolePermissions, setRolePermissions] = useState([])
    const [error, setError] = useState(undefined)
    const permissionLabels = ["Id", "Action", "Resource"]
    const ctx = useContext(UserContext)
    let {id}=useParams()
    const addRolePermission = (e) => rolePermissionService().addRolePermission(e.target.value,id)
    const editRole = (arr) => this.service.editRole(arr)
    const deleteRole = (arr) => this.service.deleteRole(arr[0])

    useEffect(() => {
        const setState = async () =>{
            let data=await rolesService().getPermissionsWithThisRole(id)
            if("err" in data){
                console.log(data.err)
                setError(data)
            }
            else{
            data=data.filter(permission=>permission["Permissions.id"]!==null)
            setRolePermissions(data)
            }
        }
        
        setState()
    
    }, [])

    return (

        <React.Fragment>
            {
                error?<p>{error.status} {error.err}</p>:
                <DropdonwTable labels={permissionLabels}
                        addRequest={addRolePermission} editRequest={editRole} deleteRequest={deleteRole}
                        redirectPage="permissions" rows={rolePermissions.map(permission => [permission["Permissions.id"], permission["Permissions.action"],permission["Permissions.resource"]])} />
            }

        </React.Fragment>
    )
}
