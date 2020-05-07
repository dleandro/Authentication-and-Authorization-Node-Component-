import React from 'react'
import { userService } from '../service'
import CustomTable from "../html-elements-utils/Table/CustomTable";

const labels = ["Id","Username","Password"]
class BackOffice extends React.Component {
    constructor() {
        super()
        this.state = { users: [] }
    }
    service= userService()

    addUser = (arr) => this.service.addUser(arr)
    editUsername =(arr)=> this.service.editUsername(arr)
    deleteUser=(arr)=> this.service.deleteUser(arr)
    requestUsers = () => this.service.getUsers()

    componentDidMount() {
        this.requestUsers().then(data =>{
            this.setState({ users: data })})
    }

    render() {
        return (
            <CustomTable addRequest={this.addUser} editRequest={this.editUsername} deleteRequest={this.deleteUser} labels={labels} rows={this.state.users.map(user=>[user.id,user.username,'****'])} />
        )
    }
}
export default  BackOffice