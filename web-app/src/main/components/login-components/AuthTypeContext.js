import React, { useEffect, useState } from 'react'
import { protocolService,configService } from '../../service'

const AuthTypeContext = React.createContext()

const AuthTypeProvider = (props) => {

    const [allowedProtocolsAndIdps, setAllowedProtocolsAndIdps] = useState([])

    const [authTypesWereChangedByUser, setAuthTypesFlag] = useState(false)

    const [error,setError]=useState(undefined)


    // get allowed protocols and push them to state
    useEffect(() => {
        if (!authTypesWereChangedByUser) {
            const arr=[]
            protocolService().getPossibleAuthTypes().then(authTypes=>{
                console.log(authTypes)
                Promise.all(authTypes.map(authType=>configService().getOptions(authType.protocol).then(resp=>arr.push({protocol:authType.protocol,active:authType.active,parameters:resp}))))
                .then(_=>setAllowedProtocolsAndIdps(arr))
            })
        }
    },[authTypesWereChangedByUser])

    // State was changes by the user so we need to update the database so that it will remain consistent with state
    useEffect(() => {

        if (authTypesWereChangedByUser) {
            allowedProtocolsAndIdps
                .forEach(authType => protocolService().changeActive(authType.protocol, authType.active)
                .then(data=>
                    {if("err" in data){
                    console.log(data.err)
                    setError(data)
                }
            }))

        } 

    }, [allowedProtocolsAndIdps, authTypesWereChangedByUser])

    return (
        <AuthTypeContext.Provider value={{ allowedProtocolsAndIdps,error, setAllowedProtocolsAndIdps, setAuthTypesFlag }}>
            {props.children}
        </AuthTypeContext.Provider>
    )
}

export default AuthTypeContext

export { AuthTypeProvider } 