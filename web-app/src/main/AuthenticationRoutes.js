import React from 'react'
import { Route, Switch } from 'react-router-dom'
import UserLogin from './components/login-components/UserLogin'
import Register from './components/login-components/Register'
import { AuthTypeProvider } from './components/login-components/AuthTypeContext'
import Homepage from './components/Homepage'

export const AuthenticationRoutes = () => {
    return (

        <AuthTypeProvider>
            <Switch id={"switch"}>
                <Route path='/register' exact component={Register} />
                <Route path='/' exact component={UserLogin} />
            </Switch >
        </AuthTypeProvider>

    )
}

