
import React, { useEffect,useState } from 'react'
import { Tabs, Tab } from '@material-ui/core';
import {ListUsers} from "../BackOfficeFunctionalities";

const components = {
    0: <ListUsers/>
}

export default function ListInfo() {
    const [componentToBeShown, setComponentToBeShown] = useState(0)

    return (
        <React.Fragment>
            <Tabs value={componentToBeShown} indicatorColor='primary'  style={{backgroundColor: "#282c34"}} onChange={(_, newValue) => {
                    setComponentToBeShown(newValue)}
                    } aria-label="user tabs">
                    <Tab label="Users" style={{color: 'white'}}/>
                </Tabs>
                {
               components[componentToBeShown]
            }
       </React.Fragment>
    )
}