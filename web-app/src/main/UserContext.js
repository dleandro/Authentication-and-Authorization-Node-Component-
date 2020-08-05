import React, { Component } from 'react'
import { userService } from './service'

const UserContext = React.createContext()

class UserProvider extends Component {
    // Context state
    state = {
        selectedProtocol: "/",
        redirect: { should: false, link: "/" },
        user: { id: undefined, username: undefined },
        userPermissions: undefined,
        setPermissions: (data) => this.setState(prevState => ({ userPermissions: data })),
        setUser: (data) => this.setState(prevState => ({ user: data }))
    };

    async componentDidMount() {

        try {

            const user = await userService().getAuthenticatedUser()
            console.log(user)

            const permission = await userService().getAuthenticatedUserPermissions()

            if (permission.length) {
                console.log('current User has permissions:', permission)
                this.state.setPermissions(permission)
            }
            if (user.username) {
                this.state.setUser(user)
            }

        } catch (err) {
            console.error(err)
        }

    }

    render() {
        const { children } = this.props

        return (
            <UserContext.Provider value={this.state}>
                {children}
            </UserContext.Provider>
        )
    }
}

export default UserContext
export const UserConsumer = UserContext.Consumer
export { UserProvider }
