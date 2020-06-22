import React, { useEffect, useState } from 'react'
import { protocolService } from '../../service'

const AuthTypeContext = React.createContext()

const AuthTypeProvider = (props) => {

    const [allowedProtocolsAndIdps, setAllowedProtocolsAndIdps] = useState([])

    const [authTypesWereChangedByUser, setAuthTypesFlag] = useState(false)

    // get allowed protocols and push them to state
    useEffect(() => {
        const fetchAllowedProtocolsAndIdps = async () => {
            const authTypes = await protocolService().getPossibleAuthTypes()
            setAllowedProtocolsAndIdps(authTypes)
        }

        if (!authTypesWereChangedByUser) {

            fetchAllowedProtocolsAndIdps()

        }

    })

    // State was changes by the user so we need to update the database so that it will remain consistent with state
    useEffect(() => {

        if (authTypesWereChangedByUser) {
            allowedProtocolsAndIdps
                .forEach(authType => protocolService().changeActive(authType.protocol, authType.active))

        } 

    }, [allowedProtocolsAndIdps, authTypesWereChangedByUser])

    return (
        <AuthTypeContext.Provider value={{ allowedProtocolsAndIdps, setAllowedProtocolsAndIdps, setAuthTypesFlag }}>
            {props.children}
        </AuthTypeContext.Provider>
    )
}

export default AuthTypeContext

export { AuthTypeProvider } 