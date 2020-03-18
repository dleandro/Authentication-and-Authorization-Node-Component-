import React, { Component } from 'react'
import ToggleButton from 'react-bootstrap/ToggleButton'
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup'

class AuthenticationProtocol extends Component {

    state = {
        selectedProtocol: ""    
    }

    changeSelectedProtocol = protocol => {
        this.setState({selectedProtocol: protocol})
    }

    render() {
        return (

            <ToggleButtonGroup type="radio" name="options" onChange={this.changeSelectedProtocol}>
                <ToggleButton value={"SAML"}> SAML </ToggleButton>
                <ToggleButton value={"OpenId"}> OpenId </ToggleButton>
                <ToggleButton value={"Kerberos"}> Kerberos </ToggleButton>
            </ToggleButtonGroup>
        )

    }
    }
    
    export default AuthenticationProtocol
    

   