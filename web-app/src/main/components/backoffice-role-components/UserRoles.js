import React, { useEffect, useState, useContext } from 'react'
import { rolesService, userService,userRoleService } from "../../service";
import CustomTable from "../../common/html-elements-utils/Table/CustomTable";
import UserContext from '../../UserContext'
import { useParams } from 'react-router-dom';
import DropDownTable from "../../common/html-elements-utils/Table/DropdownTable"


export default function UserRoles() {
    let {id}=useParams()
    const userRoleLabels = ["User id", "username"]
    const [users, setUsers] = useState([])
    const [dropdown, setDropdown] = useState([])
    const [error, setError] = useState(undefined)
    const ctx = useContext(UserContext)
    const addUser = (e) => userRoleService().addUserRole(e.target.value.split(" ")[0],id,ctx.user.id)
    const editRole = (arr) => this.service.editRole(arr)
    const deleteRole = (arr) => this.service.deleteRole(arr[0])

    useEffect(() => {

        const setState = async () => {
            setDropdown(await userService().getUsers())
            const data=await rolesService().getUsersWithThisRole(id)
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
            {
                error?<p>{error.status} {error.err}</p>:
                <DropDownTable labels={userRoleLabels}
                        addRequest={addUser} editRequest={editRole} deleteRequest={deleteRole}
                        dropdown={dropdown.map(user=>
                            <option value={`${user.id} ${user.username}`}>{user.id} {user.username}</option>)} redirectPage="users" rows={users.map(user => [user["Users.id"], user["Users.username"], user["Users.UserRoles.start_date"], user["Users.UserRoles.end_date"], user["Users.UserRoles.updater"]])} />
            }

        </React.Fragment>
    )
}
