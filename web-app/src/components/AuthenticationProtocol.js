import React from 'react'
import ToggleButton from 'react-bootstrap/ToggleButton'
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup'

const AuthenticationProtocol = ({selectedListener})=>
    <ToggleButtonGroup type="radio" name="options" onChange={selectedListener}>
        <ToggleButton value={"SAML"}> SAML </ToggleButton>
        <ToggleButton value={"OpenId"}> OpenId </ToggleButton>
        <ToggleButton value={"Kerberos"}> Kerberos </ToggleButton>
    </ToggleButtonGroup>

export default AuthenticationProtocol
    

   