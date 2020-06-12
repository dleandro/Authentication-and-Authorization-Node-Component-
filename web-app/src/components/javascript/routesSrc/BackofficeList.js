import React, {Component} from 'react'
import {listService} from '../service'
import CustomTable from "../html-elements-utils/Table/CustomTable";

const service = listService()
const labels = [ "Id", "List"]

/**
 * Represents all database Lists entrys
 */
export class BackofficeList extends Component {
    constructor() {
        super();
        this.state = {lists: []}
    }

    addList = (arr) => service.addList(arr)
    editList = (arr) => service.deactivateList(arr[1])
    deleteList = (arr) => service.deleteList(arr[1])

    componentDidMount() {
        service.getLists().then(data => this.setState({lists: data}))
    }

    render() {
        return (
            <CustomTable addRequest={this.addList}
                         editRequest={this.editList}
                         deleteRequest={this.deleteList}
                         labels={labels}
                         rows={this
                             .state
                             .lists
                             .map(list => [list.id, list.list])
                         }
            />

        )
    }
}
