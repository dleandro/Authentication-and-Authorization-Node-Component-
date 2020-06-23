import React, { Component } from 'react'
import { rolesService } from '../../service'
import CustomTable from "../../common/html-elements-utils/Table/CustomTable";

const labels = ["Id", "Role", "Parent Role"]

export class BackofficeRole extends Component {
    constructor() {
        super();
        this.state = { roles: [], error: undefined }
    }
    service = rolesService()

    addRole = async (arr) => this.setState({ roles: [...this.state.roles, await this.service.addRole(arr)] })
    editRole = (arr) => this.service.editRole(arr)
    deleteRole = (arr) => this.service.deleteRole(arr[0])

    componentDidMount() {
        this.service.getRoles().then(data => {
            if ("err" in data) {
                console.log(data.err)
                this.setState({ error: data })
            }
            else {
                this.setState({ roles: data })
            }
        })
    }

    render() {
        return (
            <div>
                {!this.state.error ? <CustomTable labels={labels}
                    addRequest={this.addRole} editRequest={this.editRole} deleteRequest={this.deleteRole}
                    redirectPage="roles" rows={this.state.roles.map(role => [role.id, role.role, role.parent_role == null ? 'null' : role.parent_role])} /> :
                    <p>{this.state.error.status} {this.state.error.err}</p>}
            </div>
        )
    }
}
