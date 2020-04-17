import React, { Component } from 'react'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button'
import TableRow from "../html-elements-utils/TableRow";
import Table from 'react-bootstrap/Table'

const fetch = require('node-fetch');
const ROLE_URL = 'http://localhost:8082/role';

export class BackofficeRole extends Component {
    constructor() {
        super();
        this.state = { roles: [] }
    }

    requestRoles = () => fetch(ROLE_URL).then(rsp=> rsp.text()).then(data=>JSON.parse(data));


    componentDidMount() {
        this.requestRoles().then(data => this.setState({ roles: data }))
    }

    render() {
        return (
            <Table striped bordered hover variant="dark">
                <thead>
                <tr>
                    <th>Id</th>
                    <th>Role</th>
                    <th>Parent Role</th>
                </tr>
                </thead>
                <tbody>
                {this.state.roles.map(role =>  <TableRow cols={[role.id,role.role,role.parent_role]} />)}
                </tbody>
            </Table>
        )
    }
}
