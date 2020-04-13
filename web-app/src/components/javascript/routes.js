import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import UperBar from "./html-elements-utils/UperBar";
import AuthenticationProtocol from './routesSrc/AuthenticationProtocol'
import {Switch,Route} from 'react-router-dom'
import UserLogin from './routesSrc/loginComponents/UserLogin'
import Homepage from "./routesSrc/Homepage";
import { Redirect } from 'react-router-dom';
import '../stylesheets/App.css';
import BackOffice from "./routesSrc/backoffice";


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
                    <Route path={'/backoffice'} exact component={()=><BackOffice setRedirect={this.setRedirect}/>}/>
                </div>
            </Switch>
        );
    }

}

export default Routes