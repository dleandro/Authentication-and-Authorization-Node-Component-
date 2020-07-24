import React, { useContext, useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import SideBar from './common/html-elements-utils/SideBar';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from './routes';
import { AuthenticationRoutes } from './AuthenticationRoutes';
import './common/stylesheets/App.css';
import UserContext, { UserProvider } from './UserContext';
import Upperbar from './common/html-elements-utils/UpperBar';

//available icons https://www.w3schools.com/icons/fontawesome_icons_webapp.asp

const sidebarCollapsedSize = '60px';

export default function App() {

    console.log(require('dotenv').config())
    const ctx = useContext(UserContext);
    const [state, setState] = useState(ctx.user);
    useEffect(() => setState(ctx.user),[ctx.user]);
    return (
        <Router>
            <UserProvider>
                <React.Fragment>
                    {state.username ?
                        <React.Fragment>
                            <SideBar navWidthCollapsed={sidebarCollapsedSize} />
                            <main style={{backgroundImage: `url(https://cdn.hipwallpaper.com/i/83/34/LEHn4v.jpg)`, backgroundPosition: 'center',
                                backgroundSize: 'auto','background-attachment': 'fixed',height:'100vh',overflow: 'auto',}}>
                                <Upperbar />
                                <Routes sidebarCollapsedSize={sidebarCollapsedSize} />
                            </main>
                        </React.Fragment> :
                        <AuthenticationRoutes />
                    }
                </React.Fragment>
            </UserProvider>
        </Router>
    );
}