import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import AuthenticationProtocol from './components/AuthenticationProtocol'
import UserLogin from './components/UserLogin'

import './App.css';

class App extends Component {
  render() {
    
    return (
      <div className="App">
        <AuthenticationProtocol />
        <UserLogin/>
      </div>
    );
    
  }
}

export default App;
