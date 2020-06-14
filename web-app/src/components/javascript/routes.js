import 'bootstrap/dist/css/bootstrap.min.css'
import '../stylesheets/App.css';
import React, {Component} from 'react'
import {Redirect, Route, Switch} from 'react-router-dom'
import BackOffice from "./routesSrc/backoffice";
import Homepage from "./routesSrc/Homepage";
import UserLogin from './routesSrc/loginComponents/UserLogin'
import AuthenticationProtocol from './routesSrc/AuthenticationProtocol'
import UperBar from "./html-elements-utils/UperBar";
import {BackofficeRole} from "./routesSrc/BackofficeRole";
import {BackofficeList} from "./routesSrc/BackofficeList";
import {BackofficePermission} from "./routesSrc/BackofficePermission"
import UserInfo from "./routesSrc/UserInfo"
import {UserConsumer} from "../Context";
import Register from "./routesSrc/Register"
import ListInfo from "./routesSrc/ListInfo"
import PermissionInfo from "./routesSrc/PermissionInfo"
import RoleInfo from "./routesSrc/RoleInfo"

class Routes extends Component {
    state = {redirect: {should: false, link: "/"}};

    setRedirect = (url) => this.setState({redirect: {should: true, link: url}})


    renderRedirect = () => {
        if (this.state.redirect.should) {
            return <Redirect to={this.state.redirect.link}/>
        }
        return null
    }

    render() {
        return (
            <Switch id={"switch"}>
                <div id={"main"} style={{marginLeft: this.props.sidebarCollapsedSize}}>
                    <UserConsumer>
                        {state => (<UperBar isLoggedIn={state.isLoggedIn} logoutWith={state.setUser} userId={state.user.id}

                                            setRedirect={this.setRedirect}/>)}
                    </UserConsumer>

                    {this.renderRedirect()}
                    <Route path={'/'} exact component={Homepage}/>
                    <Route path={'/login'} exact
                           component={() => <UserLogin app={this.state} setRedirect={this.setRedirect}/>}/>
                    
                    <Route path={'/protocols'} exact component={() => <AuthenticationProtocol/>}/>
                            <UserConsumer>
                        {state=> <Route path={'/users/:id'} exact component={() => <UserInfo userId={state.user}/>}/> }
                    </UserConsumer>
                    <Route path={'/backoffice'} exact component={() => <BackOffice setRedirect={this.setRedirect}/>}/>
                    <Route path={'/backoffice/lists'} exact component={() => <BackofficeList/>}/>
                    <Route path={'/backoffice/permissions'} exact component={() => <BackofficePermission/>}/>
                    <Route path={'/backoffice/roles'} exact component={() => <BackofficeRole/>}/>
                    <Route path={'/register'} exact component={()=><Register></Register>}/>
                    <Route path={'/lists/:id'} exact component={()=><ListInfo/>}/>
                    <Route path={'/permissions/:id'} exact component={()=><PermissionInfo/>}/>
                    <Route path={'/roles/:id'} exact component={()=><RoleInfo/>}/>
                </div>
            </Switch>
        );
    }

}

export default Routes
