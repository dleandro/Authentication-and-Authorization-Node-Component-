import React, { useEffect, useState, useContext } from 'react'
import { userService } from "../../service";
import CustomTable from "../../common/html-elements-utils/Table/CustomTable";
import UserContext from '../../UserContext'
import { useParams } from 'react-router-dom';
import {permissionService} from "../../service"


export default function RolePermission() {

    const rolePermissionLabels = ["Role id", "role","Parent Role"]
    const [rolePermissions, setRolePermissions] = useState([])
    const [error,setError]=useState(undefined)
    const ctx = useContext(UserContext)
    let {id}=useParams()

    useEffect(() => {

        const setState = async () =>{
            const data=await permissionService().getRolesWithThisPermission(id)
            if("err" in data){
                console.log(data.err)
                setError(data)
            }
            else{
            setRolePermissions(data)
            }
        }
        
        setState()
    
    }, [])

    return (

        <React.Fragment>
        {
        error?<p>{error.status} {error.err}</p>:
        <CustomTable labels={rolePermissionLabels} rows={rolePermissions.map(role => [role["Roles.id"], role["Roles.role"], role["Roles.parent_role"]])} />
        }
        </React.Fragment>
    )
}
