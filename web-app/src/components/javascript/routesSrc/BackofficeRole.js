import React, { Component } from 'react'
import {rolesService} from '../service'
import CustomTable from "../html-elements-utils/Table/CustomTable";

const service = rolesService()
const labels = ["Id","Role","Parent Role"]

export class BackofficeRole extends Component {
    constructor() {
        super();
        this.state = { roles: [] }
    }

    componentDidMount() {
        service.getRoles().then(data=>this.setState({ roles: data }))
    }

    render() {
        return (
            <CustomTable  labels={labels} rows={this.state.roles.map(user=>[user.id,user.role,user.parent_role])} />
        )
    }
}
