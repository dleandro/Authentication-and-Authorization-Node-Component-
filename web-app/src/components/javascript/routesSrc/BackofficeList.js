import React, { Component } from 'react'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button'
import TableRow from "../html-elements-utils/TableRow";
import Table from 'react-bootstrap/Table'

const fetch = require('node-fetch');
const LIST_URL = 'http://localhost:8082/list';

export class BackofficeList extends Component {
    constructor() {
        super();
        this.state = { lists: [] }
    }

    requestRoles = () => fetch(LIST_URL).then(rsp=>{console.log(rsp);return rsp}).then(rsp=> rsp.text()).then(data=>{console.log(data);return data})


    componentDidMount() {
        this.requestRoles().then(data => {
            this.setState({ lists: data })
        })
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

                </tbody>
            </Table>
        )
    }
}
