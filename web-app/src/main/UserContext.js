import React, { Component } from 'react'
import { userService } from './service'

const UserContext = React.createContext()

class UserProvider extends Component {
    // Context state
    state = {
        selectedProtocol: "/",
        redirect: { should: false, link: "/" },
        user: { id: undefined, username: undefined },
        isLoggedIn: false,
        changeProtocol: (inputProto) => {
            this.setState({ selectedProtocol: inputProto });
            console.log("protocol set")
        },
        setUser: (data) => this.setState(prevState => ({ user: data }))
    };

    async componentDidMount() {

        const user = await userService().getAuthenticatedUser()


        if (user.username) {
            this.state.setUser(user)
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
