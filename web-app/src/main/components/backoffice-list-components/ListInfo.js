
import React, { useEffect,useState } from 'react'
import { useParams } from 'react-router-dom'
import { listService } from "../../service";
import CustomTable from "../../common/html-elements-utils/Table/CustomTable";
import { AppBar, Tabs, Tab } from '@material-ui/core';
import Users from "./Users"

const components = {
    0: <Users/>
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