import 'bootstrap/dist/css/bootstrap.min.css'
import './common/stylesheets/App.css';
import React, { Component } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import BackOffice from "./components/BackOffice";
import AuthenticationProtocol from './components/login-components/AuthenticationProtocol'
import { BackofficeRole } from "./components/backoffice-role-components/BackofficeRole"
import { BackofficeList } from "./components/backoffice-list-components/BackofficeList"
import BackofficePermission from "./components/backoffice-permission-components/BackofficePermission"
import UserInfo from "./components/backoffice-user-components/UserInfo"
import Register from "./components/login-components/Register"
import ListInfo from "./components/backoffice-list-components/ListInfo"
import PermissionInfo from "./components/backoffice-permission-components/PermissionInfo"
import RoleInfo from "./components/backoffice-role-components/RoleInfo"
import Users from './components/backoffice-user-components/Users'
import { AuthTypeProvider } from './components/login-components/AuthTypeContext'
import AccountManagement from './components/backoffice-user-components/AccountManagement'
import UserLogin from './components/login-components/UserLogin';

class Routes extends Component {
    state = { redirect: { should: false, link: "/" } };

    setRedirect = (url) => this.setState({ redirect: { should: true, link: url } })


    renderRedirect = () => {
        if (this.state.redirect.should) {
            return <Redirect to={this.state.redirect.link} />
        }
        return null
    }

    render() {
        return (
            <Switch id={"switch"}>


                <div id={"main"} style={{ marginLeft: this.props.sidebarCollapsedSize }}>
                    <Route path={'/'} exact component={BackOffice} />

                    <Route path={'/users'} exact component={Users} />
                    <Route path={`/users/:id`} exact component={UserInfo} />
                    <Route path={'/account'} exact component={AccountManagement} />
                    <Route path={'/register'} exact component={Register} />
                    <Route path={'/login'} exact component={UserLogin} />

                    <Route path={'/permissions'} exact component={BackofficePermission} />
                    <Route path={'/permissions/:id'} exact component={PermissionInfo} />

                    <Route path={'/roles'} exact component={BackofficeRole} />
                    <Route path={'/roles/:id'} exact component={RoleInfo} />

                    <Route path={'/lists'} exact component={BackofficeList} />
                    <Route path={'/lists/:id'} exact component={ListInfo} />

                    <AuthTypeProvider>

                        <Route path={'/protocols'} exact component={() => <AuthenticationProtocol />} />

                    </AuthTypeProvider>
                </div>


            </Switch >
        );
    }

}

export default Routes
