import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import SideBar from "./SideBar";
import AuthenticationProtocol from './AuthenticationProtocol'
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom'
import UserLogin from './UserLogin'
import Homepage from "./Homepage";
import { Redirect } from 'react-router-dom';


import './stylesheets/App.css';

class App extends Component {

    state = { selectedProtocol: "",redirect:false};

    changeProtocol = inputProto => {
        this.setState({selectedProtocol: inputProto})
        console.log("protocol set")
    }
    setRedirect = () => {
        this.setState({
            redirect: true
        })
    }

    renderRedirect = () => {
        if (this.state.redirect) {
            return <Redirect to='/backoffice' />
        }
    }

    render() {
        return (
            <Router>
                    <SideBar />
                    <Switch>
                        {this.renderRedirect()}
                            <Route path={'/'} exact component={Homepage} />
                            <Route path={'/login'} exact component={()=><UserLogin app={this.state} props={this.setRedirect}/>} />
                            <Route path={'/loginAdmin'} exact component={()=><AuthenticationProtocol selectedListener={this.changeProtocol}/>}/>
                            <Route path={'/backoffice'} exact/>
                    </Switch>
            </Router>

        );
    }
}

export default App;
