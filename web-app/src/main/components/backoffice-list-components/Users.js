import React, { useEffect, useState, useContext } from 'react'
import CustomTable from "../../common/html-elements-utils/Table/CustomTable";
import { useParams } from 'react-router-dom';
import {listService} from "../../service"


export default function Users() {

    const listLabels = ["User Id", "Username", "Start Date", "End Date", "Updater"]
    const [users, setUsers] = React.useState([])
    const [error, setError] = React.useState(undefined)
    let {id}=useParams()

    useEffect(() => {
        const setState = async () =>{
            const data=await listService().getUsersInThisList(id)
            if("err" in data){
                console.log(data.err)
                setError(data)
            }
            else{
            setUsers(data)
            }
            }
        
        setState()
    
    }, [])

    return (

        <React.Fragment>
            { error?<p>{error.status} {error.err}</p>:
            <CustomTable labels={listLabels} rows={users.map(user => [user["Users.id"], user["Users.username"], user["Users.UserList.start_date"], user["Users.UserList.end_date"], user["Users.UserList.updater"]])} />
    }
        </React.Fragment>
    )
}