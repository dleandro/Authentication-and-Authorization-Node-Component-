import React from 'react'
import { userService } from '../service'

class UserInfo extends React.Component{

    constructor() {
        super()
        this.state = { user:{} }
    }
    service= userService()

    requestUser = () => this.service.getUser()


    componentDidMount() {
        this.requestUser().then(data =>{
            this.setState({ user: data })})
    }

    render() {
        return (
        <p>{this.props.id}</p>
        )
    }
}

export default UserInfo
