import React, { useEffect, useState, useContext } from 'react'
import { listService } from "../../service";
import CustomTable from "../../common/html-elements-utils/Table/CustomTable";
import UserContext from '../../UserContext'


export default function UserLists() {

    const listLabels = ["Id", "Start Date", "End Date", "Updater"]
    const [lists, setList] = useState([])
    const ctx = useContext(UserContext)

    useEffect(() => {


        const setState = async () => setList(await listService().getUserActiveLists(ctx.user.id))

        setState()
    }, [])
    return (

        <React.Fragment>

            <CustomTable labels={listLabels} redirectPage="lists" rows={lists.map(list => [list.ListId, list.start_date, list.end_date, list.updater])} />

        </React.Fragment>
    )
}




