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


    requestUsers = () => Promise.all(
        [...Array(20).keys()]
            .map(num=>`${USER_URL}?userId=${num}`)
            .map(link=>
                fetch(link)
                    .then(async rsp=> rsp.text().then(text=>{return {user:text,status:rsp.status}}))))
        .then(arr=>arr.filter(user=>user.status===200));

    requestMatias = () => fetch(`${USER_URL}?userId=3`).then(rsp=> {return {user:rsp.text(),status:rsp.status}}).then(data=>console.log(data))




    componentDidMount() {
        this.requestUsers().then(data => {this.setState({ users: data.map(user=>JSON.parse(user.user)) })})
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
                {this.state.users.map(user =>  <TableRow setRedirect={this.props.setRedirect} col1={user.id} col2={user.username} />)}
                <TableRow setRedirect={this.props.setRedirect} col1={undefined} col2={undefined} />
                </tbody>
            </Table>
        )
    }
}
export default  BackOffice