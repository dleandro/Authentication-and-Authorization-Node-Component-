import React, { useEffect, useRef, useState } from 'react'
import { protocolService, configService, authTypesService } from '../../common/services/basicServices'

const AuthTypeContext = React.createContext()

const AuthTypeProvider = (props) => {

    const [allowedProtocolsAndIdps, setAllowedProtocolsAndIdps] = useState([]);
    const isMountedRef = useRef(null);
    const [authTypesWereChangedByUser, setAuthTypesFlag] = useState(false)

    const [error, setError] = useState(undefined)

    /**
     * @param authType
     * @returns {Promise<TResult1 | TResult2>}
     */
    const getAuthTypeWithOptions = authType => configService().getOptions(authType.protocol, authType.idp)
    .then(options => ({ protocol: authType.protocol, idp: authType.idp, active: authType.active, parameters: options }))
    .catch(err=>console.error(err))

    const fetchAuthtypes = async signal => {
        const authTypes = await authTypesService().getPossibleAuthTypes(signal);
        const typesWithOptions = authTypes.map(getAuthTypeWithOptions);
        Promise.all(typesWithOptions).then(arr => {
            if (isMountedRef.current) {
                setAllowedProtocolsAndIdps(arr)
            }
        });
    };


    // get allowed protocols and push them to state
    useEffect(() => {
        isMountedRef.current = true;
        const abortController = new AbortController();
        const signal = abortController.signal;
        if (!authTypesWereChangedByUser) {
            fetchAuthtypes(signal);
        }
        return () => isMountedRef.current = false;
    }, [authTypesWereChangedByUser]);

    // State was changes by the user so we need to update the database so that it will remain consistent with state
    useEffect(() => {

        if (authTypesWereChangedByUser) {
            allowedProtocolsAndIdps
                .forEach(authType => authTypesService().changeActive(authType.protocol, authType.idp, authType.active)
                    .then(data => {
                        if ("err" in data) {
                            console.log(data.err)
                            setError(data)
                        }
                    }))

        }

    }, [allowedProtocolsAndIdps, authTypesWereChangedByUser])

    return (
        <AuthTypeContext.Provider value={{ allowedProtocolsAndIdps, error, setAllowedProtocolsAndIdps, setAuthTypesFlag }}>
            {props.children}
        </AuthTypeContext.Provider>
    )
}

export default AuthTypeContext

export { AuthTypeProvider } 