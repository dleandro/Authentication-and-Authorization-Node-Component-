import React, { useEffect, useState, useContext } from 'react'
import { sessionService } from "../service";
import CustomTable from "../common/html-elements-utils/Table/CustomTable";


export default function Sessions(){

    const sessionLabel = ["User id","Session Id"]
    const [sessions, setSessions] = useState([])
    
    useEffect(() => {


        const setState = async () => setSessions(await sessionService().getSessions())

        setState()
    }, [])

    return (

        <React.Fragment>

            <CustomTable labels={sessionLabel} redirectPage="users" rows={sessions.map(session => [session.user_id, session.session_id])} />

        </React.Fragment>
    )
}

