import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import AuthenticationProtocol from './AuthenticationProtocol'
import UserLogin from './UserLogin'

import './stylesheets/App.css';

class App extends Component {
    state = { selectedProtocol: "login", password:"", email:""};

    changePass = inputPass => { this.setState({password: inputPass})}
    changeEmail = inputEmail => { this.setState({email: inputEmail})}

    render() {
        return (
            <div className="App">
                <UserLogin app={this}/>
            </div>
        );
    }
}

export default App;
