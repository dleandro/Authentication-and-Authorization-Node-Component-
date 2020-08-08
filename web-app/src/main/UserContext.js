import React, { Component } from 'react'
import { userService, userRoleService, configService } from './service'
const AuthizationRbac = require('./common/authization-rbac')


const UserContext = React.createContext()

class UserProvider extends Component {
    // Context state
    state = {
        selectedProtocol: "/",
        redirect: { should: false, link: "/" },
        user: { id: undefined, username: undefined, roles: [] },
        rbac: undefined,
        setUser: (data) => this.setState(prevState => ({ user: data }))
    };

    async componentDidMount() {

        try {

            const user = await userService().getAuthenticatedUser()

            if (user.username) {
                // get authenticated User's Roles 
                const roles = (await userRoleService().get(user.id))
                    .map(role => role.role)

                    // get rbac_opts to initialize the RBAC
                const rbac_opts = await configService().getRbacOptions()
                
                const rbac = new AuthizationRbac(rbac_opts)
                await rbac.init()
                user.roles = roles
                this.state.setUser(user)

                this.setState(_ => ({ rbac: rbac }))
            }

        } catch (err) {
            console.error(err)
            return 
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
