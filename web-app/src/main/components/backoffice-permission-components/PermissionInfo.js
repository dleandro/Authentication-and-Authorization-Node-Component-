import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { permissionService } from "../../service";
import CustomTable from "../../common/html-elements-utils/Table/CustomTable";

export default function PermissionInfo() {
    let { id } = useParams();
    const userRoleLabels = ["Id", "Start Date", "End Date", "Updater"]
    const listLabels = ["Id", "Start Date", "End Date", "Updater"]
    const [permission, setPermission] = React.useState([])
    const [roles, setRoles] = React.useState([])
    useEffect(() => {

        const setState = async () => {

            setPermission(await permissionService().getPermission(id))
            setRoles(await permissionService().getRolesWithThisPermission(id))

        }

        setState()

    }, [id])
    return (
        <div>
            <h3>Permission {permission.action} {permission.resource} </h3>
            <h3>Roles associated with this permission</h3>
            <CustomTable labels={userRoleLabels} rows={roles.map(role => [role["Roles.id"], role["Roles.role"], role["Roles.UserRoles.start_date"]])} />
        </div>
    )
}