import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import SideBar from "./common/html-elements-utils/SideBar";
import { BrowserRouter as Router } from 'react-router-dom'
import Routes from "./routes";
import './common/stylesheets/App.css';
import { UserProvider, UserConsumer } from './UserContext'
import Upperbar from './common/html-elements-utils/UpperBar';
import UserLogin from './components/login-components/UserLogin'
import Register from './components/login-components/Register'
import { AuthTypeProvider } from './components/login-components/AuthTypeContext'
import { webAppLinks } from '../main/common/links'

//available icons https://www.w3schools.com/icons/fontawesome_icons_webapp.asp

const sidebarCollapsedSize = "75px";

class App extends Component {

    render() {
        return (
            <Router>
                <UserProvider>

                    <Routes sidebarCollapsedSize={sidebarCollapsedSize} />

                    <UserConsumer>

                        {state => state.user.username ?
                            <React.Fragment>

                                <Upperbar />
                                <SideBar navWidthCollapsed={sidebarCollapsedSize} />

                            </React.Fragment> :
                            <AuthTypeProvider>

                                {window.location.pathname === `/register` ? <Register /> : <UserLogin />}

                            </AuthTypeProvider>
                        }

                    </UserConsumer>


                </UserProvider>
            </Router>

        );
    }
}

export default App;