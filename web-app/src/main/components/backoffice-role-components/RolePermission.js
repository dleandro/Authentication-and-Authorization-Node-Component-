import React, { useEffect, useState, useContext } from 'react'
import { rolesService, rolePermissionService,permissionService } from "../../service";
import UserContext from '../../UserContext'
import { useParams } from 'react-router-dom';
import DropdownTable from "../../common/html-elements-utils/Table/DropdownTable"


export default function RolePermission() {

    const [rolePermissions, setRolePermissions] = useState([])
    const [error, setError] = useState(undefined)
    const [permissions, setPermissions] = useState([])
    const permissionLabels = ["Id", "Action", "Resource"]
    const ctx = useContext(UserContext)
    let { id } = useParams()
    const addRolePermission = async (e) => {

        const rolePermissionsJoined =  await rolePermissionService().addRolePermission(id, e.target.value.split(" ")[0], e.target.value.split(" ")[1], e.target.value.split(" ")[2])
        const permission=await permissionService().getPermission(rolePermissionsJoined.PermissionId)
        setRolePermissions([...rolePermissions, { "Permissions.id": rolePermissionsJoined.PermissionId, "Permissions.action": permission.action, "Permissions.resource": permission.resource }])
    }
    const editRole = (arr) => this.service.editRole(arr)
    const deleteRole = (arr) => this.service.deleteRole(arr[0])

    

    useEffect(() => {
        const setState = async () => {
            setPermissions(await permissionService().getPermissions())
            let data = await rolesService().getPermissionsWithThisRole(id)
            if ("err" in data) {
                console.log(data.err)
                setError(data)
            }
            else {
                data = data.filter(permission => permission["Permissions.id"] !== null)
                setRolePermissions(data)
            }
        }

        setState()

    }, [])

    return (

        <React.Fragment>
            {
                error ? <p>{error.status} {error.err}</p> :
                    <DropdownTable labels={permissionLabels}
                        addRequest={addRolePermission} editRequest={editRole} deleteRequest={deleteRole}
                        dropdown={permissions.map(permission=>
                            <option value={`${permission.id} ${permission.action} ${permission.resource}`}>{permission.action} {permission.resource}</option>)} redirectPage="permissions" rows={rolePermissions.map(permission => [permission["Permissions.id"], permission["Permissions.action"], permission["Permissions.resource"]])} />
            }

        </React.Fragment>
    )
}
