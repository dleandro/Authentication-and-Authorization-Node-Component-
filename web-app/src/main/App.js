import React, { useContext, useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import SideBar from './common/html-elements-utils/Bars/SideBar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Routes from './routes';
import { AuthenticationRoutes } from './AuthenticationRoutes';
import './common/stylesheets/App.css';
import UserContext from './UserContext';
import Upperbar from './common/html-elements-utils/Bars/UpperBar';

//available icons https://www.w3schools.com/icons/fontawesome_icons_webapp.asp

const sidebarCollapsedSize = '60px';

export default function App() {

    require('dotenv').config()
    const ctx = useContext(UserContext);
    console.log(ctx)

    return (
        <Router>

            <React.Fragment>
                <Switch id={'switch'}>
                    {ctx.user.username ?
                        <React.Fragment>
                            <SideBar navWidthCollapsed={sidebarCollapsedSize} />
                            <main style={{
                                backgroundImage: `url(https://cdn.hipwallpaper.com/i/83/34/LEHn4v.jpg)`, backgroundPosition: 'center',
                                backgroundSize: 'auto', 'backgroundAttachment': 'fixed', height: '100vh', overflow: 'auto',
                            }}>
                                <Upperbar />
                                <Routes sidebarCollapsedSize={sidebarCollapsedSize} />
                            </main>
                        </React.Fragment> :
                        <AuthenticationRoutes />
                    }
                </Switch>
            </React.Fragment>

        </Router>
    );
}