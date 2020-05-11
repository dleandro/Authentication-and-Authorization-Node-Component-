import 'bootstrap/dist/css/bootstrap.min.css'
import '../stylesheets/App.css';
import React, { Component } from 'react'
import {Switch,Route} from 'react-router-dom'
import { Redirect } from 'react-router-dom';
import BackOffice from "./routesSrc/backoffice";
import Homepage from "./routesSrc/Homepage";
import UserLogin from './routesSrc/loginComponents/UserLogin'
import AuthenticationProtocol from './routesSrc/AuthenticationProtocol'
import UperBar from "./html-elements-utils/UperBar";
import {BackofficeRole} from "./routesSrc/BackofficeRole";
import {BackofficeList} from "./routesSrc/BackofficeList";
import LoginSuccessfully from "./routesSrc/loginComponents/LoginSuccessfully"
import {BackofficePermission} from "./routesSrc/BackofficePermission"
import UserInfo from "./routesSrc/UserInfo"


class Routes extends Component{
    state = { redirect:{should:false, link:"/"}};

    setRedirect = (url) => this.setState({redirect: {should:true,link:url}})


    renderRedirect = () => {
        if (this.state.redirect.should) {
            return <Redirect to={this.state.redirect.link} />
        }
    }

    render() {
        return (
            <Switch id={"switch"}  >
                <div id={"main"} style={ {marginLeft : this.props.sidebarCollapsedSize}}>
                    <UperBar setRedirect={this.setRedirect}/>
                    {this.renderRedirect()}
                    <Route path={'/'} exact component={Homepage} />
                    <Route path={'/login'} exact component={()=><UserLogin app={this.state} setRedirect={this.setRedirect}/>} />
                    <Route path={'/loginAdmin'} exact component={()=><AuthenticationProtocol selectedListener={this.props.changeProtocol}/>}/>
                    <Route path={'/loginSuccessfully'} exact component={()=><LoginSuccessfully setRedirect={this.setRedirect}/>}/>
                    <Route path={'/users/:id'} exact component={()=><UserInfo/>}/>
                    <Route path={'/backoffice'} exact component={()=><BackOffice setRedirect={this.setRedirect}/>}/>
                    <Route path={'/backoffice/lists'} exact component={()=><BackofficeList />}/>
                    <Route path={'/backoffice/permissions'} exact component={()=><BackofficePermission />}/>
                    <Route path={'/backoffice/roles'} exact component={()=><BackofficeRole />}/>
                </div>
            </Switch>
        );
    }

}

export default Routes