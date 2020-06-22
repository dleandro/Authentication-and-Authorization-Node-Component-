import React, { useState } from 'react'
import { AppBar, Tabs, Tab } from '@material-ui/core'
import { Account } from './Account'
import { Sessions } from './Sessions'

export const AccountManagement = () => {

    const [componentToBeShown, setComponentToBeShown] = useState(0)

    const components = {
        0: <Account />,
        1: <Sessions />
    }

    return (

        <React.Fragment>

            <AppBar position="static">
                <Tabs value={componentToBeShown} style={{ backgroundColor: "#282c34" }} onChange={(_, newValue) => {
                    setComponentToBeShown(newValue)
                }
                } aria-label="user tabs">
                    <Tab label="Account" />
                    <Tab label="Sessions" />
                </Tabs>
            </AppBar>

            {
                components[componentToBeShown]
            }

        </React.Fragment>

    )
}
