import React, {useCallback, useEffect, useState} from 'react'
import { userService, userRoleService, configService, authenticationService } from './service'
const AuthizationRbac = require('./common/authization-rbac')




export const usePermission = (resource, roles) => {
    const [rbac, setRbac] = useState(undefined);
    const [permissions,setPermissions] =useState(['']);
    useEffect(()=>{
        configService().getRbacOptions().then(options=>setRbac(new AuthizationRbac(options)));
    },[]);
    const setPerms = useCallback(() => {
        const possiblePerms= [{action:'GET'},{action:'POST'},{action:'PUT'},{action:'DELETE'}].map(value =>({...value,resource}));
        console.log('roles:',roles)
        if (rbac){
            setPermissions(rbac.canAll(roles,possiblePerms));
        }
    }, []);
    useEffect(()=>{
        if (rbac){
            rbac.init().then(()=>{
                setPerms();
            });
        }
    },[rbac]);
    useEffect(()=>{console.log('perms:',permissions)},[permissions]);

    return [permissions, setPerms];
};


const UserContext = React.createContext()

function UserProvider(props) {
    // Context state
    const [user, setUser] = useState({ id: undefined, username: undefined })
    const [rbac, setRbac] = useState(undefined)
  //  const [perms, setPerms] = usePermission()

    useEffect(() => {

        const fetchData = async () => {
            try {

                const authenticatedUser = await userService().getAuthenticatedUser();

                if (authenticatedUser.username) {
                    // get authenticated User's Roles
                    const roles = (await authenticationService().getUserRoles(authenticatedUser.id)).map(role => role.role);

                    // get rbac_opts to initialize the RBAC
                    const rbac_opts = await configService().getRbacOptions();

                    const setupRbac = new AuthizationRbac(rbac_opts);
                    await setupRbac.init();
                    setupRbac.roles= roles;
                   // authenticatedUser.roles = roles;
                    setUser(authenticatedUser);

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
        <UserContext.Provider value={{ rbac, user, setUser }}>
            {children}
        </UserContext.Provider>
    )
}

export default UserContext;
export const UserConsumer = UserContext.Consumer;
export { UserProvider };
