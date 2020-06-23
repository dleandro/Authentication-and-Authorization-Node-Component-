import React, { useEffect, useState, useContext } from 'react'
import { listService } from "../../service";
import CustomTable from "../../common/html-elements-utils/Table/CustomTable";
import UserContext from '../../UserContext'


export default function UserLists() {

    const listLabels = ["Id", "Start Date", "End Date", "Updater"]
    const [lists, setList] = useState([])
    const [error, setError] = useState(undefined)
    const ctx = useContext(UserContext)

    useEffect(() => {


        const setState = async () => {
            const data=await listService().getUserActiveLists(ctx.user.id)
            if("err" in data){
                console.log(data.err)
                setError(data)
            }
            else{
            setList(data)
            }
        }

        setState()
    }, [])
    return (

        <React.Fragment>
            {error?<p>{error.status} {error.err}</p>:
            <CustomTable labels={listLabels} redirectPage="lists" rows={lists.map(list => [list.ListId, list.start_date, list.end_date, list.updater])} />
    }
        </React.Fragment>
    )
}




