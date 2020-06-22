import React, { useEffect, useState, useContext } from 'react'
import { useParams } from 'react-router-dom'
import { listService, userService } from "../../service";
import CustomTable from "../../common/html-elements-utils/Table/CustomTable";
import UserContext from '../../UserContext'
import Nav from 'react-bootstrap/Nav'
import { AppBar, Tabs, Tab, TabPanel } from '@material-ui/core'
import UserRoles from './UserRoles'
import UserSessions from './UserSessions'
import UserLists from './UserLists'

const components = {
    0: <UserRoles />,
    1: <UserSessions />,
    2: <UserLists />
}

export default function UserInfo() {
    const [componentToBeShown, setComponentToBeShown] = useState(2)

    
    return (

        <React.Fragment>

            <AppBar position="static">
                <Tabs value={componentToBeShown} style={{backgroundColor: "#282c34"}} onChange={(_, newValue) => {
                    setComponentToBeShown(newValue)}
                    } aria-label="user tabs">
                    <Tab label="Roles" />
                    <Tab label="Sessions" />
                    <Tab label="Lists" />
                </Tabs>
            </AppBar>

            {
               components[componentToBeShown]
            }

       
        </React.Fragment>
    )
}