import React, { useEffect, useState } from 'react';
import CustomTable from '../../common/html-elements-utils/Table/CustomTable';
import { useParams } from 'react-router-dom';
import {permissionService} from '../../service';


export default function RolePermission() {

    const rolePermissionLabels = ['Role id', 'role','Parent Role'];
    const [rolePermissions, setRolePermissions] = useState([]);
    const [error,setError]=useState(undefined);
    const {id}=useParams();

    useEffect(() => {
        permissionService().getRolesWithThisPermission(id).then(data=>{
            if('err' in data){
                console.error(data.err);
                setError(data);
            }else{
                setRolePermissions(data);
            }
        });
    }, [id]);

    return (

        <React.Fragment>
        {error?<p>{error.status} {error.err}</p>:
        <CustomTable labels={rolePermissionLabels} rows={rolePermissions.map(role => [role['Roles.id'], role['Roles.role'], role['Roles.parent_role']])} />}
        </React.Fragment>
    );
}
