import React from 'react'
import {userService} from '../service'

class UserInfo extends React.Component {

    service = userService()

    constructor() {
        super()
        this.state = {user: {}}
    }

    requestUser = () => this.service.getUser()


    componentDidMount() {
        this.requestUser().then(data => {
            this.setState({user: data})
        })
    }

    render() {
        return (
            <p>{this.props.id}</p>
        )
    }
}

export default UserInfo
