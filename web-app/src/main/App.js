import React, { useContext, useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import SideBar from "./common/html-elements-utils/SideBar";
import { BrowserRouter as Router } from 'react-router-dom'
import Routes from "./routes";
import { AuthenticationRoutes } from './AuthenticationRoutes'
import './common/stylesheets/App.css';
import UserContext, { UserProvider } from './UserContext'
import Upperbar from './common/html-elements-utils/UpperBar';


//available icons https://www.w3schools.com/icons/fontawesome_icons_webapp.asp

const sidebarCollapsedSize = "75px";

export default function App() {

    const ctx = useContext(UserContext)

    const [state, setState] = useState(ctx.user)

    useEffect(() => setState(ctx.user))

    return (
        <Router>
            <UserProvider>
                <React.Fragment>

                    {state.username ?
                        <React.Fragment>

                            <Upperbar />
                            <SideBar navWidthCollapsed={sidebarCollapsedSize} />
                            <Routes sidebarCollapsedSize={sidebarCollapsedSize} />

                        </React.Fragment> :
                        <AuthenticationRoutes />
                    }

                </React.Fragment>
            </UserProvider>
        </Router>

    );
}

