import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import AuthenticationProtocol from './AuthenticationProtocol'
import UserLogin from './UserLogin'

import './stylesheets/App.css';

class App extends Component {
    state = { selectedProtocol: "none", password:"", email:""};

    changeSelectedProtocol = protocol => { this.setState({selectedProtocol: protocol})}
    changePass = inputPass => { this.setState({password: inputPass})}
    changeEmail = inputEmail => { this.setState({email: inputEmail})}

    render() {
        return (
            <div className="App">
                <AuthenticationProtocol selectedListener={this.changeSelectedProtocol}/>
                <UserLogin app={this}/>
            </div>
        );
    }
}

export default App;
