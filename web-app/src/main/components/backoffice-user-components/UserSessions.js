import React, { useEffect, useState, useContext } from 'react'
import { sessionService } from "../../service";
import CustomTable from "../../common/html-elements-utils/Table/CustomTable";
import UserContext from '../../UserContext'


export const UserSessions = () => {

    const sessionLabel = ["User id","Session Id"]
    const [sessions, setSessions] = useState([])
    const ctx = useContext(UserContext)
    const id=ctx.user.id
    useEffect(() => {


        const setState = async () => setSessions(await sessionService().getSession(id))

        setState()
    }, [])
    return (

        <React.Fragment>

            <CustomTable labels={sessionLabel} redirectPage="users" rows={sessions.map(session => [session.user_id, session.session_id])} />

        </React.Fragment>
    )
}

