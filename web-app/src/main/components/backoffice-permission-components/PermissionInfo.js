import React, { useEffect,useState } from 'react'
import { useParams } from 'react-router-dom'
import { permissionService } from "../../service";
import CustomTable from "../../common/html-elements-utils/Table/CustomTable";
import { AppBar, Tabs, Tab } from '@material-ui/core';
import RolePermission from "./RolePermission"

const components = {
    0: <RolePermission/>
}

export default function PermissionInfo() {
    const [componentToBeShown, setComponentToBeShown] = useState(0)
    let { id } = useParams();
    

    useEffect(() => {

        const setState = async () => {

            
        };
        setState();

    }, [id]);
    return (
        <React.Fragment>
            <Tabs value={componentToBeShown} indicatorColor='primary'  style={{backgroundColor: "#282c34"}} onChange={(_, newValue) => {
                    setComponentToBeShown(newValue)}
                    } aria-label="user tabs">
                    <Tab label="Roles" style={{color: 'white'}} />
                </Tabs>
                {
               components[componentToBeShown]
            }
       </React.Fragment>
    )
}