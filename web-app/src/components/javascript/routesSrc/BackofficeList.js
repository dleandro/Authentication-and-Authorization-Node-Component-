import React, { Component } from 'react'
import {listService} from '../service'
import CustomTable from "../html-elements-utils/Table/CustomTable";

const service= listService()
const labels = ["Id","Role","Parent Role"]

/**
 *
 */
export class BackofficeList extends Component {
    constructor() {
        super();
        this.state = { lists: [] }
    }

    componentDidMount() {
        service.getLists().then( data => this.setState({ lists: data }))
    }

    render() {
        //addRequest={this.addUser} editRequest={this.editUsername} deleteRequest={this.deleteUser}
        return (
            <button onClick={event => console.log(this.state.lists)}/>
            //<CustomTable  labels={labels} rows={this.state.lists} />

        )
    }
}
