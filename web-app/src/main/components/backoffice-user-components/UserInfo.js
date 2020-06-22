import React, { useState } from 'react'
import { AppBar, Tabs, Tab } from '@material-ui/core'
import UserRoles from './UserRoles'
import UserSessions from './UserSessions'
import UserLists from './UserLists'

const components = {
    0: <UserRoles />,
    1: <UserSessions />,
    2: <UserLists />
}

export default function UserInfo() {
    const [componentToBeShown, setComponentToBeShown] = useState(0)

    
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