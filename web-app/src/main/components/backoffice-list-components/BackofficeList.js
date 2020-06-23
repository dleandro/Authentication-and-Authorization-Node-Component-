import React, { Component } from 'react'
import { listService } from '../../service'
import CustomTable from "../../common/html-elements-utils/Table/CustomTable";

const labels = ["Id", "List"]

/**
 * Represents all database Lists entrys
 */
export class BackofficeList extends Component {

    service = listService()
    constructor() {
        super();
        this.state = { lists: [], error: undefined }
    }

    addList = (arr) => this.setState({ lists: [...this.state.lists, this.service.addList(arr)] })
    editList = (arr) => this.service.editList(arr)
    deleteList = (arr) => this.service.deleteList(arr[0])

    componentDidMount() {
        this.service.getLists().then(data => {
            if ("err" in data) {
                console.log(data.err)
                this.setState({ error: data })
            } else {
                this.setState({ lists: data })
            }
        })
    }

    render() {
        return (
            <div>
                {!this.state.error ? <CustomTable addRequest={this.addList}
                    editRequest={this.editList}
                    deleteRequest={this.deleteList}
                    labels={labels}
                    rows={this
                        .state
                        .lists
                        .map(list => [list.id, list.list])
                    } redirectPage="lists"
                /> :
                    <p>{this.state.error.status} {this.state.error.err}</p>}
            </div>
        )
    }
}
