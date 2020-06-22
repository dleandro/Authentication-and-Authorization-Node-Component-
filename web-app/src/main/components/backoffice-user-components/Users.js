import React from 'react'
import {userService} from '../../service'
import CustomTable from "../../common/html-elements-utils/Table/CustomTable";

const labels = ["Id", "Username", "Password"]

/**
 * Backoffice's initial page were the list of all registred users are displayed
 */
class Users extends React.Component {
    service = userService()

    constructor() {
        super()
        this.state = {users: [],error:undefined}
    }

    addUser = (arr) => this.service.addUser(arr)
    editUsername = (arr) => this.service.editUsername(arr)
    deleteUser = (arr) => this.service.deleteUser(arr)
    requestUsers = () => this.service.getUsers()

    componentDidMount() {
        this.requestUsers().then(data => {
            if("err" in data){
                console.log(data.err)
                this.setState({error:data})
            }
            else{
            this.setState({users: data})
            }
        })
    }

    render() {
        return (
            <div>
            {!this.state.error? <CustomTable addRequest={this.addUser} editRequest={this.editUsername}
                         deleteRequest={this.deleteUser} labels={labels}
                         rows={this.state.users.map(user => [user.id, user.username, '****'])}
                         redirectPage="users"/>:
            <p>{this.state.error.status} {this.state.error.err}</p>}
            </div>
        )
    }
}

export default Users
