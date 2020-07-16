import React, { Component } from 'react'
import { userService } from './service'

const UserContext = React.createContext()

class UserProvider extends Component {
    // Context state
    state = {
        selectedProtocol: "/",
        redirect: { should: false, link: "/" },
        user: { id: undefined, username: undefined },
        setUser: (data) => this.setState(prevState => ({ user: data })),
        rbac: undefined
    };

    async componentDidMount() {

        try {
            const user = await userService().getAuthenticatedUser()            
            this.state.setUser(user)
            this.setState({rbac: await userService().getUserAuthorizations()})
        } catch (error) {
            // no user is authenticated so there is no need to change state
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
