import 'bootstrap/dist/css/bootstrap.min.css'
import '../stylesheets/App.css';
import React, { Component } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import BackOffice from "./routesSrc/backoffice";
import Homepage from "./routesSrc/Homepage";
import UserLogin from './routesSrc/loginComponents/UserLogin'
import AuthenticationProtocol from './routesSrc/AuthenticationProtocol'
import { BackofficeRole } from "./routesSrc/BackofficeRole";
import { BackofficeList } from "./routesSrc/BackofficeList";
import { BackofficePermission } from "./routesSrc/BackofficePermission"
import UserInfo from "./routesSrc/UserInfo"
import { UserConsumer } from "../Context";
import Register from "./routesSrc/loginComponents/Register"
import ListInfo from "./routesSrc/ListInfo"
import PermissionInfo from "./routesSrc/PermissionInfo"
import RoleInfo from "./routesSrc/RoleInfo"
import Users from './routesSrc/Users'

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
                    {this.renderRedirect()}
                    <Route path={'/'} exact component={Homepage} />
                    <Route path={'/backoffice'} exact component={() => <BackOffice/>}/>
                    <Route path={'/login'} exact component={() => <UserLogin app={this.state} setRedirect={this.setRedirect} />} />
                    <Route path={'/users'} exact component={() => <Users setRedirect={this.setRedirect} />} />
                    <Route path={'/protocols'} exact component={() => <AuthenticationProtocol />} />
                    <Route path={'/lists'} exact component={() => <BackofficeList />} />
                    <Route path={'/permissions'} exact component={() => <BackofficePermission />} />
                    <Route path={'/roles'} exact component={() => <BackofficeRole />} />
                    <Route path={'/register'} exact component={() => <Register setRedirect={this.setRedirect} />} />
                    <Route path={'/lists/:id'} exact component={() => <ListInfo />} />
                    <Route path={'/permissions/:id'} exact component={() => <PermissionInfo />} />
                    <Route path={'/roles/:id'} exact component={() => <RoleInfo />} />
                    <UserConsumer>
                        {state => <Route path={'/users/:id'} exact component={() => <UserInfo userId={state.user} />} />}
                    </UserConsumer>
                   
            </Switch>
        );
    }

}

export default Routes
