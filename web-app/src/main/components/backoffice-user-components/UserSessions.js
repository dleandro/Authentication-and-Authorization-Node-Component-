import React, { useEffect, useState, useContext } from 'react'
import { sessionService } from "../../service";
import CustomTable from "../../common/html-elements-utils/Table/CustomTable";
import UserContext from '../../UserContext'


export const UserSessions = () => {

    const sessionLabel = ["User id","Session Id","Expires"]
    const [sessions, setSessions] = useState([])
    const [error, setError] = useState(undefined)
    const ctx = useContext(UserContext)
    const id=ctx.user.id
    useEffect(() => {


        const setState = async () =>{ 
            const data=await sessionService().getSession(id)
            if("err" in data){
                console.log(data.err)
                setError(data)
            }
            else{
            setSessions(data)
            }
        }

        setState()
    }, [])
    return (

        <React.Fragment>
            {
                error?<p>{error.status} {error.err}</p>:
                <CustomTable labels={sessionLabel} redirectPage="users" rows={sessions.map(session => [session.UserId, session.sid,session.expires])} />

            }
            
        </React.Fragment>
    )
}

