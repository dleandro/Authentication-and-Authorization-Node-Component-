import React, { useState } from 'react';
import {RolePermission,RoleUsers} from  '../BackOfficeFunctionalities';
import { Tabs, Tab } from '@material-ui/core';


const components = {
    0: <RolePermission/>,
    1:<RoleUsers/>,
};

export default function RoleInfo() {
    const [componentToBeShown, setComponentToBeShown] = useState(0);

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