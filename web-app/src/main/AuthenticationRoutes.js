import React from 'react';
import { Route } from 'react-router-dom';
import UserLogin from './components/login-components/UserLogin';
import Register from './components/login-components/Register';
import { AuthTypeProvider } from './components/login-components/AuthTypeContext';

export const AuthenticationRoutes = () => {

    return (

        <AuthTypeProvider>
            <Route path='/register' exact component={Register} />
            <Route path='/' exact component={UserLogin} />
        </AuthTypeProvider>

    )
}

