import React, { useEffect, useState, useContext } from 'react'
import { useParams } from 'react-router-dom'
import { listService, permissionService, userRoleService, rolesService, userService } from "../service";
import CustomTable from "../html-elements-utils/Table/CustomTable";
import UserContext from '../../Context'

export default function UserInfo() {
    let { id } = useParams();
    const userRoleLabels = ["Role id", "role", "Start Date", "End Date", "Updater"]
    const listLabels = ["Id", "Start Date", "End Date", "Updater"]
    const [userRoles, setRoles] = useState([])
    const [lists, setList] = useState([])
    const ctx = useContext(UserContext)

    useEffect(async () => {
        setRoles(await userService().getUserRoles(id))
        setList(await listService().getUserActiveLists(id))
    }, [id])
    return (
        <div>
            <h3>Username:{ctx.user.username}</h3>
            <h3>Current Roles</h3>
            <CustomTable labels={userRoleLabels} rows={userRoles.map(userRole => [userRole["Roles.id"], userRole["Roles.role"], userRole["Roles.UserRoles.start_date"], userRole["Roles.UserRoles.end_date"], userRole["Roles.UserRoles.updater"]])} />
            <h3>Current Lists</h3>
            <CustomTable labels={listLabels} redirectPage="lists" rows={lists.map(list => [list.ListId, list.start_date, list.end_date, list.updater])} />
        </div>
    )
}

