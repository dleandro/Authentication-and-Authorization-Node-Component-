import React from 'react'
import TableRow from "../html-elements-utils/TableRow";
import Table from 'react-bootstrap/Table'
import { userService} from '../service'

class BackOffice extends React.Component {
    constructor() {
        super()
        this.state = { users: [] }
    }
    service= userService()

    addUser= (arr) =>this.service.addUser(arr)
    editUsername =(arr)=> this.service.editUsername(arr)
    requestUsers = () => this.service.getUsers()

    componentDidMount() {
        this.requestUsers().then(data =>this.setState({ users: data }))
    }

    render() {
        return (
            <Table striped bordered hover variant="dark">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Username</th>
                        <th>Password</th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.users.map(user =>  <TableRow setRedirect={this.props.setRedirect} editRequest={this.editUsername} cols={[user.id,user.username,'****']} />)}
                    <TableRow setRedirect={this.props.setRedirect} addRequest={this.addUser} cols={[undefined,undefined,undefined]} />
                </tbody>
            </Table>
        )
    }
}
export default  BackOffice