import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import AuthenticationProtocol from './AuthenticationProtocol'
import UserLogin from './UserLogin'

import './stylesheets/App.css';

class App extends Component {
    state = { selectedProtocol: "", password:"", username:""};

    changePass = inputPass => { 
        this.setState({password: inputPass})
        console.log("pass set")
    }
    changeUsername = inputUsername => {
         this.setState({username: inputUsername})
         console.log("username set")
    }

    render() {
        return (
            <div className="App">
                <UserLogin app={this}/>
            </div>
        );
    }
}

export default App;
