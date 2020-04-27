import React from 'react'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button'
import TableRow from "../html-elements-utils/TableRow";
import Table from 'react-bootstrap/Table'

const fetch = require('node-fetch');
const USER_URL = 'http://localhost:8082/user';

class BackOffice extends React.Component {
    constructor() {
        super()
        this.state = { users: [] }
    }

    addUser(arr) {
        fetch(USER_URL, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                username: arr[1],
                password: 1234
            })
        })
            .then(rsp=> {
                console.log(rsp);
                return {user:rsp.text(),status:rsp.status}
            })

    }
    editUsername(arr) {
        fetch(`${USER_URL}/${arr[0]}/username`, {
            method: "PUT",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                username: arr[1]
            })
        })
            .then(rsp=> {
                console.log(rsp);
                return {user:rsp.text(),status:rsp.status}
            })

    }

    requestUsers = () => fetch(USER_URL).then(rsp=> rsp.json())

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
                </tr>
                </thead>
                <tbody>
                {this.state.users.map(user =>  <TableRow setRedirect={this.props.setRedirect} editRequest={this.editUsername} cols={[user.id,user.username]} />)}
                <TableRow setRedirect={this.props.setRedirect} addRequest={this.addUser} cols={[undefined,undefined]} />
                </tbody>
            </Table>
        )
    }
}
export default  BackOffice