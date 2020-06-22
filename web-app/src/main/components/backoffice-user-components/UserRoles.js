import React, { useEffect, useState, useContext } from 'react'
import { userService } from "../../service";
import CustomTable from "../../common/html-elements-utils/Table/CustomTable";
import UserContext from '../../UserContext'


export default function UserRoles() {

    const userRoleLabels = ["Role id", "role", "Start Date", "End Date", "Updater"]
    const [userRoles, setRoles] = useState([])
    const ctx = useContext(UserContext)

    useEffect(() => {

        const setState = async () => setRoles(await userService().getUserRoles(ctx.user.id))
        
        setState()
    
    }, [])

    return (

        <React.Fragment>

            <CustomTable labels={userRoleLabels} rows={userRoles.map(userRole => [userRole["Roles.id"], userRole["Roles.role"], userRole["Roles.UserRoles.start_date"], userRole["Roles.UserRoles.end_date"], userRole["Roles.UserRoles.updater"]])} />

        </React.Fragment>
    )
}
