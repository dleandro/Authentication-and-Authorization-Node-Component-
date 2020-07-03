import React, { useEffect, useState } from 'react';
import { sessionService } from '../service';
import CustomTable from '../common/html-elements-utils/Table/CustomTable';


export default function Sessions(){

    const sessionLabel = ['User id','Session Id','Expires'];
    const [sessions, setSessions] = useState([]);
    useEffect(() => {
        sessionService().getSessions().then(setSessions);
    }, []);

    return (
        <React.Fragment>
            <CustomTable labels={sessionLabel} redirectPage="users" rows={sessions.map(session => [session.UserId, session.sid,session.expires])} />
        </React.Fragment>
    );
}

