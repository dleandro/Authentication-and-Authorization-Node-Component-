import React, { useEffect, useContext, useState } from 'react'
import { Redirect, Route, useParams } from 'react-router-dom'
import { Button, Dropdown } from "react-bootstrap";
import { userRoleService, rol } from "../../service";
import UserRoles from './UserRoles';
import RolePermission from './RolePermission'
import { AppBar, Tabs, Tab } from '@material-ui/core';


const components = {
    0: <RolePermission/>,
    1:<UserRoles/>
}

export default function RoleInfo() {
    const [componentToBeShown, setComponentToBeShown] = useState(0)
    const service = userRoleService()
    let { id } = useParams();

    return (

        <React.Fragment>
            <Tabs value={componentToBeShown} indicatorColor='primary' style={{backgroundColor: "#282c34"}} onChange={(_, newValue) => {
                    setComponentToBeShown(newValue)}
                    } aria-label="user tabs">
                    <Tab label="Permissions" style={{color: 'white'}}/>
                    <Tab label="Users" style={{color: 'white'}}/>
                </Tabs>
                {
               components[componentToBeShown]
            }
       </React.Fragment>
    )
}