import React, {Component} from 'react'
import CustomTable from "../../common/html-elements-utils/Table/CustomTable";
import {permissionService} from "../../service"

const labels = ["Id", "Action", "Resource"]

export default class BackofficePermission extends Component {
    service = permissionService()
    constructor() {
        super();
        this.state = {permission: [],error:undefined}
    }
    

    addPermission = async (arr) => this.setState({permission: [...this.state.permission, await this.service.addPermission(arr)]})
    editPermission = (arr) => this.service.editPermission(arr)
    deletePermission = (arr) => this.service.deletePermission(arr)

    componentDidMount() {
        this.service.getPermissions().then(data =>{
            if("err" in data){
                console.log(data.err)
                this.setState({error:data})
            }
            else{
            this.setState({permission: data})
            }
        })
    }

    render() {
        return (
            <div>
            {!this.state.error?<CustomTable labels={labels} redirectPage="permissions"
                        addRequest={this.addPermission} editRequest={this.editPermission}
                        deleteRequest={this.deletePermission} rows={this.state.permission.map(permission => [permission.id, permission.action, permission.resource])}/>:
            <p>{this.state.error.status} {this.state.error.err}</p>}
            </div>
        )
    }
}
