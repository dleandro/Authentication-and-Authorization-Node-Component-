import React, { useEffect, useState, useContext } from 'react'
import { userService } from "../../service";
import CustomTable from "../../common/html-elements-utils/Table/CustomTable";
import UserContext from '../../UserContext'
import { useParams } from 'react-router-dom';


export default function UserRoles() {

    const userRoleLabels = ["Role id", "role", "Start Date", "End Date", "Updater"]
    const [userRoles, setRoles] = useState([])
    const [error,setError]=useState(undefined)
    const ctx = useContext(UserContext)
    const {id}=useParams()

    useEffect(() => {
        
        const setState = async () =>{
            const data=await userService().getUserRoles(id)
         if("err" in data){
                console.log(data.err)
                setError(data)
            }
            else{
            setRoles(data)
            }
        }
        
        setState()
    
    }, [])

    return (

        <React.Fragment>
            {
                error?<p>{error.status} {error.err}</p>:
                <CustomTable labels={userRoleLabels} rows={userRoles.map(userRole => [userRole["Roles.id"], userRole["Roles.role"], userRole["Roles.UserRoles.start_date"], userRole["Roles.UserRoles.end_date"], userRole["Roles.UserRoles.updater"]])} />

            }

        </React.Fragment>
    )
}
