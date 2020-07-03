import React, { useEffect, useState} from 'react';
import { userService } from '../../service';
import CustomTable from '../../common/html-elements-utils/Table/CustomTable';
import { useParams } from 'react-router-dom';

export default function UserRoles() {

    const userRoleLabels = ['Role id', 'role', 'Start Date', 'End Date', 'Updater'];
    const [userRoles, setRoles] = useState([]);
    const [error,setError]=useState(undefined);
    const {id}=useParams();
    const userRolesToArray= userRole => [userRole['Roles.id'], userRole['Roles.role'], userRole['Roles.UserRoles.start_date'],
        userRole['Roles.UserRoles.end_date'], userRole['Roles.UserRoles.updater']];

    useEffect(() => {
        userService().getUserRoles(id)
            .then(data=>{
                if('err' in data){
                    console.error(data.err);
                    setError(data);
                }else{
                    setRoles(data);
                }
            });
    }, [id]);

    return (
        <React.Fragment>
            {error?<p>{error.status} {error.err}</p>: <CustomTable labels={userRoleLabels} rows={userRoles.map(userRolesToArray)} />}
        </React.Fragment>
    );
}
