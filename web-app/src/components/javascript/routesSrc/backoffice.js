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
                {this.state.users.map(user =>  <TableRow setRedirect={this.props.setRedirect} cols={[user.id,user.username]} />)}
                <TableRow setRedirect={this.props.setRedirect} cols={[undefined,undefined]} />
                </tbody>
            </Table>
        )
    }
}
export default  BackOffice