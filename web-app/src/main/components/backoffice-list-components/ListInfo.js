
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { listService } from "../../service";
import CustomTable from "../../common/html-elements-utils/Table/CustomTable";

export default function ListInfo() {
    let { id } = useParams();
    const listLabels = ["User Id", "Username", "Start Date", "End Date", "Updater"]
    const [list, setList] = React.useState([])
    const [users, setUsers] = React.useState([])

    useEffect(() => {

        const setState = async () => {
            setList(await listService().getList(id))
            setUsers(await listService().getUsersInThisList(id))
        }

        setState()
    }, [id])

    return (
        <div>
            <h3>{list.list} List</h3>
            <h3>Current Users in this List</h3>
            <CustomTable labels={listLabels} rows={users.map(user => [user["Users.id"], user["Users.username"], user["Users.UserList.start_date"], user["Users.UserList.end_date"], user["Users.UserList.updater"]])} />


        </div>
    )
}