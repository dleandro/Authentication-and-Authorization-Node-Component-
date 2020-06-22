/*import React, { useEffect, useState, useContext } from 'react'
import { useParams } from 'react-router-dom'
import { listService, userService } from "../../service";
import CustomTable from "../../common/html-elements-utils/Table/CustomTable";
import UserContext from '../../UserContext'


export default function UserSessions() {

    const userRoleLabels = ["Role id", "role", "Start Date", "End Date", "Updater"]
    const [userRoles, setRoles] = useState([])
    const ctx = useContext(UserContext)

    useEffect(async () => {
        setRoles(await userService().getUserRoles(id))
    }, [])
    return (

        <React.Fragment>

+
        </React.Fragment>
    )
}
*/