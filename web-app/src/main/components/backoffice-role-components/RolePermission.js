import React, {useEffect, useState} from 'react';
import {permissionService, rolePermissionService, rolesService} from '../../service';
import {useParams} from 'react-router-dom';
import DropdonwTable from '../../common/html-elements-utils/Table/DropdownTable';


export default function RolePermission() {

    const [rolePermissions, setRolePermissions] = useState([]);
    const [error, setError] = useState(undefined);
    const [permissions, setPermissions] = useState([]);
    const permissionLabels = ['Id', 'Action', 'Resource'];
    const { id } = useParams();
    const addRolePermission = async (e) => {
        const [first, second, third] = e.target.value.split(' ');
        rolePermissionService().addRolePermission(id, first, second, third)
            .then(rolePermissionsJoined=>setRolePermissions([...rolePermissions, {
                'Permissions.id': rolePermissionsJoined.permissionId,
                'Permissions.action': rolePermissionsJoined.action,
                'Permissions.resource': rolePermissionsJoined.resource }]));
    };
    const editRole = arr => this.service.editRole(arr);
    const deleteRole = arr => this.service.deleteRole(arr[0]);

    useEffect(() => {

        permissionService().getPermissions()
            .then(setPermissions)
            .then(()=>rolesService().getPermissionsWithThisRole(id))
            .then(data=>{
                if ('err' in data) {
                    console.error(data.err);
                    setError(data);
                } else {
                    setRolePermissions(data.filter(permission => permission['Permissions.id'] !== null));
                }
            });

    }, [id]);

    return (

        <React.Fragment>
            {
                error ? <p>{error.status} {error.err}</p> :
                    <DropdonwTable labels={permissionLabels}
                        addRequest={addRolePermission} editRequest={editRole} deleteRequest={deleteRole}
                        dropdown={permissions.map(permission=> <option value={`${permission.id} ${permission.action} ${permission.resource}`}> {permission.action} {permission.resource}</option>)}
                                   redirectPage="permissions"
                                   rows={rolePermissions.map(permission => [permission['Permissions.id'], permission['Permissions.action'], permission['Permissions.resource']])} />
            }

        </React.Fragment>
    )
}
