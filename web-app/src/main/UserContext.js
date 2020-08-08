import React, { useEffect,useState } from 'react'
import { userService } from './service'

const UserContext = React.createContext()

function UserProvider(props)  {
    // Context state
    const [userPermissions,setPermissions]=useState(undefined)
    const [user,setUser]=useState({ id: undefined, username: undefined })
    const [rbac,setRbac] = useState(undefined)
    
    
    useEffect(()=>{
        
        const fetchData=async()=>{
            try {
                
            const user = await userService().getAuthenticatedUser()
            console.log(user)
            

            const permission = await userService().getAuthenticatedUserPermissions()

            if (permission.length) {
                console.log('current User has permissions:', permission)
                setPermissions(permission)
            }
            if (user.username) {
                setUser(user)
            }

        } catch (err) {
            console.error(err)
        }
    }
    fetchData()

    },[])

        const { children } = props

        return (
            <UserContext.Provider value={{rbac,userPermissions,user,setUser}}>
                {children}
            </UserContext.Provider>
        )
    }

export default UserContext
export const UserConsumer = UserContext.Consumer
export {UserProvider}