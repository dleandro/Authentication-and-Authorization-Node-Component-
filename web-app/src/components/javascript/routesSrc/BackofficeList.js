import React, { Component } from 'react'
import {listService} from '../service'
import CustomTable from "../html-elements-utils/Table/CustomTable";

const service= listService()
const labels = ["Id","User","LIST","start date","end date","updater"]

/**
 *
 */
export class BackofficeList extends Component {
    constructor() {
        super();
        this.state = { lists: [] }
    }

    componentDidMount() {
        service.getActiveLists().then( data => this.setState({ lists: data }))
    }

    render() {
        //addRequest={this.addUser} editRequest={this.editUsername} deleteRequest={this.deleteUser}
        return (
            <CustomTable  labels={labels} rows={this.state.lists.map(row=>[row.id,row.user,row.list,row.start_date,row.end_date,row.updater])} />

        )
    }
}
