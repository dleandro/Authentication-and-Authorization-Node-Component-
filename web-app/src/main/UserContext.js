import React, { useEffect,useState } from 'react'
import { userService, userRoleService, configService } from './service'
const AuthizationRbac = require('./common/authization-rbac')


const UserContext = React.createContext()

function UserProvider(props) {
    // Context state
    const [userPermissions, setPermissions] = useState(undefined)
    const [user, setUser] = useState({ id: undefined, username: undefined })
    const [rbac, setRbac] = useState(undefined)


    useEffect(() => {

        const fetchData = async () => {
            try {

                const user = await userService().getAuthenticatedUser()

                if (user.username) {
                    // get authenticated User's Roles 
                    const roles = (await userRoleService().get(user.id))
                        .map(role => role.role)

                    // get rbac_opts to initialize the RBAC
                    const rbac_opts = await configService().getRbacOptions();
                    const rbac = new AuthizationRbac(rbac_opts);
                    await rbac.init();
                    user.roles = roles;
                    setUser(user);
                    setRbac(rbac);
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

export default UserContext;
export const UserConsumer = UserContext.Consumer;
export { UserProvider };
