import React, { useEffect,useState } from 'react'
import { userService, userRoleService, configService } from './service'
const AuthizationRbac = require('./common/authization-rbac')

const UserContext = React.createContext()

function UserProvider(props) {
    // Context state
    const [user, setUser] = useState({ id: undefined, username: undefined })
    const [rbac, setRbac] = useState(undefined)


    useEffect(() => {

        const fetchData = async () => {
            try {

                const authenticatedUser = await userService().getAuthenticatedUser()

                if (authenticatedUser.username) {
                    // get authenticated User's Roles 
                    const roles = (await userRoleService().get(authenticatedUser.id))
                        .map(role => role.role)

                    // get rbac_opts to initialize the RBAC
                    const rbac_opts = await configService().getRbacOptions()

                    const setupRbac = new AuthizationRbac(rbac_opts)
                    await setupRbac.init()
                    authenticatedUser.roles = roles
                    setUser(authenticatedUser)

                    setRbac(setupRbac)
                }
            } catch (err) {
                console.error(err)
                return
            }
        }
        fetchData()

    }, [])

    const { children } = props

    return (
        <UserContext.Provider value={{ rbac, userPermissions, user, setUser }}>
            {children}
        </UserContext.Provider>
    )
}

export default UserContext
export const UserConsumer = UserContext.Consumer
export { UserProvider }