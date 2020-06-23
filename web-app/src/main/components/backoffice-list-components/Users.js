import React, { useEffect, useState, useContext } from 'react'
import UserContext from '../../UserContext'
import DropDownTable from "../../common/html-elements-utils/Table/DropdownTable";
import { useParams } from 'react-router-dom';
import {listService,userService,userListService} from "../../service"


export default function Users() {

    const listLabels = ["User Id", "Username", "Start Date", "End Date", "Updater"]
    const [users, setUsers] = useState([])
    const [error, setError] = useState(undefined)
    const [dropdown, setDropdown] = useState([])
    const ctx=useContext(UserContext)
    const addUser = (e) => userListService().addUserList(id,e.target.value.split(" ")[0],ctx.user.id)
    let {id}=useParams()

    useEffect(() => {
        const setState = async () =>{
            setDropdown(await userService().getUsers())
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
            <DropDownTable addRequest={addUser} dropdown={dropdown.map(user=>
                <option value={`${user.id} ${user.username}`}>{user.id} {user.username}</option>)} labels={listLabels} rows={users.map(user => [user["Users.id"], user["Users.username"], user["Users.UserList.start_date"], user["Users.UserList.end_date"], user["Users.UserList.updater"]])} />
    }
        </React.Fragment>
    )
}