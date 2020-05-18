import React, {Component} from 'react'
import CustomTable from "../html-elements-utils/Table/CustomTable";
import {permissionService} from "../service"

const service = permissionService()
const labels = ["Id", "Method", "Path"]

export class BackofficePermission extends Component {
    constructor() {
        super();
        this.state = {permission: []}
    }

    componentDidMount() {
        service.getPermissions().then(data => this.setState({permission: data}))
    }

    render() {
        return (
            <CustomTable labels={labels}
                         rows={this.state.permission.map(permission => [permission.id, permission.method, permission.path])}/>

            // <CustomTable  labels={labels} rows={this.state.lists} />
        )
    }
}
